import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Server,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"
import { useTheme } from "@/lib/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { theme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="relative">
      <div
        className={cn(
          "pb-12 min-h-screen border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Título y logo */}
        <div className="space-y-4 py-4 px-4 border-b">
          <div className={cn(
            "flex items-center gap-2 px-2",
            collapsed && "justify-center"
          )}>
            <Server className="h-6 w-6 text-primary" />
            {!collapsed && <h2 className="text-lg font-semibold">AquiPanel</h2>}
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">Dashboard</span>}
                </Button>
              </Link>
              <Link to="/client-list">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <User className="h-4 w-4" />
                  <span className={cn("ml-2", collapsed && "hidden")}>Clientes</span>
                </Button>
              </Link>
              <Link to="/settings">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">Configuración</span>}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className={cn(
          "absolute bottom-4 space-y-4",
          collapsed ? "left-2 right-2" : "left-4 right-4"
        )}>
          <div className={cn(
            "flex items-center gap-4 px-2",
            collapsed && "justify-center"
          )}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Usuario</p>
                <p className="text-xs text-muted-foreground">usuario@email.com</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Cerrar Sesión</span>}
          </Button>
        </div>
      </div>

      {/* Botón para colapsar/expandir */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}