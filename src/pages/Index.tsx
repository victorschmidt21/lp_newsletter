import { NewsletterForm } from "@/components/NewsletterForm";
import { Code2 } from "lucide-react";

const Index = () => {
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
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SaaS do TabNews</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          Receba toda sexta-feira um resumo das oportunidades e tendências de SaaS mais promissoras da semana.
        </p>

        {/* Newsletter Form */}
        <div className="flex justify-center">
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
