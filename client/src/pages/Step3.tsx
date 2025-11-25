import { ArrowLeft, Download, Send } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useWizard } from "@/context/WizardContext";

export default function Step3() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { getSanitizedPreview } = useWizard();
  
  const sanitizedData = getSanitizedPreview();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your sanitized data file is being prepared for download.",
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Submitted Successfully",
      description: "Sanitized data has been submitted to the GenAI processing pipeline.",
    });
  };

  const sanitizedCount = sanitizedData.filter((row) => row.masked).length;
  const totalRows = sanitizedData.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 page-transition">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Sanitization Preview</h2>
          <p className="text-muted-foreground">
            Review the before and after comparison of your data sanitization.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md" data-testid="card-total-rows">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Columns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground" data-testid="text-total-rows">
                {totalRows}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md" data-testid="card-sanitized-columns">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sanitized Columns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary" data-testid="text-sanitized-columns">
                {sanitizedCount}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md" data-testid="card-protection-rate">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Protection Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground" data-testid="text-protection-rate">
                {Math.round((sanitizedCount / totalRows) * 100)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md" data-testid="card-preview-table">
          <CardHeader>
            <CardTitle className="text-lg">Before vs After Comparison</CardTitle>
            <CardDescription>
              Masked values are highlighted for easy identification
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Column Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Original Value
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                      Sanitized Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sanitizedData.map((row, index) => (
                    <tr
                      key={row.columnName}
                      className={`border-b border-border ${
                        index % 2 === 0 ? "bg-background" : "bg-card"
                      }`}
                      data-testid={`row-preview-${row.columnName}`}
                    >
                      <td className="py-3 px-4">
                        <code className="text-sm font-mono text-foreground">{row.columnName}</code>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-foreground">{row.original}</span>
                      </td>
                      <td className="py-3 px-4">
                        {row.masked ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
                            <span className="text-sm font-mono text-muted-foreground">
                              {row.sanitized}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-foreground">{row.sanitized}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setLocation("/step2")}
            data-testid="button-back"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK
          </Button>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleDownload}
              data-testid="button-download"
              className="w-full sm:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              DOWNLOAD CLEAN FILE
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              data-testid="button-submit"
              className="w-full sm:w-auto"
            >
              <Send className="w-4 h-4 mr-2" />
              SUBMIT TO GENAI TOOL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
