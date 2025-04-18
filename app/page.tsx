import { CalendarClock, Users, Clock, Link as LinkIcon, ExternalLink, Share2, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  // Generate dates for the current month to show sample appointments
  const generateCurrentDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Create a few dates for the current month
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    return [
      formatDate(new Date(year, month, 15)),
      formatDate(new Date(year, month, 15)),
      formatDate(new Date(year, month, 17))
    ];
  };
  
  const currentDates = generateCurrentDates();

  // Mock data for dashboard stats
  const stats = [
    { name: 'Total Appointments', value: '42', icon: CalendarClock, color: 'bg-blue-100 text-blue-600' },
    { name: 'Active Clients', value: '24', icon: Users, color: 'bg-green-100 text-green-600' },
    { name: 'Today\'s Sessions', value: '5', icon: Clock, color: 'bg-purple-100 text-purple-600' },
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    { id: 1, client: 'Jane Smith', date: currentDates[0], time: '10:00 AM', service: 'Deep Tissue Massage' },
    { id: 2, client: 'John Doe', date: currentDates[1], time: '2:00 PM', service: 'Swedish Massage' },
    { id: 3, client: 'Emily Johnson', date: currentDates[2], time: '11:30 AM', service: 'Hot Stone Therapy' },
  ];

  // Mock data for booking links
  const bookingLinks = [
    { id: 'bl1', name: 'Regular Massage Sessions', clicks: 24 },
    { id: 'bl2', name: 'Special Summer Offer', clicks: 12 },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
            <div className="flex space-x-2">
              <Link 
                href="/appointments" 
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View All
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href="/appointments/calendar" 
                className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Calendar
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-primary-50 border-b border-primary-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-primary-800">Calendar View</h2>
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Visualize your schedule with the new calendar view. Easily create appointments by clicking on available days.
                </p>
                <Link 
                  href="/appointments/calendar" 
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Open Calendar View
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Booking Links</h2>
              <Link 
                href="/booking-links" 
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Manage
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
              {bookingLinks.length > 0 ? (
                <div className="space-y-4">
                  {bookingLinks.map(link => (
                    <div key={link.id} className="border rounded p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <LinkIcon className="w-5 h-5 text-primary-600 mr-2" />
                          <span className="font-medium text-gray-900">{link.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{link.clicks} clicks</span>
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/booking-links"
                    className="block w-full text-center py-2 border border-dashed rounded mt-3 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  >
                    <div className="flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View all booking links
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <LinkIcon className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                  <h3 className="text-base font-medium text-gray-900 mb-1">No booking links yet</h3>
                  <p className="text-sm text-gray-500 mb-4">Create links to share with clients</p>
                  <Link
                    href="/booking-links"
                    className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
                  >
                    <Share2 className="w-4 h-4 mr-1.5" />
                    Create Link
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <section>
        <div className="bg-primary-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-primary-700 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link 
              href="/appointments/new" 
              className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              <CalendarClock className="w-5 h-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium">Schedule Appointment</span>
            </Link>
            <Link 
              href="/clients/new" 
              className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              <Users className="w-5 h-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium">Add New Client</span>
            </Link>
            <Link 
              href="/booking-links" 
              className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium">Create Booking Link</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
