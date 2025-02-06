import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

export default function ClientList() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Cliente 1', phone: '123456789', nif: 'NIF123', email: 'cliente1@email.com', address: 'Calle 1', postalCode: '28001', municipality: 'Madrid', socialReason: 'Razón 1', employees: 10, website: 'www.cliente1.com' },
    { id: 2, name: 'Cliente 2', phone: '987654321', nif: 'NIF456', email: 'cliente2@email.com', address: 'Calle 2', postalCode: '28002', municipality: 'Madrid', socialReason: 'Razón 2', employees: 20, website: 'www.cliente2.com' },
    { id: 3, name: 'Cliente 3', phone: '456789123', nif: 'NIF789', email: 'cliente3@email.com', address: 'Calle 3', postalCode: '28003', municipality: 'Madrid', socialReason: 'Razón 3', employees: 30, website: 'www.cliente3.com' },
  ]);

  const [filter, setFilter] = useState({ name: '', phone: '', nif: '' });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(filter.name.toLowerCase()) &&
    client.phone.includes(filter.phone) &&
    client.nif.includes(filter.nif)
  );

  const handleDelete = (id) => {
    // Implementar lógica para eliminar un cliente
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
            <div className="mb-4 flex items-center">
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
              <Button variant="outline" className="mr-2">Importar CSV</Button>
              <Button variant="outline">Importar espoCRM</Button>
            </div>
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
                        <Button variant="outline">✏️ Editar</Button>
                      </Link>
                      <Button variant="outline" onClick={() => handleDelete(client.id)}>🗑️ Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
