'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CalendarView() {
  // Current date/view state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', or 'day'
  
  // Generate dates for the current month to show sample appointments
  const generateCurrentMonthDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Create a few dates in the current month
    const day1 = new Date(year, month, 15);
    const day2 = new Date(year, month, 15);
    const day3 = new Date(year, month, 17);
    const day4 = new Date(year, month, 18);
    const day5 = new Date(year, month, 20);
    
    return [
      day1.toISOString().split('T')[0],
      day2.toISOString().split('T')[0],
      day3.toISOString().split('T')[0],
      day4.toISOString().split('T')[0],
      day5.toISOString().split('T')[0]
    ];
  };

  const currentMonthDates = generateCurrentMonthDates();
  
  // Mock appointments data (in a real app, this would come from an API/database)
  const appointments = [
    { id: 1, client: 'Jane Smith', date: currentMonthDates[0], time: '10:00 AM', duration: 60, service: 'Deep Tissue Massage' },
    { id: 2, client: 'John Doe', date: currentMonthDates[1], time: '2:00 PM', duration: 90, service: 'Swedish Massage' },
    { id: 3, client: 'Emily Johnson', date: currentMonthDates[2], time: '11:30 AM', duration: 75, service: 'Hot Stone Therapy' },
    { id: 4, client: 'Michael Brown', date: currentMonthDates[3], time: '9:00 AM', duration: 60, service: 'Aromatherapy Massage' },
    { id: 5, client: 'Sarah Wilson', date: currentMonthDates[4], time: '1:00 PM', duration: 90, service: 'Deep Tissue Massage' },
  ];

  // Helper functions for date manipulation
  const getMonthName = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const getYear = (date: Date): number => {
    return date.getFullYear();
  };

  // Navigate to previous period (month/week/day)
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next period (month/week/day)
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate days for the month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // If Sunday is 0, make it 7 (to align with a Monday start)
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    
    // Array to hold all the days we'll display
    const days = [];
    
    // Add previous month's trailing days
    for (let i = 1; i < firstDayOfWeek; i++) {
      const prevMonth = new Date(year, month, 0);
      const day = prevMonth.getDate() - (firstDayOfWeek - i - 1);
      days.push({ date: new Date(year, month - 1, day), isCurrentMonth: false });
    }
    
    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Add next month's leading days to complete the grid (up to 42 days total)
    const daysNeededFromNextMonth = 42 - days.length;
    for (let i = 1; i <= daysNeededFromNextMonth; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  // Get appointments for a specific day
  const getAppointmentsForDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(app => app.date === dateString);
  };

  // Format date to ISO string (YYYY-MM-DD)
  const formatDateToISO = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Month view renderer
  const renderMonthView = () => {
    const days = generateMonthDays();
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
      <div className="bg-white rounded shadow">
        {/* Day of week header */}
        <div className="grid grid-cols-7 border-b">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {days.map((day, index) => {
            const dayAppointments = getAppointmentsForDay(day.date);
            return (
              <div 
                key={index} 
                className={`min-h-[100px] border p-1 ${
                  !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${isToday(day.date) ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-medium ${isToday(day.date) ? 'text-blue-600' : ''}`}>
                    {day.date.getDate()}
                  </span>
                  {day.isCurrentMonth && (
                    <Link
                      href={`/appointments/new?date=${formatDateToISO(day.date)}`}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <Plus className="w-4 h-4" />
                    </Link>
                  )}
                </div>
                
                {/* Appointments for this day */}
                <div className="space-y-1">
                  {dayAppointments.map(appointment => (
                    <Link
                      href={`/appointments/${appointment.id}`}
                      key={appointment.id}
                      className="block text-xs bg-primary-100 text-primary-800 p-1 rounded truncate hover:bg-primary-200"
                    >
                      {appointment.time} - {appointment.client}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link 
          href="/appointments" 
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Appointments
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointment Calendar</h1>
        <Link
          href="/appointments/new"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Appointment
        </Link>
      </div>
      
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">
              {getMonthName(currentDate)} {getYear(currentDate)}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex">
              <button 
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 text-sm rounded-l ${
                  viewMode === 'month' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'week' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 text-sm rounded-r ${
                  viewMode === 'day' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Day
              </button>
            </div>
            
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-white border rounded text-gray-700 hover:bg-gray-50"
            >
              Today
            </button>
            
            <div className="flex">
              <button
                onClick={goToPrevious}
                className="p-1 rounded-l border bg-white text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-1 rounded-r border border-l-0 bg-white text-gray-700 hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Render appropriate view based on viewMode */}
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && (
          <div className="py-8 text-center text-gray-500">
            Week view will be implemented in a future update.
          </div>
        )}
        {viewMode === 'day' && (
          <div className="py-8 text-center text-gray-500">
            Day view will be implemented in a future update.
          </div>
        )}
      </div>
    </div>
  );
} 