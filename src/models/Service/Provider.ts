import { Schema } from "mongoose";

export const providerSchema = new Schema(
  {
    name: { type: String, required: true },
    website: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
  },
  { _id: false },
);

export default providerSchema;