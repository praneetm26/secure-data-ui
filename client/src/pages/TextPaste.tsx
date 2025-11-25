import { useLocation } from "wouter";
import { FileText } from "lucide-react";
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
    <div className="max-w-5xl mx-auto px-8 py-10 page-transition">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-foreground tracking-tight">Text Paste</h2>
          <p className="text-base text-muted-foreground">
            Paste your raw data to begin scanning for sensitive information.
          </p>
        </div>

        <Card className="enterprise-shadow card-fade-in border-card-border" data-testid="card-text-paste">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Paste Data</CardTitle>
                <CardDescription className="text-sm mt-1">Enter or paste your raw data content below</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div>
              <Label htmlFor="paste-text" className="text-sm font-semibold mb-2 block">
                Data Content
              </Label>
              <Textarea
                id="paste-text"
                placeholder="Paste your data here..."
                className="min-h-64 resize-none font-mono text-sm"
                value={dataInput.pastedText || ""}
                onChange={(e) => updateDataInput({ pastedText: e.target.value })}
                data-testid="input-paste-text"
              />
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
