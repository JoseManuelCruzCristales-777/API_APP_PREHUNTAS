import { Request, Response } from "express";
import Subtopic from "../../models/Subtopic";
import Topic from "../../models/Topic";

class SubtopicAdminController {
    static async createSubtopic(req: Request, res: Response) {
        try {
            const { topicId } = req.params

            const { title, content, examples, requiresExercise } = req.body;

            console.log(req.body);
            

            if (!topicId || !title || !content) {
                return res.status(400).json({ error: "Faltan campos obligatorios (topic, title, content)" });
            }

            const topicExists = await Topic.findById(topicId);
            if (!topicExists) {
                return res.status(404).json({ error: "El tema especificado no existe" });
            }


            const subtopic = await Subtopic.create({
                topic: topicId,
                title,
                content,
                examples,
                requiresExercise
            });

            res.status(201).json(subtopic);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el subtema" });
        }
    }

    static async getSubtopics(req: Request, res: Response) {
        try {
            const subtopics = await Subtopic.find().populate("topic", "title");
            res.json(subtopics);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los subtemas" });
        }
    }

    static async getSubtopicById(req: Request, res: Response) {
        try {
            const subtopic = await Subtopic.findById(req.params.id).populate("topic", "title");
            if (!subtopic) {
                return res.status(404).json({ error: "Subtema no encontrado" });
            }
            res.json(subtopic);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el subtema" });
        }
    }

    static async updateSubtopic(req: Request, res: Response) {
        try {
            const { title, content, examples, requiresExercise, topic } = req.body;
            const subtopic = await Subtopic.findById(req.params.id);

            if (!subtopic) {
                return res.status(404).json({ error: "Subtema no encontrado" });
            }

            if (title) subtopic.title = title;
            if (content) subtopic.content = content;
            if (examples) subtopic.examples = examples;
            if (requiresExercise !== undefined) subtopic.requiresExercise = requiresExercise;
            if (topic) subtopic.topic = topic;

            await subtopic.save();
            res.json(subtopic);
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el subtema" });
        }
    }

    static async deleteSubtopic(req: Request, res: Response) {
        try {
            const subtopic = await Subtopic.findByIdAndDelete(req.params.id);
            if (!subtopic) {
                return res.status(404).json({ error: "Subtema no encontrado" });
            }
            res.json({ message: "Subtema eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el subtema" });
        }
    }
}

export default SubtopicAdminController;
