import { Request, Response } from "express";
import Topic from "../../models/Topic";
import Subject from "../../models/Subject";

class TopicAdminController {
  static async createTopic(req: Request, res: Response) {
    try {
      const { subjectId } = req.params
      const { title, description } = req.body
      

      if (!subjectId || !title) {
        return res.status(400).json({ error: "Faltan campos obligatorios (subject, title)" });
      }

      const subjectExists = await Subject.findById(subjectId);
      
      if (!subjectExists) {
        return res.status(404).json({ error: "La materia especificada no existe" });
      }

      const topic = await Topic.create({ subject:subjectExists, title, description });
      console.log(topic);
      
      res.status(201).json(topic);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el tema" });
    }
  }

  static async getTopics(req: Request, res: Response) {
    try {
      const topics = await Topic.find().populate("subject", "name");
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los temas" });
    }
  }

  static async getTopicById(req: Request, res: Response) {
    try {
      const topic = await Topic.findById(req.params.id).populate("subject", "name");
      if (!topic) {
        return res.status(404).json({ error: "Tema no encontrado" });
      }
      res.json(topic);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el tema" });
    }
  }

  static async updateTopic(req: Request, res: Response) {
    try {
      const { title, description, subject } = req.body;
      const topic = await Topic.findById(req.params.id);

      if (!topic) {
        return res.status(404).json({ error: "Tema no encontrado" });
      }

      if (title) topic.title = title;
      if (description) topic.description = description;
      if (subject) topic.subject = subject;

      await topic.save();
      res.json(topic);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el tema" });
    }
  }

  static async deleteTopic(req: Request, res: Response) {
    try {
      const topic = await Topic.findByIdAndDelete(req.params.id);
      if (!topic) {
        return res.status(404).json({ error: "Tema no encontrado" });
      }
      res.json({ message: "Tema eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el tema" });
    }
  }
}

export default TopicAdminController;
