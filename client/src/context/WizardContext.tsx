import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { DataInput, PIIColumn, SanitizedDataRow } from "@shared/schema";
import { mockPIIColumns } from "@/data/mockPIIDetection";
import { mockSanitizedRows } from "@/data/mockSanitization";

interface WizardContextType {
  dataInput: DataInput;
  setDataInput: (input: DataInput) => void;
  updateDataInput: (partial: Partial<DataInput>) => void;
  piiColumns: PIIColumn[];
  setPIIColumns: (columns: PIIColumn[]) => void;
  updateColumnAction: (columnName: string, action: PIIColumn["action"]) => void;
  getSanitizedPreview: () => SanitizedDataRow[];
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [dataInput, setDataInput] = useState<DataInput>({
    autoDetectSchema: true,
    enableMLDetection: true,
  });
  const [piiColumns, setPIIColumns] = useState<PIIColumn[]>(mockPIIColumns);

  const updateDataInput = (partial: Partial<DataInput>) => {
    setDataInput((prev) => ({ ...prev, ...partial }));
  };

  const updateColumnAction = (columnName: string, action: PIIColumn["action"]) => {
    setPIIColumns((prev) =>
      prev.map((col) =>
        col.columnName === columnName ? { ...col, action } : col
      )
    );
  };

  const sanitizedPreview = useMemo(() => {
    return mockSanitizedRows.map((row) => {
      const column = piiColumns.find((col) => col.columnName === row.columnName);
      if (!column) return row;

      if (column.action === "keep") {
        return { ...row, sanitized: row.original, masked: false };
      } else if (column.action === "remove") {
        return { ...row, sanitized: "[REMOVED]", masked: true };
      } else if (column.action === "mask") {
        const masked = row.original.replace(/./g, (char, index) => {
          if (index < 2 || index >= row.original.length - 2) return char;
          return "*";
        });
        return { ...row, sanitized: masked, masked: true };
      } else if (column.action === "hash") {
        let hash = "";
        for (let i = 0; i < row.original.length; i++) {
          hash += row.original.charCodeAt(i).toString(16);
        }
        return { ...row, sanitized: hash.substring(0, 12), masked: true };
      } else if (column.action === "tokenize") {
        const token = `TOKEN_${row.columnName.toUpperCase().substring(0, 8)}`;
        return { ...row, sanitized: token, masked: true };
      }

      return row;
    });
  }, [piiColumns]);

  const getSanitizedPreview = () => sanitizedPreview;

  return (
    <WizardContext.Provider
      value={{
        dataInput,
        setDataInput,
        updateDataInput,
        piiColumns,
        setPIIColumns,
        updateColumnAction,
        getSanitizedPreview,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
