import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Screening from "./pages/Screening";
import Booking from "./pages/Booking";
import Resources from "./pages/Resources";
import Forum from "./pages/Forum";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Components
import { AppSidebar } from "./components/AppSidebar";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  const handleLogin = (userData: { role: string; name: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleLanguageToggle = () => {
    setCurrentLanguage(prev => prev === "EN" ? "हिं" : "EN");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar 
                user={user} 
                onLogout={handleLogout}
                onLanguageToggle={handleLanguageToggle}
                currentLanguage={currentLanguage}
              />
              
              <main className="flex-1 flex flex-col overflow-hidden">
                {/* Global header with sidebar trigger */}
                <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6">
                  <SidebarTrigger className="mr-4" />
                  <div className="flex-1" />
                  {/* Additional header content can go here */}
                </header>

                {/* Main content area */}
                <div className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/screening" element={<Screening />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
