import { Request, Response } from "express";
import Subject from "../../models/Subject";

class SubjectAdminController {
  static async createSubject(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ error: "El nombre de la materia es obligatorio" });
      }

      const existing = await Subject.findOne({ name });
      if (existing) {
        return res.status(400).json({ error: "Ya existe una materia con ese nombre" });
      }

      const subject = await Subject.create({ name, description });
      res.status(201).json(subject);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la materia" });
    }
  }

  static async getSubjects(req: Request, res: Response) {
    try {
      const subjects = await Subject.find();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las materias" });
    }
  }

  static async getSubjectById(req: Request, res: Response) {
    try {
      const subject = await Subject.findById(req.params.id);
      if (!subject) {
        return res.status(404).json({ error: "Materia no encontrada" });
      }
      res.json(subject);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la materia" });
    }
  }

  static async updateSubject(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const subject = await Subject.findById(req.params.id);

      if (!subject) {
        return res.status(404).json({ error: "Materia no encontrada" });
      }

      if (name) subject.name = name;
      if (description) subject.description = description;

      await subject.save();
      res.json(subject);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la materia" });
    }
  }

  static async deleteSubject(req: Request, res: Response) {
    try {
      const subject = await Subject.findByIdAndDelete(req.params.id);
      if (!subject) {
        return res.status(404).json({ error: "Materia no encontrada" });
      }
      res.json({ message: "Materia eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la materia" });
    }
  }
}

export default SubjectAdminController;
