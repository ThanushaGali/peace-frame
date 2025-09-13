import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ClipboardCheck, BookOpen, Users, ArrowRight, Shield, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const quickActions = [
    {
      title: "Quick Screening",
      description: "Take a confidential mental health assessment",
      icon: ClipboardCheck,
      href: "/screening",
      variant: "primary" as const,
      note: "No login required"
    },
    {
      title: "AI Chat Support",
      description: "Get immediate support from our AI counselor",
      icon: MessageCircle,
      href: "/chat",
      variant: "healing" as const
    },
    {
      title: "Resource Hub",
      description: "Access self-help resources and educational content",
      icon: BookOpen,
      href: "/resources",
      variant: "calm" as const
    },
    {
      title: "Peer Forum",
      description: "Connect with others in a safe, anonymous space",
      icon: Users,
      href: "/forum",
      variant: "warm" as const
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Your privacy is our top priority. All interactions are secure and anonymous."
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Access support whenever you need it, day or night."
    },
    {
      icon: Heart,
      title: "Evidence-Based",
      description: "Our tools are based on proven psychological interventions and research."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-dark mb-6 leading-tight">
              Your Mental Health
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A safe, confidential platform designed specifically for college students to support mental health and wellbeing.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-white font-medium px-8 py-4 rounded-lg shadow-medium"
            >
              <Link to="/screening">
                <ClipboardCheck className="w-5 h-5 mr-2" />
                Quick Screening
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary/5 px-8 py-4 rounded-lg"
            >
              <Link to="/login">
                Login / Register
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-dark mb-4">
            Get Started Today
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose how you'd like to begin your mental health journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {quickActions.map((action, index) => (
            <Card 
              key={action.title} 
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-0 shadow-soft"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-${action.variant} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-secondary-dark">
                  {action.title}
                </CardTitle>
                {action.note && (
                  <span className="text-xs text-healing-green font-medium bg-healing-green-light px-2 py-1 rounded-full">
                    {action.note}
                  </span>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground mb-6">
                  {action.description}
                </CardDescription>
                <Button 
                  asChild 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary/5 group-hover:text-primary"
                >
                  <Link to={action.href}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 bg-card rounded-2xl mx-4 shadow-soft">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-dark mb-4">
            Why Choose MindSupport?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built specifically for college students with features that prioritize your safety and privacy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-light rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-warm border-0 text-center shadow-medium">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold text-secondary-dark mb-4">
              In Crisis? Get Immediate Help
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you're having thoughts of self-harm or are in immediate danger, please reach out for help right away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="destructive"
                className="font-medium"
              >
                Emergency Helpline: 988
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-secondary-dark text-secondary-dark hover:bg-secondary-dark/5"
              >
                <Link to="/chat">
                  Talk to AI Counselor
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;