'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function NewAppointmentPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  // Mock data for clients and services
  const clients = [
    { id: 1, name: 'Jane Smith' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Emily Johnson' },
    { id: 4, name: 'Michael Brown' },
    { id: 5, name: 'Sarah Wilson' },
  ];

  const services = [
    { id: 1, name: 'Deep Tissue Massage', duration: 60 },
    { id: 2, name: 'Swedish Massage', duration: 90 },
    { id: 3, name: 'Hot Stone Therapy', duration: 75 },
    { id: 4, name: 'Aromatherapy Massage', duration: 60 },
    { id: 5, name: 'Sports Massage', duration: 45 },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const [formData, setFormData] = useState({
    clientId: '',
    serviceId: '',
    date: dateParam || '',
    time: '',
    notes: '',
  });

  const [selectedService, setSelectedService] = useState<any>(null);

  // Set the date when the component mounts if it's provided in URL params
  useEffect(() => {
    if (dateParam) {
      setFormData(prev => ({
        ...prev,
        date: dateParam
      }));
    }
  }, [dateParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'serviceId') {
      const service = services.find(service => service.id === parseInt(value));
      setSelectedService(service);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment form data:', formData);
    // Here you would typically save the appointment data to a database
    // For now we'll just log it to the console
    
    // After saving, you could redirect to the appointments list page
    window.location.href = '/appointments';
  };

  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/appointments" 
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Appointments
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">New Appointment</h1>
      </div>
      
      <div className="bg-white rounded shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                Client
              </label>
              <select
                id="clientId"
                name="clientId"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.clientId}
                onChange={handleChange}
                required
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                id="serviceId"
                name="serviceId"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.serviceId}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} ({service.duration} min)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="block w-full rounded pl-10 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                id="time"
                name="time"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
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
              href="/appointments"
              className="inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 