'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Link as LinkIcon, Plus, Globe, PlusCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BookingLinksPage() {
  // In a real app, this would be fetched from your database
  const therapistId = "t1"; // Example therapist ID
  
  // Mock data for existing booking links (would be fetched from database)
  const [bookingLinks, setBookingLinks] = useState([
    { 
      id: 'bl1', 
      name: 'Regular Massage Sessions', 
      url: `/book/${therapistId}`, 
      created: '2023-04-10', 
      clicks: 24 
    },
    { 
      id: 'bl2', 
      name: 'Special Summer Offer', 
      url: `/book/${therapistId}?offer=summer2023`, 
      created: '2023-05-01', 
      clicks: 12 
    }
  ]);

  const [showNewLinkForm, setShowNewLinkForm] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  const createNewLink = () => {
    if (!newLinkName.trim()) return;
    
    // In a real app, you would make an API call to create the link
    const newLink = {
      id: `bl${bookingLinks.length + 1}`,
      name: newLinkName,
      url: `/book/${therapistId}`,
      created: new Date().toISOString().split('T')[0],
      clicks: 0
    };

    setBookingLinks([...bookingLinks, newLink]);
    setNewLinkName('');
    setShowNewLinkForm(false);
  };

  const copyToClipboard = (id: string, url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLinkId(id);
    
    // Reset the copied status after 2 seconds
    setTimeout(() => {
      setCopiedLinkId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Booking Links</h1>
        <button
          onClick={() => setShowNewLinkForm(true)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Link
        </button>
      </div>

      <div className="bg-white rounded shadow p-6">
        {showNewLinkForm ? (
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Booking Link</h2>
            <div className="mb-4">
              <label htmlFor="linkName" className="block text-sm font-medium text-gray-700 mb-1">
                Link Name
              </label>
              <input
                type="text"
                id="linkName"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                placeholder="e.g., Regular Massage Sessions"
                className="block w-full rounded shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Give your link a descriptive name to remember what it's for.
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewLinkForm(false)}
                className="px-4 py-2 border rounded font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createNewLink}
                disabled={!newLinkName.trim()}
                className={`px-4 py-2 rounded font-medium ${
                  newLinkName.trim()
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create Link
              </button>
            </div>
          </div>
        ) : null}

        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Booking Links</h2>
        <p className="mb-6 text-gray-600">
          Share these links with your clients to allow them to book appointments with you directly.
        </p>

        {bookingLinks.length > 0 ? (
          <div className="space-y-4">
            {bookingLinks.map((link) => (
              <div key={link.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{link.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Globe className="w-4 h-4 mr-1" />
                      <span className="truncate max-w-md">{`${window.location.origin}${link.url}`}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(link.id, link.url)}
                    className="inline-flex items-center px-3 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {copiedLinkId === link.id ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500 divide-x">
                  <div className="pr-3">Created: {link.created}</div>
                  <div className="px-3">Clicks: {link.clicks}</div>
                  <div className="pl-3">
                    <Link
                      href={link.url}
                      target="_blank"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      View booking page
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed rounded">
            <LinkIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No booking links yet</h3>
            <p className="text-gray-500 mb-4">Create your first booking link to share with clients.</p>
            <button
              onClick={() => setShowNewLinkForm(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Booking Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 