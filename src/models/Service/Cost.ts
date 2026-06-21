import { Schema } from "mongoose";

const costSchema = new Schema(
  {
    type: { type: String, required: true },
    description: { type: String, default: null },
  },
  { _id: false },
);

export default costSchema;
