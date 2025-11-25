import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useWizard } from "@/context/WizardContext";

export default function TextPaste() {
  const [, setLocation] = useLocation();
  const { dataInput, updateDataInput } = useWizard();

  const handleRunScan = () => {
    setLocation("/step2");
  };

  const hasInput = (dataInput.pastedText || "").trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 page-transition">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Text Paste</h2>
          <p className="text-muted-foreground">
            Paste your raw data to begin scanning for sensitive information.
          </p>
        </div>

        <Card className="shadow-md" data-testid="card-text-paste">
          <CardHeader>
            <CardTitle className="text-lg">Paste Data</CardTitle>
            <CardDescription>Enter or paste your raw data content below</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="paste-text" className="text-sm font-medium">
                Data Content
              </Label>
              <Textarea
                id="paste-text"
                placeholder="Paste your data here..."
                className="mt-2 min-h-64 resize-none"
                value={dataInput.pastedText || ""}
                onChange={(e) => updateDataInput({ pastedText: e.target.value })}
                data-testid="input-paste-text"
              />
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
