import { useLocation } from "wouter";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useWizard } from "@/context/WizardContext";

export default function DatabaseConnection() {
  const [, setLocation] = useLocation();
  const { dataInput, updateDataInput } = useWizard();

  const handleRunScan = () => {
    setLocation("/step2");
  };

  const hasInput = dataInput.dbName && dataInput.tableName;

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 page-transition">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-foreground tracking-tight">Database Connection</h2>
          <p className="text-base text-muted-foreground">
            Connect to your database to begin scanning for sensitive information.
          </p>
        </div>

        <Card className="enterprise-shadow card-fade-in border-card-border" data-testid="card-database">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Database Details</CardTitle>
                <CardDescription className="text-sm mt-1">Enter your database connection information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-5">
              <div>
                <Label htmlFor="db-name" className="text-sm font-semibold mb-2 block">
                  Database Name
                </Label>
                <Input
                  id="db-name"
                  placeholder="my_database"
                  className="h-11"
                  value={dataInput.dbName || ""}
                  onChange={(e) => updateDataInput({ dbName: e.target.value })}
                  data-testid="input-db-name"
                />
              </div>
              <div>
                <Label htmlFor="table-name" className="text-sm font-semibold mb-2 block">
                  Table Name
                </Label>
                <Input
                  id="table-name"
                  placeholder="users_table"
                  className="h-11"
                  value={dataInput.tableName || ""}
                  onChange={(e) => updateDataInput({ tableName: e.target.value })}
                  data-testid="input-table-name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-shadow card-fade-in border-card-border" style={{ animationDelay: '0.1s' }} data-testid="card-query">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Database Query (Optional)</CardTitle>
            <CardDescription className="text-sm mt-1">Enter a custom SQL query to fetch specific data</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Textarea
              placeholder="SELECT * FROM table_name WHERE condition..."
              className="min-h-32 font-mono text-sm resize-none"
              value={dataInput.query || ""}
              onChange={(e) => updateDataInput({ query: e.target.value })}
              data-testid="input-query"
            />
          </CardContent>
        </Card>

        <Card className="enterprise-shadow card-fade-in border-card-border" style={{ animationDelay: '0.2s' }} data-testid="card-options">
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
