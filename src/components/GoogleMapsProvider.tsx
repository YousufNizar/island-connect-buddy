import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_NEW_GOOGLE_MAPS_API_KEY_HERE') {
    console.error('❌ Google Maps API key is not set or invalid');
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Alert variant="destructive" className="max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-lg font-semibold">Google Maps API Key Required</AlertTitle>
          <AlertDescription className="mt-2 space-y-3">
            <p>The map cannot load because the Google Maps API key is missing or invalid.</p>
            <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
              <p className="font-semibold mb-2">Quick Fix:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                <li>Enable "Maps JavaScript API" and "Places API"</li>
                <li>Create an API key under Credentials</li>
                <li>Add it to your <code className="bg-gray-800 text-white px-1 rounded">.env</code> file</li>
                <li>Restart the dev server</li>
              </ol>
            </div>
            <p className="text-sm">
              📖 See <code className="bg-gray-800 text-white px-1 rounded">GOOGLE_MAPS_SETUP.md</code> for detailed instructions.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      libraries={libraries}
      loadingElement={<div className="flex items-center justify-center min-h-screen">Loading Maps...</div>}
      onError={() => {
        console.error('❌ Failed to load Google Maps. Check your API key and enabled APIs.');
      }}
    >
      {children}
    </LoadScript>
  );
};