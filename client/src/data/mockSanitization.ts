import type { SanitizedDataRow, SanitizationPreview } from "@shared/schema";

export const mockSanitizedRows: SanitizedDataRow[] = [
  {
    columnName: "email",
    original: "john.doe@example.com",
    sanitized: "j***@e******.com",
    masked: true,
  },
  {
    columnName: "phone_number",
    original: "+1-555-123-4567",
    sanitized: "+1-***-***-4567",
    masked: true,
  },
  {
    columnName: "ssn",
    original: "123-45-6789",
    sanitized: "a8f5e2d9c3b1",
    masked: true,
  },
  {
    columnName: "address",
    original: "123 Main St, New York, NY 10001",
    sanitized: "TOKEN_8A3F9E2D",
    masked: true,
  },
  {
    columnName: "date_of_birth",
    original: "1985-03-15",
    sanitized: "****-**-15",
    masked: true,
  },
  {
    columnName: "drivers_license",
    original: "D1234567",
    sanitized: "b7c4a9f2e8d1",
    masked: true,
  },
  {
    columnName: "ip_address",
    original: "192.168.1.100",
    sanitized: "192.***.*.***",
    masked: true,
  },
  {
    columnName: "salary",
    original: "75000",
    sanitized: "75000",
    masked: false,
  },
  {
    columnName: "region",
    original: "Northeast",
    sanitized: "Northeast",
    masked: false,
  },
  {
    columnName: "device_id",
    original: "DEV_ABC123XYZ",
    sanitized: "TOKEN_4F8E2A9C",
    masked: true,
  },
  {
    columnName: "user_id",
    original: "USR_2024_001",
    sanitized: "USR_2024_001",
    masked: false,
  },
  {
    columnName: "product_name",
    original: "Premium Subscription",
    sanitized: "Premium Subscription",
    masked: false,
  },
  {
    columnName: "timestamp",
    original: "2024-11-23 14:30:00",
    sanitized: "2024-11-23 14:30:00",
    masked: false,
  },
];

export const mockSanitizationPreview: SanitizationPreview = {
  totalRows: mockSanitizedRows.length,
  sanitizedColumns: mockSanitizedRows.filter((row) => row.masked).length,
  rows: mockSanitizedRows,
};
