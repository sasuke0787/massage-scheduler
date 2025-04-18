'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewClientPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Client form data:', formData);
    // Here you would typically save the client data to a database
    // For now we'll just log it to the console
    
    // After saving, you could redirect to the clients list page
    window.location.href = '/clients';
  };

  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/clients" 
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Clients
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">New Client</h1>
      </div>
      
      <div className="bg-white rounded shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes (preferences, medical conditions, etc.)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <Link
              href="/clients"
              className="inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 