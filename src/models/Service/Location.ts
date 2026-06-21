import { Schema } from "mongoose";

export const locationSchema = new Schema(
  {
    onlineOnly: { type: Boolean, default: false },
    state: { type: String, default: null },
    suburb: { type: String, default: null },
    postcode: { type: String, default: null },
    addressLine1: { type: String, default: null },
    addressLine2: { type: String, default: null },
  },
  { _id: false },
);

export default locationSchema;
