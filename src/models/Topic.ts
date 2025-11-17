import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITopic extends Document {
  subject: Types.ObjectId;     
  title: string;               
  description: string;
}

const topicSchema = new Schema({
  subject: { type: Types.ObjectId, ref: "Subject", required: true },
  title: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<ITopic>("Topic", topicSchema);
