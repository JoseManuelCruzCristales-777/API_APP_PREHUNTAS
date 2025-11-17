import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExercise extends Document {
  subtopic: Types.ObjectId;
  user: Types.ObjectId; // 👈 nuevo campo
  question: string;
  codeTemplate?: string;
  expectedOutput?: string;
  solutionExplanation?: string;
  difficulty: string;
  generatedByLLM: boolean;
}

const exerciseSchema = new Schema({
  subtopic: { 
    type: Types.ObjectId, 
    ref: "Subtopic", 
    required: true 
  },

  user: { 
    type: Types.ObjectId, 
    ref: "User", 
    required: true // 👈 importante, así se asocia al usuario creador
  },

  question: { 
    type: String,
    required: true 
  },

  codeTemplate: { type: String },

  expectedOutput: { type: String },

  solutionExplanation: { type: String },

  difficulty: { 
    type: String,
    default: 'easy'
  },

  generatedByLLM: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model<IExercise>("Exercise", exerciseSchema);
