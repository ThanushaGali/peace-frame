import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { Heart } from "lucide-react";

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
          <Routes>
            {/* Login route - full screen without sidebar */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
            {/* All other routes */}
            <Route path="/" element={
              user ? (
                // Authenticated layout with sidebar
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
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLanguageToggle}
                            className="flex items-center gap-2"
                          >
                            <Globe className="h-4 w-4" />
                            {currentLanguage}
                          </Button>
                        </div>
                      </header>

                      {/* Main content area */}
                      <div className="flex-1 overflow-auto">
                        <Home />
                      </div>
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                // Guest layout without sidebar
                <div className="min-h-screen bg-background">
                  {/* Guest header */}
                  <header className="border-b bg-card/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-primary rounded-lg">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-sm text-foreground">MindSupport</h2>
                          <p className="text-xs text-muted-foreground">Digital Wellness</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLanguageToggle}
                          className="flex items-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          {currentLanguage}
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link to="/login">Login</Link>
                        </Button>
                      </div>
                    </div>
                  </header>

                  {/* Main content for guests */}
                  <main>
                    <Home />
                  </main>
                </div>
              )
            } />
            
            {/* Individual routes for authenticated users */}
            <Route path="/chat" element={
              user ? (
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar 
                      user={user} 
                      onLogout={handleLogout}
                      onLanguageToggle={handleLanguageToggle}
                      currentLanguage={currentLanguage}
                    />
                    <main className="flex-1 flex flex-col overflow-hidden">
                      <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex-1" />
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            {currentLanguage}
                          </Button>
                        </div>
                      </header>
                      <div className="flex-1 overflow-auto">
                        <Chat />
                      </div>
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen bg-background">
                  <header className="border-b bg-card/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-primary rounded-lg">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-sm text-foreground">MindSupport</h2>
                          <p className="text-xs text-muted-foreground">Digital Wellness</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          {currentLanguage}
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link to="/login">Login</Link>
                        </Button>
                      </div>
                    </div>
                  </header>
                  <main><Chat /></main>
                </div>
              )
            } />
            
            <Route path="/screening" element={
              user ? (
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar user={user} onLogout={handleLogout} onLanguageToggle={handleLanguageToggle} currentLanguage={currentLanguage} />
                    <main className="flex-1 flex flex-col overflow-hidden">
                      <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex-1" />
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />{currentLanguage}
                          </Button>
                        </div>
                      </header>
                      <div className="flex-1 overflow-auto"><Screening /></div>
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen bg-background">
                  <header className="border-b bg-card/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-primary rounded-lg"><Heart className="h-5 w-5 text-white" /></div>
                        <div><h2 className="font-semibold text-sm text-foreground">MindSupport</h2><p className="text-xs text-muted-foreground">Digital Wellness</p></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2"><Globe className="h-4 w-4" />{currentLanguage}</Button>
                        <Button asChild variant="outline" size="sm"><Link to="/login">Login</Link></Button>
                      </div>
                    </div>
                  </header>
                  <main><Screening /></main>
                </div>
              )
            } />
            
            <Route path="/booking" element={
              user ? (
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar user={user} onLogout={handleLogout} onLanguageToggle={handleLanguageToggle} currentLanguage={currentLanguage} />
                    <main className="flex-1 flex flex-col overflow-hidden">
                      <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex-1" />
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />{currentLanguage}
                          </Button>
                        </div>
                      </header>
                      <div className="flex-1 overflow-auto"><Booking /></div>
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Login Required</h1>
                    <p className="text-muted-foreground mb-4">Please log in to access the booking system.</p>
                    <Button asChild><Link to="/login">Login</Link></Button>
                  </div>
                </div>
              )
            } />
            
            <Route path="/resources" element={
              user ? (
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar user={user} onLogout={handleLogout} onLanguageToggle={handleLanguageToggle} currentLanguage={currentLanguage} />
                    <main className="flex-1 flex flex-col overflow-hidden">
                      <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex-1" />
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />{currentLanguage}
                          </Button>
                        </div>
                      </header>
                      <div className="flex-1 overflow-auto"><Resources /></div>
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen bg-background">
                  <header className="border-b bg-card/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-primary rounded-lg"><Heart className="h-5 w-5 text-white" /></div>
                        <div><h2 className="font-semibold text-sm text-foreground">MindSupport</h2><p className="text-xs text-muted-foreground">Digital Wellness</p></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2"><Globe className="h-4 w-4" />{currentLanguage}</Button>
                        <Button asChild variant="outline" size="sm"><Link to="/login">Login</Link></Button>
                      </div>
                    </div>
                  </header>
                  <main><Resources /></main>
                </div>
              )
            } />
            
            <Route path="/forum" element={
              user ? (
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar user={user} onLogout={handleLogout} onLanguageToggle={handleLanguageToggle} currentLanguage={currentLanguage} />
                    <main className="flex-1 flex flex-col overflow-hidden">
                      <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex-1" />
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />{currentLanguage}
                          </Button>
                        </div>
                      </header>
                      <div className="flex-1 overflow-auto"><Forum /></div>
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Login Required</h1>
                    <p className="text-muted-foreground mb-4">Please log in to access the community forum.</p>
                    <Button asChild><Link to="/login">Login</Link></Button>
                  </div>
                </div>
              )
            } />
            
            <Route path="/dashboard" element={
              user && (user.role === 'admin' || user.role === 'counsellor') ? (
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <AppSidebar user={user} onLogout={handleLogout} onLanguageToggle={handleLanguageToggle} currentLanguage={currentLanguage} />
                    <main className="flex-1 flex flex-col overflow-hidden">
                      <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex-1" />
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" onClick={handleLanguageToggle} className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />{currentLanguage}
                          </Button>
                        </div>
                      </header>
                      <div className="flex-1 overflow-auto"><Dashboard /></div>
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p className="text-muted-foreground mb-4">You don't have permission to access the dashboard.</p>
                    <Button asChild><Link to="/">Go Home</Link></Button>
                  </div>
                </div>
              )
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
