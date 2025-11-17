import { Request, Response } from "express"
import User from "../models/User";
import bcrypt from 'bcrypt'
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transporter } from "../config/nodemailer";
import { generateJWT } from "../utils/jwt";
import Subtopic from "../models/Subtopic";
import UserProgress from "../models/UserProgress";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;

            const userExist = await User.findOne({ email });
            if (userExist)
                return res.status(409).json({ error: "El usuario ya está registrado" });

            const user = new User(req.body);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            // Crear progreso inicial para cada subtema existente
            const subtopics = await Subtopic.find();
            const progressDocs = subtopics.map((s) => ({
                user: user._id,
                subtopic: s._id,
                score: 0,
                completedExercises: [],
                answeredQuestions: [],
                completed: false
            }));
            await UserProgress.insertMany(progressDocs);

            res.status(201).json({ message: "Cuenta creada y progreso inicial configurado" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al crear la cuenta" });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            console.log(req.body);


            const user = await User.findOne({ email })

            if (!user) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({ error: error.message })
                return

            }

            //revisar password
            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) {
                const error = new Error('Password incorrecto')
                res.status(401).json({ error: error.message })
                return

            }

            const token = generateJWT({ id: user.id })

            res.send(token)



        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })

        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body


            //prevenir duplicados
            const user = await User.findOne({ email })

            if (!user) {
                const error = new Error('El usuario no esta registrado')
                res.status(404).json({ error: error.message })
                return
            }

            //generar token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()

            //enviar email
            await transporter.sendMail({
                from: 'UpTask <admin@uptask.com>',
                to: user.email,
                subject: 'UpTask - Restablece tu password',
                text: 'UpTask - Restablece tu password',
                html: `<p>Hola: ${user.username} has solicitado reestablecer tu password.</p>
                <p>Visita el siguiente enlace: </p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Confirmar cuenta</a>
                <p>Ingresa el codigo: <b>${token.token}</b></p>
                <p>Este token expira en 10 minutos</p>`
            })


            res.send('Revisa las instrucciones en tu email')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })

        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try {
            console.log(req.body);

            const { token } = req.body

            console.log('Token recibido desde frontend:', token, typeof token);
            const tokenExists = await Token.findOne({ token: String(token) });
            console.log('Resultado de búsqueda en MongoDB:', tokenExists);

            if (!tokenExists) {
                const error = new Error('Token no valido')
                res.status(401).json({ error: error.message })
                return
            }

            res.status(201).send('Token valido, define tu nuevo password')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
            return

        }
    }


    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {

            const { token } = req.params

            console.log('Token recibido desde frontend:', token);
            const tokenExists = await Token.findOne({ token: String(token) });
            console.log('Resultado de búsqueda en MongoDB:', tokenExists);

            if (!tokenExists) {
                const error = new Error('Token no valido')
                res.status(401).json({ error: error.message })
                return
            }

            const user = await User.findById(tokenExists.user)
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt)

            await Promise.allSettled([
                user.save(),
                tokenExists.deleteOne()
            ])

            res.status(201).send('El password se ha modificado correctamente')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
            return

        }
    }

    static user = async (req: Request, res: Response) => {
        res.json({ user: req.user })
        return

    }
}