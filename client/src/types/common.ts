export const VARIANTS = ["primary", "secondary", "accent", "ghost"] as const;
export type Variant = (typeof VARIANTS)[number];

export const SIZES = ["sm", "md", "lg"] as const;
export type Size = (typeof SIZES)[number];

export type APIError = {
  message: string;
  errors?: string[];
};
