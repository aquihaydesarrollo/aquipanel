import { AuthDialog } from "./components/ui/auth/auth-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { Server, Shield, Clock } from "lucide-react"

export default function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-[980px] mx-auto text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] mb-6">
          Bienvenido a AquiPanel
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground mx-auto mb-8">
          Tu panel de control todo en uno. Gestiona tus servicios, monitorea tu
          sistema y más.
        </p>
        <AuthDialog />
      </div>
    </div>
  )
}