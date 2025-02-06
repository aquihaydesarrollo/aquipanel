import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    nif: '',
    email: '',
    address: '',
    postalCode: '',
    municipality: '',
    socialReason: '',
    employees: '',
    website: '',
    isActive: true,
    role: '',
  });

  const [activeTab, setActiveTab] = useState('basic');

  // Simulando la carga de datos del cliente
  // En un caso real, aquí harías una llamada a la API para obtener los datos del cliente por ID
  // useEffect(() => {
  //   fetch(`/api/clients/${id}`)
  //     .then(response => response.json())
  //     .then(data => setClientData(data));
  // }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el cliente
    // fetch(`/api/clients/${id}`, { method: 'PUT', body: JSON.stringify(clientData) });
    navigate('/client-list'); // Redirigir a la lista de clientes después de guardar
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <Card>
          <CardHeader>
            <CardTitle>Editar Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic" onClick={() => setActiveTab('basic')}>Información Básica</TabsTrigger>
                <TabsTrigger value="details" onClick={() => setActiveTab('details')}>Detalles Adicionales</TabsTrigger>
                <TabsTrigger value="company" onClick={() => setActiveTab('company')}>Datos Empresa</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                        className="border rounded p-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={clientData.phone}
                        onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                        className="border rounded p-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nif">NIF</Label>
                      <Input
                        id="nif"
                        value={clientData.nif}
                        onChange={(e) => setClientData({ ...clientData, nif: e.target.value })}
                        className="border rounded p-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                        className="border rounded p-2"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={clientData.isActive}
                        onCheckedChange={(checked) => setClientData({ ...clientData, isActive: checked })}
                      />
                      <Label htmlFor="isActive">Cliente Activo</Label>
                    </div>
                    <div>
                      <Label htmlFor="role">Rol del Cliente</Label>
                      <Select
                        value={clientData.role}
                        onValueChange={(value) => setClientData({ ...clientData, role: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="manager">Gestor</SelectItem>
                          <SelectItem value="user">Usuario</SelectItem>
                          <SelectItem value="guest">Invitado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="bg-blue-500 text-white rounded p-2">Guardar Cambios</Button>
                </form>
              </TabsContent>
              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={clientData.address}
                      onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                      id="postalCode"
                      value={clientData.postalCode}
                      onChange={(e) => setClientData({ ...clientData, postalCode: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="municipality">Municipio</Label>
                    <Input
                      id="municipality"
                      value={clientData.municipality}
                      onChange={(e) => setClientData({ ...clientData, municipality: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialReason">Razón Social</Label>
                    <Input
                      id="socialReason"
                      value={clientData.socialReason}
                      onChange={(e) => setClientData({ ...clientData, socialReason: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Página Web</Label>
                    <Input
                      id="website"
                      value={clientData.website}
                      onChange={(e) => setClientData({ ...clientData, website: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="company">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employees">Número de Empleados</Label>
                    <Input
                      id="employees"
                      value={clientData.employees}
                      onChange={(e) => setClientData({ ...clientData, employees: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
