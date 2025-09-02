import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { EmailDB } from "@/db/email_db";

interface FormState {
  email: string;
  isLoading: boolean;
  isSubmitted: boolean;
}

export const NewsletterForm = () => {
  const emailDB = new EmailDB();
  const [state, setState] = useState<FormState>({
    email: "",
    isLoading: false,
    isSubmitted: false,
  });
  const { toast } = useToast();

  // Reset form when component unmounts or when needed
  React.useEffect(() => {
    return () => {
      setState({
        email: "",
        isLoading: false,
        isSubmitted: false,
      });
    };
  }, []);

  // Cleanup function for API calls
  React.useEffect(() => {
    return () => {
      // This will run when component unmounts
      // No need to do anything here as we're not storing the AbortController
    };
  }, []);

  const validateEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return false;

    // More comprehensive email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(trimmedEmail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (state.isLoading) {
      return;
    }

    if (!validateEmail(state.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await emailDB.create(state.email);

      clearTimeout(timeoutId);

      // if (response.ok) {
      //   setState(prev => ({ ...prev, isSubmitted: true, isLoading: false }));
      //   toast({
      //     title: "Sucesso!",
      //     description: "Você foi inscrito na nossa newsletter.",
      //   });
      // } else {
      //   const errorData = await response.json().catch(() => ({}));
      //   throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      // }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));

      let errorMessage = "Erro ao processar inscrição. Tente novamente.";

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage =
            "Tempo limite excedido. Verifique sua conexão e tente novamente.";
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (state.isSubmitted) {
    return (
      <div className="flex flex-col items-center animate-fade-up">
        <div className="bg-card border rounded-2xl p-8 text-center shadow-lg max-w-md">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Pronto!</h3>
          <p className="text-muted-foreground mb-4">
            Você receberá nossa próxima newsletter toda sexta-feira.
          </p>
          <button
            onClick={() =>
              setState((prev) => ({ ...prev, isSubmitted: false, email: "" }))
            }
            className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
          >
            Inscrever outro email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form animate-fade-up">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="email"
            placeholder="seu@email.com"
            value={state.email}
            onChange={(e) =>
              setState((prev) => ({ ...prev, email: e.target.value }))
            }
            className={`pl-10 h-12 text-base focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 bg-input/50 ${
              state.email && !validateEmail(state.email)
                ? "border-destructive/50"
                : ""
            }`}
            disabled={state.isLoading}
            required
            aria-label="Email para newsletter"
            aria-describedby="email-help"
            autoComplete="email"
            spellCheck="false"
            aria-invalid={state.email ? !validateEmail(state.email) : undefined}
          />
        </div>
        <Button
          type="submit"
          variant="newsletter"
          size="lg"
          disabled={state.isLoading || !state.email.trim()}
          className="newsletter-button group h-12 px-6 min-w-[140px] sm:min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
          aria-label={
            state.isLoading
              ? "Enviando inscrição..."
              : "Inscrever na newsletter"
          }
          aria-busy={state.isLoading}
        >
          {state.isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span className="hidden sm:inline">Enviando...</span>
              <span className="sm:hidden">...</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Receba as ideias</span>
              <span className="sm:hidden">Receber</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
      <p
        id="email-help"
        className="text-xs text-muted-foreground mt-3 text-center"
      >
        Sem spam. Cancele quando quiser.
      </p>
    </form>
  );
};
