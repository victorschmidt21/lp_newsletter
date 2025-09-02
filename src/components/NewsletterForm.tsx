import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle, Loader2, ArrowRight } from "lucide-react";

interface FormState {
  email: string;
  isLoading: boolean;
  isSubmitted: boolean;
}

export const NewsletterForm = () => {
  const [state, setState] = useState<FormState>({
    email: "",
    isLoading: false,
    isSubmitted: false,
  });
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(state.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulating API call
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email }),
      });

      if (response.ok) {
        setState(prev => ({ ...prev, isSubmitted: true, isLoading: false }));
        toast({
          title: "Sucesso!",
          description: "Você foi inscrito na nossa newsletter.",
        });
      } else {
        throw new Error("Erro ao inscrever");
      }
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Erro",
        description: "Erro ao processar inscrição. Tente novamente.",
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
          <p className="text-muted-foreground">
            Você receberá nossa próxima newsletter toda sexta-feira.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-up">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="email"
            placeholder="seu@email.com"
            value={state.email}
            onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
            className="pl-10 h-12 text-base focus:shadow-[var(--shadow-focus)] focus:border-primary/50 transition-all duration-300 bg-input/50"
            disabled={state.isLoading}
            required
          />
        </div>
        <Button
          type="submit"
          variant="newsletter"
          size="lg"
          disabled={state.isLoading || !state.email}
          className="h-12 px-6 min-w-[140px]"
        >
          {state.isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Receba as ideias
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Sem spam. Cancele quando quiser.
      </p>
    </form>
  );
};