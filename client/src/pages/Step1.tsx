import { useState } from "react";
import { useLocation } from "wouter";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWizard } from "@/context/WizardContext";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function Step1() {
  const [, setLocation] = useLocation();
  const { dataInput, updateDataInput } = useWizard();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList: UploadedFile[] = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles(fileList);
      updateDataInput({
        fileMetadata: {
          name: `${files.length} file(s) selected`,
          size: Array.from(files).reduce((acc, file) => acc + file.size, 0),
          type: "folder",
        },
      });
    }
  };

  const handleRunScan = () => {
    setLocation("/step2");
  };

  const hasInput = uploadedFiles.length > 0 || dataInput.fileMetadata;
  const hasLocalFiles = uploadedFiles.length > 0;
  const totalSize = hasLocalFiles 
    ? uploadedFiles.reduce((acc, file) => acc + file.size, 0)
    : (dataInput.fileMetadata?.size || 0);
  const displayName = hasLocalFiles 
    ? `${uploadedFiles.length} file(s) selected`
    : dataInput.fileMetadata?.name;

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 page-transition">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-foreground tracking-tight">Data Input</h2>
          <p className="text-base text-muted-foreground">
            Upload your folder containing files to begin scanning for sensitive information.
          </p>
        </div>

        <Card className="enterprise-shadow card-fade-in card-hover-lift card-accent-bar border-card-border rounded-xl" data-testid="card-folder-upload">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Folder Upload</CardTitle>
                <CardDescription className="text-sm mt-1">DOC, DOCX, XLSX, CSV, TXT files</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-5">
              <div>
                <Label htmlFor="folder-upload" className="text-sm font-semibold mb-2 block">
                  Select Folder
                </Label>
                <Input
                  id="folder-upload"
                  type="file"
                  accept=".doc,.docx,.xlsx,.csv,.txt"
                  onChange={handleFolderUpload}
                  className="h-11"
                  data-testid="input-folder-upload"
                  {...({ webkitdirectory: "", directory: "", multiple: true } as React.InputHTMLAttributes<HTMLInputElement>)}
                />
              </div>
              {hasInput && (
                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <p className="text-sm font-semibold text-foreground" data-testid="text-uploaded-folder">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Total size: {(totalSize / 1024).toFixed(2)} KB
                  </p>
                  {hasLocalFiles && (
                    <div className="mt-3 max-h-32 overflow-y-auto space-y-1">
                      {uploadedFiles.slice(0, 10).map((file, index) => (
                        <p key={index} className="text-xs text-muted-foreground truncate">
                          {file.name}
                        </p>
                      ))}
                      {uploadedFiles.length > 10 && (
                        <p className="text-xs text-muted-foreground">
                          ...and {uploadedFiles.length - 10} more file(s)
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-6">
          <Button
            size="lg"
            className="px-16 py-6 text-base font-semibold button-lift"
            onClick={handleRunScan}
            disabled={!hasInput}
            data-testid="button-run-scan"
          >
            RUN SCAN
          </Button>
        </div>
      </div>
    </div>
  );
}
