import { Request, Response } from "express";
import Subject from "../models/Subject";
import Topic from "../models/Topic";
import Subtopic from "../models/Subtopic";
import Excersise from "../models/Excersise";
import Question from "../models/Question";

export class ContentController {

    static async getSubjects(req: Request, res: Response) {
        try {
            const subjects = Subject.find({})
            res.json(subjects)

        } catch (error) {
            res.status(500).json({ error: "No se econtraron materias" })

        }
    }

    static async getTopicsBySubject(req: Request, res: Response) {
        try {
            const { subjectId } = req.params

            const topics = await Topic.find({ subject: subjectId })
            res.json(topics)

        } catch (error) {
            res.status(500).json({ error: "No se encontraron temas" })

        }
    }

    static async getSubtopicsByTopic(req: Request, res: Response) {
        try {
            const { topicId } = req.params

            const subtopics = await Subtopic.find({ topic: topicId })

            res.json(subtopics)

        } catch (error) {
            res.status(500).json({ error: "No se econtraron subtemas" });
        }
    }

    static async getSubtopicDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const subtopic = await Subtopic.findById(id)

            if (!subtopic) {
                return res.status(404).json({ error: "Subtema no encontrado" });
            }

            // Buscar ejercicios y preguntas relacionadas con el subtema
            const exercises = await Excersise.find({ subtopic: id }).select(
                "title description difficulty"
            );

            const questions = await Question.find({ subtopic: id }).select(
                "question options correctAnswer"
            );

            res.json({
                subtopic,
                exercises,
                questions,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}