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
    <div className="max-w-5xl mx-auto px-8 py-10 page-transition">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-foreground tracking-tight">Data Input</h2>
          <p className="text-base text-muted-foreground">
            Upload your CSV or XLSX file to begin scanning for sensitive information.
          </p>
        </div>

        <Card className="enterprise-shadow card-fade-in border-card-border" data-testid="card-file-upload">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">File Upload</CardTitle>
                <CardDescription className="text-sm mt-1">CSV or XLSX files</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-5">
              <div>
                <Label htmlFor="file-upload" className="text-sm font-semibold mb-2 block">
                  Select File
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="h-11"
                  data-testid="input-file-upload"
                />
              </div>
              {displayFile && (
                <div className="p-4 bg-accent/50 rounded-lg border border-border">
                  <p className="text-sm font-semibold text-foreground truncate" data-testid="text-uploaded-filename">
                    {uploadedFile?.name || dataInput.fileMetadata?.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {((uploadedFile?.size || dataInput.fileMetadata?.size || 0) / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-shadow card-fade-in border-card-border" style={{ animationDelay: '0.1s' }} data-testid="card-options">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Detection Options</CardTitle>
            <CardDescription className="text-sm mt-1">Configure how PII detection should be performed</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/30 transition-colors">
                <Checkbox
                  id="auto-detect"
                  checked={dataInput.autoDetectSchema ?? true}
                  onCheckedChange={(checked) => updateDataInput({ autoDetectSchema: checked as boolean })}
                  data-testid="checkbox-auto-detect"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="auto-detect" className="text-sm font-semibold cursor-pointer">
                    Auto-detect schema
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically identify data types and structure
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/30 transition-colors">
                <Checkbox
                  id="ml-detection"
                  checked={dataInput.enableMLDetection ?? true}
                  onCheckedChange={(checked) => updateDataInput({ enableMLDetection: checked as boolean })}
                  data-testid="checkbox-ml-detection"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="ml-detection" className="text-sm font-semibold cursor-pointer">
                    Enable ML-based PII detection
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use machine learning models for enhanced PII detection accuracy
                  </p>
                </div>
              </div>
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
