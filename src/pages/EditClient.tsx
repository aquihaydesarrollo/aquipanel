import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const clientId = id ? parseInt(id) : null;
  const [clientData, setClientData] = useState(() => {
    if (clientId) {
      const storedData = localStorage.getItem('clientData');
      if (storedData) {
        const clients = JSON.parse(storedData);
        const client = clients.find(c => c.id === clientId);
        return client ? client : {
          id: Date.now(), // Generar un nuevo ID basado en la fecha actual
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
          cif: '',
          numEmpleados: '',
          direccion: '',
          telefono: '',
          sector: '',
          fechaFundacion: '',
        };
      }
    }
    return {
      id: Date.now(), // Generar un nuevo ID basado en la fecha actual
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
      cif: '',
      numEmpleados: '',
      direccion: '',
      telefono: '',
      sector: '',
      fechaFundacion: '',
    };
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [successMessage, setSuccessMessage] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('clientData');
    if (storedData) {
      const clients = JSON.parse(storedData);
      const client = clients.find(c => c.id === clientId);
      if (client) {
        setClientData(client);
      }
    }
  }, [clientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del cliente antes de guardar:', clientData);
    const storedData = localStorage.getItem('clientData');
    let clients = [];
    if (storedData) {
      clients = JSON.parse(storedData);
    }
    const index = clients.findIndex(c => c.id === clientId);
    if (index !== -1) {
      clients[index] = clientData;
    } else {
      clients.push(clientData);
    }
    localStorage.setItem('clientData', JSON.stringify(clients));
    setNotification('Los datos se han guardado correctamente.');
  };

  const handleSaveAndBack = () => {
    handleSubmit();
    navigate('/client-list');
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
            <Tabs defaultValue="basic" className="space-y-6 border-b border-gray-200">
              <TabsList className="grid w-full grid-cols-3 border-b border-gray-300">
                <TabsTrigger value="basic" className={`p-4 ${activeTab === 'basic' ? 'bg-gray-200' : 'bg-transparent'} hover:bg-gray-200 transition duration-200`} onClick={() => setActiveTab('basic')}>Información Básica</TabsTrigger>
                <TabsTrigger value="details" className={`p-4 ${activeTab === 'details' ? 'bg-gray-200' : 'bg-transparent'} hover:bg-gray-200 transition duration-200`} onClick={() => setActiveTab('details')}>Detalles Adicionales</TabsTrigger>
                <TabsTrigger value="company" className={`p-4 ${activeTab === 'company' ? 'bg-gray-200' : 'bg-transparent'} hover:bg-gray-200 transition duration-200`} onClick={() => setActiveTab('company')}>Datos Empresa</TabsTrigger>
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
                        className="border rounded p-2 bg-white"
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
                    <Label htmlFor="cif">CIF:</Label>
                    <Input
                      id="cif"
                      value={clientData.cif}
                      onChange={(e) => setClientData({ ...clientData, cif: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numEmpleados">Número de empleados:</Label>
                    <Input
                      id="numEmpleados"
                      type="number"
                      value={clientData.numEmpleados}
                      onChange={(e) => setClientData({ ...clientData, numEmpleados: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="direccion">Dirección:</Label>
                    <Input
                      id="direccion"
                      value={clientData.direccion}
                      onChange={(e) => setClientData({ ...clientData, direccion: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono:</Label>
                    <Input
                      id="telefono"
                      value={clientData.telefono}
                      onChange={(e) => setClientData({ ...clientData, telefono: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electrónico:</Label>
                    <Input
                      id="email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sector">Sector de Actividad:</Label>
                    <Input
                      id="sector"
                      value={clientData.sector}
                      onChange={(e) => setClientData({ ...clientData, sector: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fechaFundacion">Fecha de Fundación:</Label>
                    <Input
                      id="fechaFundacion"
                      type="date"
                      value={clientData.fechaFundacion}
                      onChange={(e) => setClientData({ ...clientData, fechaFundacion: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="space-y-4">
              {notification && <div className="text-green-500 mt-4">{notification}</div>}
              <div className="flex space-x-4 mt-4">
                <Button className="text-white bg-gray-800 rounded p-2 hover:bg-gray-700 transition duration-200" onClick={handleSubmit}>Guardar Cambios</Button>
                <Button className="text-white bg-gray-800 rounded p-2 hover:bg-gray-700 transition duration-200" onClick={(e) => { handleSubmit(e); navigate('/client-list'); }}>Guardar y Volver</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
