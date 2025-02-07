import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cn from 'classnames';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState({ name: '', phone: '', nif: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('clientData');
    if (!storedData) {
        const initialClients = [
            { id: 1, name: 'Cliente 1', phone: '123456789', nif: 'NIF123', email: 'cliente1@email.com', address: 'Calle 1', postalCode: '28001', municipality: 'Madrid', socialReason: 'Razón 1', employees: 10, website: 'www.cliente1.com' },
            { id: 2, name: 'Cliente 2', phone: '987654321', nif: 'NIF456', email: 'cliente2@email.com', address: 'Calle 2', postalCode: '28002', municipality: 'Madrid', socialReason: 'Razón 2', employees: 20, website: 'www.cliente2.com' },
            { id: 3, name: 'Cliente 3', phone: '456789123', nif: 'NIF789', email: 'cliente3@email.com', address: 'Calle 3', postalCode: '28003', municipality: 'Madrid', socialReason: 'Razón 3', employees: 30, website: 'www.cliente3.com' },
        ];
        localStorage.setItem('clientData', JSON.stringify(initialClients));
        setClients(initialClients);
    }
    else {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
            setClients(parsedData);
        } else {
            console.error('Los datos de clientes no son un array:', parsedData);
        }
    }
  }, []);

  const filteredClients = Array.isArray(clients) ? clients.filter(client => 
    client.name.toLowerCase().includes(filter.name.toLowerCase()) &&
    (filter.phone ? client.phone.includes(filter.phone) : true) &&
    (filter.nif ? client.nif.includes(filter.nif) : true)
  ) : [];

  const handleDelete = (id) => {
    const storedData = localStorage.getItem('clientData');
    if (storedData) {
      const clients = JSON.parse(storedData);
      if (Array.isArray(clients)) {
        const updatedClients = clients.filter(client => client.id !== id);
        localStorage.setItem('clientData', JSON.stringify(updatedClients));
        setClients(updatedClients);
      } else {
        console.error('Los datos de clientes no son un array:', clients);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del cliente antes de guardar:', clientData);
    const storedData = localStorage.getItem('clientData');
    let clients = [];
    if (storedData) {
      clients = JSON.parse(storedData);
    }
    // Generar un nuevo ID si no existe
    if (!clientData.id) {
      clientData.id = Date.now(); // Generar un nuevo ID basado en la fecha actual
    }
    const index = clients.findIndex(c => c.id === clientData.id);
    if (index !== -1) {
      clients[index] = clientData;
    } else {
      clients.push(clientData);
    }
    localStorage.setItem('clientData', JSON.stringify(clients));
    setNotification('Los datos se han guardado correctamente.');
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Listado de Clientes</h1>
          <p className="text-muted-foreground">Gestiona la lista de clientes</p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Filtrar por nombre"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                className={cn("border rounded p-2 mr-2", "dark:bg-gray-800 dark:border-gray-700 dark:text-white")}
              />
              <input
                type="text"
                placeholder="Filtrar por teléfono"
                value={filter.phone}
                onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
                className={cn("border rounded p-2 mr-2", "dark:bg-gray-800 dark:border-gray-700 dark:text-white")}
              />
              <input
                type="text"
                placeholder="Filtrar por NIF"
                value={filter.nif}
                onChange={(e) => setFilter({ ...filter, nif: e.target.value })}
                className={cn("border rounded p-2 mr-2", "dark:bg-gray-800 dark:border-gray-700 dark:text-white")}
              />
              <Button className="text-white bg-gray-800 rounded p-2 hover:bg-gray-700 transition duration-200">Importar CSV</Button>
              <Button className="text-white bg-gray-800 rounded p-2 hover:bg-gray-700 transition duration-200">Importar espoCRM</Button>
              <Link to="/add-client">
                <Button className="text-white bg-gray-800 rounded p-2 hover:bg-gray-700 transition duration-200">Añadir Nuevo Cliente</Button>
              </Link>
            </div>
            {filteredClients.length === 0 ? <p>No hay clientes disponibles.</p> : 
              <table className="min-w-full divide-y divide-gray-200 w-full">
                <thead className={cn("bg-gray-50", "dark:bg-gray-800")}>  
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIF</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className={cn("bg-white divide-y divide-gray-200", "dark:bg-gray-900 dark:divide-gray-700")}>  
                  {filteredClients.map(client => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.nif}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/edit-client/${client.id}`}> 
                          <Button className="text-white bg-gray-800 rounded p-2 hover:bg-gray-700 transition duration-200 mr-2">✏️ Editar</Button>
                        </Link>
                        <Button className="text-white bg-gray-800 rounded p-2 hover:bg-gray-700 transition duration-200">🗑️ Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
