import type { PIIColumn, PIIDetectionResult } from "@shared/schema";

export const mockPIIColumns: PIIColumn[] = [
  { columnName: "email", piiType: "Email Address", category: "Direct PII", action: "mask" },
  { columnName: "phone_number", piiType: "Phone Number", category: "Direct PII", action: "mask" },
  { columnName: "ssn", piiType: "Social Security Number", category: "Direct PII", action: "hash" },
  { columnName: "address", piiType: "Physical Address", category: "Direct PII", action: "tokenize" },
  { columnName: "credit_card", piiType: "Credit Card Number", category: "Direct PII", action: "remove" },
  { columnName: "date_of_birth", piiType: "Date of Birth", category: "Direct PII", action: "mask" },
  { columnName: "drivers_license", piiType: "Driver's License", category: "Direct PII", action: "hash" },
  { columnName: "passport_number", piiType: "Passport Number", category: "Direct PII", action: "remove" },
  { columnName: "ip_address", piiType: "IP Address", category: "Indirect PII", action: "mask" },
  { columnName: "salary", piiType: "Financial Information", category: "Indirect PII", action: "keep" },
  { columnName: "region", piiType: "Geographic Data", category: "Indirect PII", action: "keep" },
  { columnName: "device_id", piiType: "Device Identifier", category: "Indirect PII", action: "tokenize" },
  { columnName: "user_id", piiType: "None", category: "Non-PII", action: "keep" },
  { columnName: "product_name", piiType: "None", category: "Non-PII", action: "keep" },
  { columnName: "timestamp", piiType: "None", category: "Non-PII", action: "keep" },
];

export const mockPIIDetectionResult: PIIDetectionResult = {
  totalColumns: mockPIIColumns.length,
  piiTypesFound: Array.from(
    new Set(
      mockPIIColumns
        .map((col) => col.piiType)
        .filter((type) => type !== "None")
    )
  ),
  columns: mockPIIColumns,
};
