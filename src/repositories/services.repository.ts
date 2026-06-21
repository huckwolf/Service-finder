import { type SortOrder } from "mongoose";
import dbConnect from "@/lib/mongodb";
import { Service, ServiceListOptions, ServiceQuery } from "@/types/service";
import { ServiceModel } from "@/models/Service";
import { escapeRegex, cleanString } from "@/untils/helper";

type MongoFilterValue = string | boolean | RegExp | MongoFilter[];
type MongoFilter = Record<string, MongoFilterValue>;

function buildServiceFilter(query: ServiceQuery = {}) {
  const filter: MongoFilter = {
    isActive: query.isActive ?? true,
  };

  const search = cleanString(query.search);
  if (search) {
    const pattern = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { title: pattern },
      { description: pattern },
      { "provider.name": pattern },
      { eligibility: pattern },
    ];
  }

  const type = cleanString(query.type);
  if (type) filter.type = type;

  const categoryId = cleanString(query.categoryId);
  if (categoryId) filter.categoryIds = categoryId;

  const deliveryModeId = cleanString(query.deliveryModeId);
  if (deliveryModeId) filter.deliveryModeIds = deliveryModeId;

  const targetAudienceId = cleanString(query.targetAudienceId);
  if (targetAudienceId) filter.targetAudienceIds = targetAudienceId;

  const tagId = cleanString(query.tagId);
  if (tagId) filter.tagIds = tagId;

  const state = cleanString(query.state);
  if (state) filter["location.state"] = state.toUpperCase();

  const suburb = cleanString(query.suburb);
  if (suburb) filter["location.suburb"] = new RegExp(`^${escapeRegex(suburb)}$`, "i");

  if (typeof query.onlineOnly === "boolean") {
    filter["location.onlineOnly"] = query.onlineOnly;
  }

  return filter;
}

function getSort(sort: ServiceListOptions["sort"]) {
  const sortMap: Record<NonNullable<ServiceListOptions["sort"]>, Record<string, SortOrder>> = {
    newest: { createdAt: -1 },
    updated: { updatedAt: -1 },
    title: { title: 1 },
  };

  return sortMap[sort ?? "title"];
}

function getPagination(options: ServiceListOptions = {}) {
  const limit = Math.min(Math.max(options.limit ?? 20, 1), 100);
  const page = Math.max(options.page ?? 1, 1);
  const skip = (page - 1) * limit;

  return { limit, page, skip };
}

export async function findServices(
  query: ServiceQuery = {},
  options: ServiceListOptions = {},
) {
  await dbConnect();

  const filter = buildServiceFilter(query);
  const { limit, page, skip } = getPagination(options);
  const [items, total] = await Promise.all([
    ServiceModel.find(filter)
      .sort(getSort(options.sort))
      .skip(skip)
      .limit(limit)
      .lean<Service[]>(),
    ServiceModel.countDocuments(filter),
  ]);

  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function findServiceBySlug(slug: string) {
  await dbConnect();

  const cleanSlug = cleanString(slug);
  if (!cleanSlug) return null;

  return ServiceModel.findOne({ slug: cleanSlug, isActive: true }).lean<Service | null>();
}

export async function countServices(query: ServiceQuery = {}) {
  await dbConnect();
  return ServiceModel.countDocuments(buildServiceFilter(query));
}

export const servicesRepository = {
  findMany: findServices,
  findBySlug: findServiceBySlug,
  count: countServices,
};
