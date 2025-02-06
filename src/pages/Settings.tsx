import { Sidebar } from '@/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useTheme } from '@/lib/theme-provider'
import { User, Palette, Shield, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [userData, setUserData] = useState({
    name: 'Usuario',
    email: 'usuario@email.com',
    avatar: 'https://github.com/shadcn.png',
    currentPassword: '',
    newPassword: '',
    role: 'client'
  })

  const handleUserUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Actualizando usuario:', userData)
  }

  return (
    <div className="flex">
      <Sidebar>
        <Link to="/client-list">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              true && "justify-center px-2"
            )}
          >
            <span>Listado de Clientes</span>
          </Button>
        </Link>
      </Sidebar>
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground">Gestiona las preferencias de tu cuenta</p>
        </header>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:max-w-[100%]">
            <TabsTrigger value="profile" className="flex-1 flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Apariencia</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex-1 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex-1 flex items-center gap-2">
              <span>Roles de Usuario</span>
            </TabsTrigger>
            <TabsTrigger value="danger" className="flex-1 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Peligro</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perfil de Usuario</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUserUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">URL del Avatar</Label>
                    <Input
                      id="avatar"
                      value={userData.avatar}
                      onChange={(e) => setUserData({...userData, avatar: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <select
                      id="role"
                      value={userData.role}
                      onChange={(e) => setUserData({...userData, role: e.target.value})}
                      className="border rounded-md p-2"
                    >
                      <option value="admin">Administrador</option>
                      <option value="client">Cliente</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña Actual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={userData.currentPassword}
                      onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={userData.newPassword}
                      onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
                    />
                  </div>
                  <Button type="submit">Guardar Cambios</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-toggle">Tema Oscuro</Label>
                  <Switch 
                    id="theme-toggle"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autenticación de dos factores</h3>
                    <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad</p>
                  </div>
                  <Switch />
                </div>
                <Button variant="outline">Cambiar Contraseña</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Roles de Usuario</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Aquí puedes crear y gestionar roles de usuario.</p>
                <Button variant="outline">Añadir Rol</Button>
                <Button variant="outline">Eliminar Rol</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger">
            <Card>
              <CardHeader>
                <CardTitle>Zona de Peligro</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Eliminar Cuenta</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}