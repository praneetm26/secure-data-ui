import { Check } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Data Input" },
  { number: 2, label: "PII Detection" },
  { number: 3, label: "Sanitization Preview" },
];

export default function WizardNavigation({ currentStep }: WizardNavigationProps) {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-6" data-testid="wizard-navigation">
      <div className="stepper-background">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1 relative z-10">
              <div className="flex flex-col items-center w-full">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    currentStep > step.number
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : currentStep === step.number
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-xl scale-110"
                      : "bg-muted text-muted-foreground shadow-sm"
                  }`}
                  data-testid={`wizard-step-${step.number}`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-8 h-8" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span
                  className={`mt-4 text-xs sm:text-sm font-bold text-center transition-colors ${
                    currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-2 mx-6 rounded-full transition-all duration-300 ${
                    currentStep > step.number ? "bg-primary shadow-sm" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
