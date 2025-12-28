import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";

export function SidebarContent() {
  const { user, signOut } = useAuth();

  return (
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
}
