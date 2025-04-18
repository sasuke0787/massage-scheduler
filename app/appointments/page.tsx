'use client';

import { useState } from 'react';
import { CalendarClock, Plus, Search, Filter, ChevronLeft, ChevronRight, Calendar, ListFilter } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentsPage() {
  // Generate dates for the current month to show sample appointments
  const generateCurrentDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Create a few dates in the current month
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    return [
      formatDate(new Date(year, month, 15)),
      formatDate(new Date(year, month, 15)),
      formatDate(new Date(year, month, 17)),
      formatDate(new Date(year, month, 18)),
      formatDate(new Date(year, month, 20))
    ];
  };
  
  const currentDates = generateCurrentDates();

  // Mock data for appointments
  const mockAppointments = [
    { id: 1, client: 'Jane Smith', date: currentDates[0], time: '10:00 AM', service: 'Deep Tissue Massage', duration: '60 min', status: 'Confirmed' },
    { id: 2, client: 'John Doe', date: currentDates[1], time: '2:00 PM', service: 'Swedish Massage', duration: '90 min', status: 'Confirmed' },
    { id: 3, client: 'Emily Johnson', date: currentDates[2], time: '11:30 AM', service: 'Hot Stone Therapy', duration: '75 min', status: 'Pending' },
    { id: 4, client: 'Michael Brown', date: currentDates[3], time: '9:00 AM', service: 'Aromatherapy Massage', duration: '60 min', status: 'Confirmed' },
    { id: 5, client: 'Sarah Wilson', date: currentDates[4], time: '1:00 PM', service: 'Deep Tissue Massage', duration: '90 min', status: 'Cancelled' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  
  // Filter appointments based on search term
  const filteredAppointments = mockAppointments.filter(
    appointment => 
      appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <Link
          href="/appointments/new"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Appointment
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
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex border rounded-md overflow-hidden">
              <Link
                href="/appointments"
                className={`flex items-center px-3 py-2 ${
                  viewMode === 'list' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ListFilter className="h-4 w-4 mr-1" />
                <span className="text-sm">List</span>
              </Link>
              <Link
                href="/appointments/calendar"
                className={`flex items-center px-3 py-2 ${
                  viewMode === 'calendar' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">Calendar</span>
              </Link>
            </div>
            
            <button className="inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <div className="ml-4 flex">
              <button className="inline-flex items-center px-2 py-2 border rounded-l bg-white text-gray-500 hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center px-2 py-2 border rounded-r bg-white text-gray-500 hover:bg-gray-50 border-l-0">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/appointments/${appointment.id}`} 
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      View
                    </Link>
                    <Link 
                      href={`/appointments/${appointment.id}/edit`} 
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