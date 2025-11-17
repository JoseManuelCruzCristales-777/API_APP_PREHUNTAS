import { Router } from "express";
import { ContentController } from "../controller/ContentController";

const router = Router()

router.get('/getSubjects',
    ContentController.getSubjects
)

router.get('/getTopicsBySubject/:subjectId',
    ContentController.getTopicsBySubject
)

router.get('/getSubtopicsByTopic/:topicId',
    ContentController.getSubtopicsByTopic

)

router.get('/getSubtopicDetail/:subtopicId',
    ContentController.getSubtopicDetail
)

export default router