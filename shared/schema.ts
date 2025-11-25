import { z } from "zod";

export const actionOptions = ["mask", "tokenize", "hash", "remove", "keep"] as const;
export const piiCategories = ["Direct PII", "Indirect PII", "Non-PII"] as const;

export const fileMetadataSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

export const dataInputSchema = z.object({
  fileMetadata: fileMetadataSchema.optional(),
  pastedText: z.string().optional(),
  dbName: z.string().optional(),
  tableName: z.string().optional(),
  query: z.string().optional(),
  autoDetectSchema: z.boolean().default(false),
  enableMLDetection: z.boolean().default(true),
});

export type FileMetadata = z.infer<typeof fileMetadataSchema>;

export const piiColumnSchema = z.object({
  columnName: z.string(),
  piiType: z.string(),
  category: z.enum(piiCategories),
  action: z.enum(actionOptions),
});

export const piiDetectionResultSchema = z.object({
  totalColumns: z.number(),
  piiTypesFound: z.array(z.string()),
  columns: z.array(piiColumnSchema),
});

export const sanitizedDataRowSchema = z.object({
  columnName: z.string(),
  original: z.string(),
  sanitized: z.string(),
  masked: z.boolean(),
});

export const sanitizationPreviewSchema = z.object({
  totalRows: z.number(),
  sanitizedColumns: z.number(),
  rows: z.array(sanitizedDataRowSchema),
});

export type DataInput = z.infer<typeof dataInputSchema>;
export type PIIColumn = z.infer<typeof piiColumnSchema>;
export type PIIDetectionResult = z.infer<typeof piiDetectionResultSchema>;
export type SanitizedDataRow = z.infer<typeof sanitizedDataRowSchema>;
export type SanitizationPreview = z.infer<typeof sanitizationPreviewSchema>;
export type ActionOption = typeof actionOptions[number];
export type PIICategory = typeof piiCategories[number];
