import { Sidebar } from '@/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Server, Shield, Clock } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido a tu panel de control</p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Recursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium">CPU</div>
                  <div className="text-2xl font-bold">25%</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Memoria</div>
                  <div className="text-2xl font-bold">2.5GB/8GB</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">SSL</div>
                <div className="text-green-600 font-medium">Activo</div>
                <div className="text-sm font-medium">Último backup</div>
                <div>Hace 2 horas</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium">Visitas hoy</div>
                  <div className="text-2xl font-bold">1,234</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Tiempo activo</div>
                  <div className="text-2xl font-bold">99.9%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}