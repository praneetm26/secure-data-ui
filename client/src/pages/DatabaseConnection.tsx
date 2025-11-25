import { useLocation } from "wouter";
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
    <div className="max-w-4xl mx-auto px-6 py-8 page-transition">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Database Connection</h2>
          <p className="text-muted-foreground">
            Connect to your database to begin scanning for sensitive information.
          </p>
        </div>

        <Card className="shadow-md" data-testid="card-database">
          <CardHeader>
            <CardTitle className="text-lg">Database Details</CardTitle>
            <CardDescription>Enter your database connection information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="db-name" className="text-sm font-medium">
                  Database Name
                </Label>
                <Input
                  id="db-name"
                  placeholder="my_database"
                  className="mt-2"
                  value={dataInput.dbName || ""}
                  onChange={(e) => updateDataInput({ dbName: e.target.value })}
                  data-testid="input-db-name"
                />
              </div>
              <div>
                <Label htmlFor="table-name" className="text-sm font-medium">
                  Table Name
                </Label>
                <Input
                  id="table-name"
                  placeholder="users_table"
                  className="mt-2"
                  value={dataInput.tableName || ""}
                  onChange={(e) => updateDataInput({ tableName: e.target.value })}
                  data-testid="input-table-name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md" data-testid="card-query">
          <CardHeader>
            <CardTitle className="text-lg">Database Query (Optional)</CardTitle>
            <CardDescription>Enter a custom SQL query to fetch specific data</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="SELECT * FROM table_name WHERE condition..."
              className="min-h-24 font-mono text-sm resize-none"
              value={dataInput.query || ""}
              onChange={(e) => updateDataInput({ query: e.target.value })}
              data-testid="input-query"
            />
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
