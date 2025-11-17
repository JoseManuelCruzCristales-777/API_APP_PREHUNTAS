import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
  name: string;              
  description: string;         
}

const subjectSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },

  description: 
  { 
    type: String, 
    required: true 
  },
});

export default mongoose.model<ISubject>("Subject", subjectSchema);
