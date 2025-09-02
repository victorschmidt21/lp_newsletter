import { NewsletterForm } from "@/components/NewsletterForm";
import { Button } from "@/components/ui/button";
import { Code2, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card p-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-up">
        {/* Badge/Logo */}
        <div className="inline-flex items-center gap-2 bg-muted/50 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20 animate-cyber-glow">
          <Code2 className="w-4 h-4" />
          SaaS Weekly
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          As melhores ideias de
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Negócios do TabNews</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          Receba toda sexta-feira um resumo das oportunidades e tendências de tecnologias mais promissoras da semana.
        </p>

        {/* Newsletter Form */}
        <div className="flex justify-center w-full">
          <NewsletterForm />
        </div>

        {/* View Newsletters Button */}
        <div className="mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/newsletters")}
            className="group hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
          >
            <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Ver Newsletters Enviadas
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
