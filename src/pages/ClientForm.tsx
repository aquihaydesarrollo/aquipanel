import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export default function ClientForm({ isEditMode, clientData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

    useEffect(() => {
        if (isEditMode && clientData) {
            setFormData(clientData);
        }
    }, [isEditMode, clientData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedData = localStorage.getItem('clientData');
        let clients = [];
        if (storedData) {
            clients = JSON.parse(storedData);
        }
        // Lógica para añadir o editar
        if (isEditMode) {
            const index = clients.findIndex(client => client.id === formData.id);
            if (index !== -1) {
                clients[index] = { ...clients[index], ...formData };
            }
        } else {
            formData.id = clients.length ? clients[clients.length - 1].id + 1 : 1;
            clients.push(formData);
        }
        localStorage.setItem('clientData', JSON.stringify(clients));
        navigate('/client-list'); // Redirigir a la lista de clientes después de guardar
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="nif">NIF</Label>
                    <Input id="nif" value={formData.nif} onChange={(e) => setFormData({ ...formData, nif: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input id="postalCode" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="municipality">Municipio</Label>
                    <Input id="municipality" value={formData.municipality} onChange={(e) => setFormData({ ...formData, municipality: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="socialReason">Razón Social</Label>
                    <Input id="socialReason" value={formData.socialReason} onChange={(e) => setFormData({ ...formData, socialReason: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="employees">Número de Empleados</Label>
                    <Input id="employees" value={formData.employees} onChange={(e) => setFormData({ ...formData, employees: e.target.value })} />
                </div>
                <div>
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input id="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                </div>
                <Button type="submit">{isEditMode ? 'Actualizar Cliente' : 'Añadir Cliente'}</Button>
            </form>
        </div>
    );
}
