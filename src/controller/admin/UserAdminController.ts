import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";

class UserAdminController {
  /**
   * Crear un nuevo usuario (opcional, puede servir para cuentas manuales)
   */
  static async createUser(req: Request, res: Response) {
    try {
      const { email, password, username, role } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        username,
        role: role || "user", // por defecto usuario normal
      });

      await user.save();
      res.status(201).json({ message: "Usuario creado correctamente", user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtener todos los usuarios
   */
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find().select("-password -__v");
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtener un usuario por ID
   */
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select("-password -__v");

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Actualizar un usuario
   */
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, username, password, role, level, confirm } = req.body;

      const updates: any = {};
      if (email) updates.email = email;
      if (username) updates.username = username;
      if (role) updates.role = role;
      if (typeof level === "number") updates.level = level;
      if (typeof confirm === "boolean") updates.confirm = confirm;
      if (password) updates.password = await bcrypt.hash(password, 10);

      const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password -__v");

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json({ message: "Usuario actualizado correctamente", user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Eliminar un usuario
   */
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserAdminController;
