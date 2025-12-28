export default function Dashboard() {
  const { user, signOut, isAuthenticated, isLoading } = useAuth();
  const contacts = useQuery(api.contacts.get);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Fix for mobile background color (overscroll/browser chrome)
  useEffect(() => {
    // Force body background to match dashboard theme
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#000000";
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center bg-black">
        <div className="animate-pulse text-primary">Loading Dashboard...</div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Bookings",
      value: contacts?.length || 0,
      icon: Calendar,
      change: "+12% from last month",
      color: "text-blue-500"
    },
    {
      title: "New Messages",
      value: contacts?.filter(c => c.type === "general").length || 0,
      icon: MessageSquare,
      change: "+4 new today",
      color: "text-green-500"
    },
    {
      title: "Portfolio Views",
      value: "12.5k",
      icon: TrendingUp,
      change: "+18% this week",
      color: "text-purple-500"
    },
    {
      title: "Gallery Items",
      value: "124",
      icon: ImageIcon,
      change: "12 added recently",
      color: "text-pink-500"
    }
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Studio
        </h1>
      </div>

      <nav className="space-y-2 flex-1">
        {[
          { name: "Overview", icon: LayoutDashboard, active: true },
          { name: "Bookings", icon: Calendar, active: false },
          { name: "Clients", icon: Users, active: false },
          { name: "Gallery", icon: ImageIcon, active: false },
          { name: "Settings", icon: Settings, active: false },
        ].map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={`w-full justify-start gap-3 text-base ${
              item.active 
                ? "bg-white/10 text-white" 
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Avatar className="w-8 h-8 border border-white/10">
            <AvatarImage src={user?.image} />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name || "Admin"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button 
          variant="destructive" 
          className="w-full justify-start gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-[100dvh] w-full bg-black flex dark text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      {/* Background Photo Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black" />
      </div>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6 fixed h-full z-20"
      >
        <SidebarContent />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 w-full max-w-[100vw] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
=======
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { 
  Calendar, 
  TrendingUp,
  MessageSquare,
  Image as ImageIcon,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { SidebarContent } from "@/components/dashboard/SidebarContent";

export default function Dashboard() {
  const { user, signOut, isAuthenticated, isLoading } = useAuth();
  const contacts = useQuery(api.contacts.get);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Fix for mobile background color (overscroll/browser chrome)
  useEffect(() => {
    // Force body background to match dashboard theme
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#000000";
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center bg-black">
        <div className="animate-pulse text-primary">Loading Dashboard...</div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Bookings",
      value: contacts?.length || 0,
      icon: Calendar,
      change: "+12% from last month",
      color: "text-blue-500"
    },
    {
      title: "New Messages",
      value: contacts?.filter(c => c.type === "general").length || 0,
      icon: MessageSquare,
      change: "+4 new today",
      color: "text-green-500"
    },
    {
      title: "Portfolio Views",
      value: "12.5k",
      icon: TrendingUp,
      change: "+18% this week",
      color: "text-purple-500"
    },
    {
      title: "Gallery Items",
      value: "124",
      icon: ImageIcon,
      change: "12 added recently",
      color: "text-pink-500"
    }
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-black flex dark text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      {/* Background Photo Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black" />
      </div>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6 fixed h-full z-20"
      >
        <SidebarContent />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 w-full max-w-[100vw] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden shrink-0 -ml-2 hover:bg-white/10">
                    <Menu className="w-6 h-6 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-neutral-950 border-r border-white/10 p-6 flex flex-col border-none text-foreground">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Dashboard</h2>
                <p className="text-sm md:text-base text-muted-foreground">Welcome back to your creative space.</p>
              </div>
            </div>
            <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              + New Project
            </Button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {contacts?.map((contact, i) => (
                        <motion.div
                          key={contact._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                        >
                          <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                              {contact.name.charAt(0)}
                            </div>
                            <div className="sm:hidden flex-1">
                               <h4 className="font-medium text-white truncate">{contact.name}</h4>
                               <span className="text-xs text-muted-foreground">
                                {new Date(contact._creationTime).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0 w-full">
                            <div className="hidden sm:flex justify-between items-start mb-1">
                              <h4 className="font-medium text-white truncate">{contact.name}</h4>
                              <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                {new Date(contact._creationTime).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate mb-2">{contact.email}</p>
                            <p className="text-sm text-white/80 line-clamp-2">{contact.message}</p>
                          </div>
                        </motion.div>
                      ))}
                      {(!contacts || contacts.length === 0) && (
                        <div className="text-center text-muted-foreground py-10">
                          No inquiries yet.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Upcoming Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex gap-4 relative pl-6 border-l border-white/10">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background/50" />
                        <div>
                          <p className="text-sm font-medium text-white">Wedding Shoot</p>
                          <p className="text-xs text-muted-foreground mb-1">Tomorrow, 10:00 AM</p>
                          <div className="flex -space-x-2">
                            <Avatar className="w-6 h-6 border border-background">
                              <AvatarFallback className="text-[10px]">JD</AvatarFallback>
                            </Avatar>
                            <Avatar className="w-6 h-6 border border-background">
                              <AvatarFallback className="text-[10px]">AS</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10">
                    <h4 className="font-medium text-white mb-2">Pro Tip</h4>
                    <p className="text-xs text-muted-foreground">
                      Update your portfolio regularly to keep your engagement rates high.
                    </p>
                    <Button variant="link" className="text-primary text-xs px-0 h-auto mt-2">
                      Upload Photos &rarr;
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
=======
export default function Dashboard() {
  const { user, signOut, isAuthenticated, isLoading } = useAuth();
  const contacts = useQuery(api.contacts.get);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Fix for mobile background color (overscroll/browser chrome)
  useEffect(() => {
    // Force body background to match dashboard theme
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#000000";
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center bg-black">
        <div className="animate-pulse text-primary">Loading Dashboard...</div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Bookings",
      value: contacts?.length || 0,
      icon: Calendar,
      change: "+12% from last month",
      color: "text-blue-500"
    },
    {
      title: "New Messages",
      value: contacts?.filter(c => c.type === "general").length || 0,
      icon: MessageSquare,
      change: "+4 new today",
      color: "text-green-500"
    },
    {
      title: "Portfolio Views",
      value: "12.5k",
      icon: TrendingUp,
      change: "+18% this week",
      color: "text-purple-500"
    },
    {
      title: "Gallery Items",
      value: "124",
      icon: ImageIcon,
      change: "12 added recently",
      color: "text-pink-500"
    }
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Studio
        </h1>
      </div>

      <nav className="space-y-2 flex-1">
        {[
          { name: "Overview", icon: LayoutDashboard, active: true },
          { name: "Bookings", icon: Calendar, active: false },
          { name: "Clients", icon: Users, active: false },
          { name: "Gallery", icon: ImageIcon, active: false },
          { name: "Settings", icon: Settings, active: false },
        ].map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={`w-full justify-start gap-3 text-base ${
              item.active 
                ? "bg-white/10 text-white" 
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Avatar className="w-8 h-8 border border-white/10">
            <AvatarImage src={user?.image} />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name || "Admin"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button 
          variant="destructive" 
          className="w-full justify-start gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-[100dvh] w-full bg-black flex dark text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      {/* Background Photo Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black" />
      </div>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6 fixed h-full z-20"
      >
        <SidebarContent />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 w-full max-w-[100vw] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
=======
  return (
    <div className="min-h-[100dvh] w-full bg-black flex dark text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      {/* Background Photo Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black" />
      </div>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6 fixed h-full z-20"
      >
        <SidebarContent />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 w-full max-w-[100vw] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >

  const stats = [
    {
      title: "Total Bookings",
      value: contacts?.length || 0,
      icon: Calendar,
      change: "+12% from last month",
      color: "text-blue-500"
    },
    {
      title: "New Messages",
      value: contacts?.filter(c => c.type === "general").length || 0,
      icon: MessageSquare,
      change: "+4 new today",
      color: "text-green-500"
    },
    {
      title: "Portfolio Views",
      value: "12.5k",
      icon: TrendingUp,
      change: "+18% this week",
      color: "text-purple-500"
    },
    {
      title: "Gallery Items",
      value: "124",
      icon: ImageIcon,
      change: "12 added recently",
      color: "text-pink-500"
    }
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Studio
        </h1>
      </div>

      <nav className="space-y-2 flex-1">
        {[
          { name: "Overview", icon: LayoutDashboard, active: true },
          { name: "Bookings", icon: Calendar, active: false },
          { name: "Clients", icon: Users, active: false },
          { name: "Gallery", icon: ImageIcon, active: false },
          { name: "Settings", icon: Settings, active: false },
        ].map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className={`w-full justify-start gap-3 text-base ${
              item.active 
                ? "bg-white/10 text-white" 
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Avatar className="w-8 h-8 border border-white/10">
            <AvatarImage src={user?.image} />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name || "Admin"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button 
          variant="destructive" 
          className="w-full justify-start gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-[100dvh] w-full bg-neutral-950 flex dark text-foreground selection:bg-primary/30 overflow-x-hidden">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6 fixed h-full z-10"
      >
        <SidebarContent />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 w-full max-w-[100vw]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden shrink-0 -ml-2 hover:bg-white/10">
                    <Menu className="w-6 h-6 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-neutral-950 border-r border-white/10 p-6 flex flex-col border-none text-foreground">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Dashboard</h2>
                <p className="text-sm md:text-base text-muted-foreground">Welcome back to your creative space.</p>
              </div>
            </div>
            <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              + New Project
            </Button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {contacts?.map((contact, i) => (
                        <motion.div
                          key={contact._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                        >
                          <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                              {contact.name.charAt(0)}
                            </div>
                            <div className="sm:hidden flex-1">
                               <h4 className="font-medium text-white truncate">{contact.name}</h4>
                               <span className="text-xs text-muted-foreground">
                                {new Date(contact._creationTime).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0 w-full">
                            <div className="hidden sm:flex justify-between items-start mb-1">
                              <h4 className="font-medium text-white truncate">{contact.name}</h4>
                              <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                                {new Date(contact._creationTime).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate mb-2">{contact.email}</p>
                            <p className="text-sm text-white/80 line-clamp-2">{contact.message}</p>
                          </div>
                        </motion.div>
                      ))}
                      {(!contacts || contacts.length === 0) && (
                        <div className="text-center text-muted-foreground py-10">
                          No inquiries yet.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Upcoming Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex gap-4 relative pl-6 border-l border-white/10">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background/50" />
                        <div>
                          <p className="text-sm font-medium text-white">Wedding Shoot</p>
                          <p className="text-xs text-muted-foreground mb-1">Tomorrow, 10:00 AM</p>
                          <div className="flex -space-x-2">
                            <Avatar className="w-6 h-6 border border-background">
                              <AvatarFallback className="text-[10px]">JD</AvatarFallback>
                            </Avatar>
                            <Avatar className="w-6 h-6 border border-background">
                              <AvatarFallback className="text-[10px]">AS</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10">
                    <h4 className="font-medium text-white mb-2">Pro Tip</h4>
                    <p className="text-xs text-muted-foreground">
                      Update your portfolio regularly to keep your engagement rates high.
                    </p>
                    <Button variant="link" className="text-primary text-xs px-0 h-auto mt-2">
                      Upload Photos &rarr;
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}