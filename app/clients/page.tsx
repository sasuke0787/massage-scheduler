'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
  // Mock data for clients
  const mockClients = [
    { id: 1, name: 'Jane Smith', phone: '(555) 123-4567', email: 'jane@example.com', lastVisit: '2023-04-10', appointmentsCount: 12 },
    { id: 2, name: 'John Doe', phone: '(555) 234-5678', email: 'john@example.com', lastVisit: '2023-04-05', appointmentsCount: 8 },
    { id: 3, name: 'Emily Johnson', phone: '(555) 345-6789', email: 'emily@example.com', lastVisit: '2023-04-12', appointmentsCount: 15 },
    { id: 4, name: 'Michael Brown', phone: '(555) 456-7890', email: 'michael@example.com', lastVisit: '2023-03-30', appointmentsCount: 5 },
    { id: 5, name: 'Sarah Wilson', phone: '(555) 567-8901', email: 'sarah@example.com', lastVisit: '2023-04-08', appointmentsCount: 10 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter clients based on search term
  const filteredClients = mockClients.filter(
    client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <Link
          href="/clients/new"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Client
        </Link>
      </div>

      <div className="bg-white rounded shadow p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded border pl-10 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <button className="inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Appointments
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {client.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Mail className="h-4 w-4 mr-1 text-gray-400" />
                        {client.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.appointmentsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/clients/${client.id}`} 
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      View
                    </Link>
                    <Link 
                      href={`/clients/${client.id}/edit`} 
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 