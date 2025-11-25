import { useState } from "react";
import { useLocation } from "wouter";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useWizard } from "@/context/WizardContext";

export default function Step1() {
  const [, setLocation] = useLocation();
  const { dataInput, updateDataInput } = useWizard();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      updateDataInput({
        fileMetadata: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      });
    }
  };

  const handleRunScan = () => {
    setLocation("/step2");
  };

  const hasInput = uploadedFile || dataInput.fileMetadata;
  const displayFile = uploadedFile || dataInput.fileMetadata;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 page-transition">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Data Input</h2>
          <p className="text-muted-foreground">
            Upload your CSV or XLSX file to begin scanning for sensitive information.
          </p>
        </div>

        <Card className="shadow-md" data-testid="card-file-upload">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">File Upload</CardTitle>
                <CardDescription>CSV or XLSX files</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Select File
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="mt-2"
                  data-testid="input-file-upload"
                />
              </div>
              {displayFile && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium text-foreground truncate" data-testid="text-uploaded-filename">
                    {uploadedFile?.name || dataInput.fileMetadata?.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((uploadedFile?.size || dataInput.fileMetadata?.size || 0) / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md" data-testid="card-options">
          <CardHeader>
            <CardTitle className="text-lg">Detection Options</CardTitle>
            <CardDescription>Configure how PII detection should be performed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="auto-detect"
                  checked={dataInput.autoDetectSchema ?? true}
                  onCheckedChange={(checked) => updateDataInput({ autoDetectSchema: checked as boolean })}
                  data-testid="checkbox-auto-detect"
                />
                <div>
                  <Label htmlFor="auto-detect" className="text-sm font-medium cursor-pointer">
                    Auto-detect schema
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically identify data types and structure
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="ml-detection"
                  checked={dataInput.enableMLDetection ?? true}
                  onCheckedChange={(checked) => updateDataInput({ enableMLDetection: checked as boolean })}
                  data-testid="checkbox-ml-detection"
                />
                <div>
                  <Label htmlFor="ml-detection" className="text-sm font-medium cursor-pointer">
                    Enable ML-based PII detection
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Use machine learning models for enhanced PII detection accuracy
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="px-12"
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
