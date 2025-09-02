import { NewsletterForm } from "@/components/NewsletterForm";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-up">
        {/* Badge/Logo */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Newsletter Exclusiva
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight mb-6">
          Insights que
          <br />
          <span className="text-primary">transformam negócios</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          Receba semanalmente as estratégias mais eficazes para acelerar seu crescimento profissional.
        </p>

        {/* Newsletter Form */}
        <div className="flex justify-center mb-6">
          <NewsletterForm />
        </div>

        {/* Social Proof */}
        <p className="text-sm text-muted-foreground">
          Junte-se a <span className="font-semibold text-foreground">2.847+</span> profissionais que já recebem nossos insights
        </p>
      </div>
    </div>
  );
};

export default Index;
