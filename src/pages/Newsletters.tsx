import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Send, Calendar, ExternalLink, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Newsletter {
  id: string;
  title: string;
  description: string;
  date: string;
  topics: string[];
  readTime: string;
  status: "sent" | "draft";
}

interface EmailFormState {
  email: string;
  isLoading: boolean;
  isSubmitted: boolean;
}

export const Newsletters = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [emailFormState, setEmailFormState] = useState<EmailFormState>({
    email: "",
    isLoading: false,
    isSubmitted: false,
  });

  // Mock data - em produção viria de uma API
  const newsletters: Newsletter[] = [
    {
      id: "1",
      title: "SaaS Weekly #45 - Inteligência Artificial em 2024",
      description: "Descubra como a IA está revolucionando o mercado de SaaS e quais oportunidades estão surgindo para empreendedores.",
      date: "2024-01-19",
      topics: ["Inteligência Artificial", "Machine Learning", "Automação", "Chatbots"],
      readTime: "5 min",
      status: "sent"
    },
    {
      id: "2",
      title: "SaaS Weekly #44 - Ferramentas de Produtividade",
      description: "As melhores ferramentas para aumentar sua produtividade e organizar seu trabalho de forma eficiente.",
      date: "2024-01-12",
      topics: ["Produtividade", "Organização", "Ferramentas", "Workflow"],
      readTime: "4 min",
      status: "sent"
    },
    {
      id: "3",
      title: "SaaS Weekly #43 - Marketing Digital para SaaS",
      description: "Estratégias comprovadas de marketing digital para fazer seu SaaS crescer e conquistar mais clientes.",
      date: "2024-01-05",
      topics: ["Marketing Digital", "Growth Hacking", "SEO", "Social Media"],
      readTime: "6 min",
      status: "sent"
    },
    {
      id: "4",
      title: "SaaS Weekly #42 - Finanças para Startups",
      description: "Guia completo sobre como gerenciar as finanças da sua startup SaaS e preparar para investimentos.",
      date: "2024-12-29",
      topics: ["Finanças", "Startup", "Investimentos", "Contabilidade"],
      readTime: "7 min",
      status: "sent"
    },
    {
      id: "5",
      title: "SaaS Weekly #41 - Customer Success",
      description: "Como implementar uma estratégia de Customer Success que reduz churn e aumenta a satisfação dos clientes.",
      date: "2024-12-22",
      topics: ["Customer Success", "Churn", "Satisfação", "Suporte"],
      readTime: "5 min",
      status: "sent"
    }
  ];

  const validateEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return false;
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(trimmedEmail);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailFormState.isLoading) return;
    
    if (!validateEmail(emailFormState.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    setEmailFormState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulando envio de email
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch("/api/newsletter/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: emailFormState.email.trim(),
          newsletterId: selectedNewsletter?.id 
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        setEmailFormState(prev => ({ ...prev, isSubmitted: true, isLoading: false }));
        toast({
          title: "Newsletter enviada!",
          description: `A newsletter "${selectedNewsletter?.title}" foi enviada para ${emailFormState.email}`,
        });
        
        // Reset form after success
        setTimeout(() => {
          setEmailFormState({
            email: "",
            isLoading: false,
            isSubmitted: false,
          });
          setSelectedNewsletter(null);
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setEmailFormState(prev => ({ ...prev, isLoading: false }));
      
      let errorMessage = "Erro ao enviar newsletter. Tente novamente.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Tempo limite excedido. Verifique sua conexão e tente novamente.";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleNewsletterSelect = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setEmailFormState({
      email: "",
      isLoading: false,
      isSubmitted: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Newsletters Enviadas</h1>
          </div>
        </div>

        {/* Newsletters Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="newsletter-card bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(newsletter.date)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {newsletter.readTime}
                  </span>
                  {newsletter.status === "sent" && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                {newsletter.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {newsletter.description}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {newsletter.topics.slice(0, 3).map((topic, index) => (
                  <span
                    key={index}
                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                  >
                    {topic}
                  </span>
                ))}
                {newsletter.topics.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{newsletter.topics.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleNewsletterSelect(newsletter)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reenviar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Reenviar Newsletter</DialogTitle>
                    </DialogHeader>
                    
                    {emailFormState.isSubmitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Enviado!</h3>
                        <p className="text-muted-foreground">
                          Newsletter enviada com sucesso para {emailFormState.email}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email para envio
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="contato@empresa.com"
                            value={emailFormState.email}
                            onChange={(e) => setEmailFormState(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full"
                            required
                            disabled={emailFormState.isLoading}
                          />
                        </div>
                        
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">Newsletter selecionada:</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedNewsletter?.title}
                          </p>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={emailFormState.isLoading || !emailFormState.email.trim()}
                        >
                          {emailFormState.isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Enviar Newsletter
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {newsletters.length === 0 && (
          <div className="text-center py-16">
            <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma newsletter encontrada</h3>
            <p className="text-muted-foreground">
              As newsletters enviadas aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletters;
