import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISubtopic extends Document {
  topic: Types.ObjectId;      
  title: string;              
  content: string;             
  examples: string[];      
  requiresExercise: boolean
}

const subtopicSchema = new Schema({
  topic: { 
    type: Types.ObjectId, 
    ref: "Topic", 
    required: true 
  },
  
  title: { 
    type: String, 
    required: true 
  },

  content: { 
    type: String, 
    required: true 
  },
  examples: [
    { 
      type: String 
    }
  ],

  requiresExercise: {
    type: Boolean,
    required: false,
    default: true
  }
  
});

export default mongoose.model<ISubtopic>("Subtopic", subtopicSchema);
