'use client';

import { useState, useEffect } from 'react';
import { Calendar, CalendarCheck, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// This page will be accessible via a public link without requiring login
export default function PublicBookingPage() {
  const params = useParams();
  const therapistId = params.therapistId as string;
  
  // In a real app, you would fetch the therapist info from a database
  const therapistInfo = {
    id: therapistId,
    name: 'Jane Therapist', // This would be fetched from a database
    services: [
      { id: 1, name: 'Deep Tissue Massage', duration: 60, price: '$85' },
      { id: 2, name: 'Swedish Massage', duration: 90, price: '$120' },
      { id: 3, name: 'Hot Stone Therapy', duration: 75, price: '$95' },
    ]
  };

  // Mock available dates (in a real app, these would be fetched based on therapist's schedule)
  const availableDates = [
    '2023-05-15', '2023-05-16', '2023-05-17', '2023-05-18', '2023-05-19'
  ];

  // Mock available time slots (in a real app, these would depend on the selected date and service)
  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleClientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the appointment to your backend
    console.log('Booking submitted:', {
      therapistId,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      clientInfo
    });

    // Show success message or redirect
    setCurrentStep(4); // Move to confirmation step
  };

  const nextStep = () => {
    setCurrentStep(current => current + 1);
  };

  const prevStep = () => {
    setCurrentStep(current => current - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Book an Appointment with {therapistInfo.name}</h1>
        <p className="mt-2 text-gray-600">Select a service, date, and time that works for you.</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8 max-w-xs mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                currentStep >= step 
                  ? 'border-primary-600 bg-primary-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {step}
            </div>
            <div className="text-xs mt-1 text-gray-500">
              {step === 1 ? 'Service' : step === 2 ? 'Date & Time' : step === 3 ? 'Info' : 'Confirm'}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded shadow p-6">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select a Service</h2>
            <div className="space-y-4">
              {therapistInfo.services.map(service => (
                <div 
                  key={service.id}
                  className={`p-4 border rounded cursor-pointer transition-colors ${
                    selectedService === service.id.toString() 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                  onClick={() => setSelectedService(service.id.toString())}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration} minutes</p>
                    </div>
                    <div className="text-lg font-semibold">{service.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                disabled={!selectedService}
                className={`px-4 py-2 rounded font-medium ${
                  selectedService
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next: Choose Date & Time
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Date & Time</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {availableDates.map(date => (
                  <div
                    key={date}
                    className={`p-2 border rounded text-center cursor-pointer ${
                      selectedDate === date
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="text-sm">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableTimeSlots.map(time => (
                  <div
                    key={time}
                    className={`p-2 border rounded text-center cursor-pointer ${
                      selectedTime === time
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <div className="flex justify-center items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border rounded font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
                className={`px-4 py-2 rounded font-medium ${
                  selectedDate && selectedTime
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next: Your Information
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={clientInfo.name}
                    onChange={handleClientInfoChange}
                    className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
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
                    value={clientInfo.email}
                    onChange={handleClientInfoChange}
                    className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={clientInfo.phone}
                    onChange={handleClientInfoChange}
                    className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={clientInfo.notes}
                    onChange={handleClientInfoChange}
                    className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 border rounded font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded font-medium bg-primary-600 text-white hover:bg-primary-700"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100">
              <CalendarCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been booked successfully. We have sent a confirmation email to {clientInfo.email}.
            </p>
            <div className="bg-gray-50 p-4 mb-6 rounded">
              <div className="text-sm text-gray-700">
                <p><strong>Service:</strong> {therapistInfo.services.find(s => s.id.toString() === selectedService)?.name}</p>
                <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
              </div>
            </div>
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 