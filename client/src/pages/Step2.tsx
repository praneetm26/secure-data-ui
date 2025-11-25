import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useWizard } from "@/context/WizardContext";
import type { ActionOption } from "@shared/schema";

export default function Step2() {
  const [, setLocation] = useLocation();
  const { piiColumns, updateColumnAction } = useWizard();

  const handleActionChange = (columnName: string, action: ActionOption) => {
    updateColumnAction(columnName, action);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Direct PII":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "Indirect PII":
        return <Info className="w-4 h-4 text-primary" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-green-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Direct PII":
        return <Badge variant="destructive" className="text-xs">Direct PII</Badge>;
      case "Indirect PII":
        return <Badge className="text-xs bg-primary">Indirect PII</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Non-PII</Badge>;
    }
  };

  const totalColumns = piiColumns.length;
  const piiCount = piiColumns.filter((col) => col.category !== "Non-PII").length;
  const uniquePIITypes = Array.from(new Set(piiColumns.map((col) => col.piiType).filter((type) => type !== "None")));

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 page-transition">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">PII Detection Results</h2>
          <p className="text-muted-foreground">
            Review detected sensitive information and select appropriate sanitization actions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md" data-testid="card-total-columns">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Columns Scanned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground" data-testid="text-total-columns">
                {totalColumns}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md" data-testid="card-pii-columns">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                PII Columns Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary" data-testid="text-pii-columns">
                {piiCount}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md" data-testid="card-pii-types">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                PII Types Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground" data-testid="text-pii-types">
                {uniquePIITypes.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md" data-testid="card-results-table">
          <CardHeader>
            <CardTitle className="text-lg">Column Analysis</CardTitle>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Column Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      PII Type Detected
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {piiColumns.map((column, index) => (
                    <tr
                      key={column.columnName}
                      className={`border-b border-border ${
                        index % 2 === 0 ? "bg-background" : "bg-card"
                      }`}
                      data-testid={`row-column-${column.columnName}`}
                    >
                      <td className="py-3 px-4">
                        <code className="text-sm font-mono text-foreground">{column.columnName}</code>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-foreground">{column.piiType}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(column.category)}
                          {getCategoryBadge(column.category)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Select
                          value={column.action}
                          onValueChange={(value) =>
                            handleActionChange(column.columnName, value as ActionOption)
                          }
                        >
                          <SelectTrigger
                            className="w-36"
                            data-testid={`select-action-${column.columnName}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mask">Mask</SelectItem>
                            <SelectItem value="tokenize">Tokenize</SelectItem>
                            <SelectItem value="hash">Hash</SelectItem>
                            <SelectItem value="remove">Remove</SelectItem>
                            <SelectItem value="keep">Keep</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK
          </Button>
          <Button
            size="lg"
            onClick={() => setLocation("/step3")}
            data-testid="button-next"
          >
            NEXT: PREVIEW
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
