import "server-only";

import { ServiceModel } from "@/models/Service";

export async function findServices() {
  const services = await ServiceModel.find({}).lean();
  return services;
}
