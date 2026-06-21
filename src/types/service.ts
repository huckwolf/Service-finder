export type Service = {
  title: string;
  slug: string;
  type: string;
  categoryIds: string[];
  deliveryModeIds: string[];
  targetAudienceIds: string[];
  tagIds: string[];
  description: string;
  provider: {
    name: string;
    website?: string | null;
    phone?: string | null;
    email?: string | null;
  };
  cost: {
    type: "free" | "paid" | "mixed" | string;
    description?: string | null;
  };
  location: {
    onlineOnly: boolean;
    state?: string | null;
    suburb?: string | null;
    postcode?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
  };
  eligibility?: string | null;
  openingHours?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceListOptions = {
  limit?: number;
  page?: number;
  sort?: "title" | "newest" | "updated";
};

export type ServiceQuery = {
  search?: string;
  type?: string;
  categoryId?: string;
  deliveryModeId?: string;
  targetAudienceId?: string;
  tagId?: string;
  state?: string;
  suburb?: string;
  onlineOnly?: boolean;
  isActive?: boolean;
};
