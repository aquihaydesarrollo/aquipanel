import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export default function AddClient() {
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
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedData = localStorage.getItem('clientData');
        let clients = [];
        if (storedData) {
            clients = JSON.parse(storedData);
        }
        // Asegurarse de que clients sea un array
        if (!Array.isArray(clients)) {
            clients = [];
        }
        // Asignar un nuevo ID al cliente
        clientData.id = clients.length ? clients[clients.length - 1].id + 1 : 1;
        clients.push(clientData);
        localStorage.setItem('clientData', JSON.stringify(clients));
        navigate('/client-list'); // Redirigir a la lista de clientes después de guardar
    };

    return (
        <div className="flex justify-center p-4">
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={clientData.name} onChange={(e) => setClientData({ ...clientData, name: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={clientData.phone} onChange={(e) => setClientData({ ...clientData, phone: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="nif">NIF</Label>
                    <Input id="nif" value={clientData.nif} onChange={(e) => setClientData({ ...clientData, nif: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" value={clientData.email} onChange={(e) => setClientData({ ...clientData, email: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" value={clientData.address} onChange={(e) => setClientData({ ...clientData, address: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input id="postalCode" value={clientData.postalCode} onChange={(e) => setClientData({ ...clientData, postalCode: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="municipality">Municipio</Label>
                    <Input id="municipality" value={clientData.municipality} onChange={(e) => setClientData({ ...clientData, municipality: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="socialReason">Razón Social</Label>
                    <Input id="socialReason" value={clientData.socialReason} onChange={(e) => setClientData({ ...clientData, socialReason: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="employees">Número de Empleados</Label>
                    <Input id="employees" value={clientData.employees} onChange={(e) => setClientData({ ...clientData, employees: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input id="website" value={clientData.website} onChange={(e) => setClientData({ ...clientData, website: e.target.value })} />
                </div>
                <Button type="submit">Añadir Cliente</Button>
            </form>
        </div>
    );
}
