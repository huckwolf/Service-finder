import { Schema, model, models, Model } from "mongoose";
import { Service } from "@/types/service";
import locationSchema from "./Service/Location";
import providerSchema from "./Service/Provider";
import costSchema from "./Service/Cost";

export const serviceSchema = new Schema<Service>(
  {
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, index: true },
    categoryIds: { type: [String], default: [], index: true },
    deliveryModeIds: { type: [String], default: [], index: true },
    targetAudienceIds: { type: [String], default: [], index: true },
    tagIds: { type: [String], default: [], index: true },
    description: { type: String, required: true },
    provider: { type: providerSchema, required: true },
    cost: { type: costSchema, required: true },
    location: { type: locationSchema, required: true },
    eligibility: { type: String, default: null },
    openingHours: { type: String, default: null },
    isActive: { type: Boolean, default: true, index: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    collection: "services",
    versionKey: false,
  },
);

export const ServiceModel =
  (models.Service as Model<Service> | undefined) ??
  model<Service>("Service", serviceSchema);

export default ServiceModel;  