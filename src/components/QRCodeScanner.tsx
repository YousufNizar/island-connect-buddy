// QR Code Scanner Component
import { useState, useRef, useEffect, useCallback } from 'react';
import QrScanner from 'qr-scanner';
import { Camera, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { checkInTourist, checkOutTourist, getActiveCheckIns } from '../services/qrTrackingService';
import type { QRCodeData, LocationVisit } from '../types/qrTracking';

interface QRCodeScannerProps {
  onClose: () => void;
}

const QRCodeScanner = ({ onClose }: QRCodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QRCodeData | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [touristData, setTouristData] = useState({
    name: '',
    phone: '',
    emergencyContact: '',
    expectedDuration: 60, // default 60 minutes
  });
  const [activeCheckIns, setActiveCheckIns] = useState<LocationVisit[]>([]);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const loadActiveCheckIns = useCallback(async () => {
    try {
      const checkIns = await getActiveCheckIns(touristData.phone);
      setActiveCheckIns(checkIns);
    } catch (err) {
      console.error('Error loading check-ins:', err);
    }
  }, [touristData.phone]);

  // Load active check-ins when phone number is entered
  useEffect(() => {
    if (touristData.phone.length >= 10) {
      loadActiveCheckIns();
    }
  }, [touristData.phone, loadActiveCheckIns]);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setError('');
      setIsScanning(true);

      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          try {
            const data: QRCodeData = JSON.parse(result.data);
            setScanResult(data);
            scanner.stop();
            setIsScanning(false);
          } catch (err) {
            setError('Invalid QR code format');
          }
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current = scanner;
      await scanner.start();
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleCheckIn = async () => {
    if (!scanResult) return;

    if (!touristData.name || !touristData.phone) {
      setError('Please fill in your name and phone number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await checkInTourist(touristData, scanResult, touristData.expectedDuration);
      setSuccess(`✅ Checked in to ${scanResult.locationName}! Have a safe visit.`);
      setScanResult(null);
      await loadActiveCheckIns();
      
      // Clear form
      setTimeout(() => {
        setTouristData({
          name: touristData.name,
          phone: touristData.phone,
          emergencyContact: touristData.emergencyContact,
          expectedDuration: 60,
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check in');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!scanResult) return;

    if (!touristData.phone) {
      setError('Please enter your phone number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await checkOutTourist(touristData.phone, scanResult);
      setSuccess(`✅ Checked out from ${scanResult.locationName}! Thank you for your visit.`);
      setScanResult(null);
      await loadActiveCheckIns();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check out');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError('');
    setSuccess('');
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-hero text-white p-6 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">Location Tracking</h2>
              <p className="text-sm text-white/90">Scan QR code to check in/out</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Error/Success Messages */}
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Tourist Information Form */}
          {!scanResult && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Your Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={touristData.name}
                  onChange={(e) => setTouristData({ ...touristData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={touristData.phone}
                  onChange={(e) => setTouristData({ ...touristData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency">Emergency Contact (Optional)</Label>
                <Input
                  id="emergency"
                  type="tel"
                  placeholder="Emergency contact number"
                  value={touristData.emergencyContact}
                  onChange={(e) =>
                    setTouristData({ ...touristData, emergencyContact: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Expected Visit Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="480"
                  value={touristData.expectedDuration}
                  onChange={(e) =>
                    setTouristData({
                      ...touristData,
                      expectedDuration: parseInt(e.target.value) || 60,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  We'll alert authorities if you don't check out 15 minutes after this time
                </p>
              </div>
            </div>
          )}

          {/* Active Check-ins */}
          {activeCheckIns.length > 0 && !scanResult && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-yellow-600 dark:text-yellow-400">
                ⚠️ Active Check-ins ({activeCheckIns.length})
              </h3>
              <div className="space-y-2">
                {activeCheckIns.map((checkIn) => (
                  <div
                    key={checkIn.id}
                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-3"
                  >
                    <p className="font-semibold text-sm">{checkIn.locationName}</p>
                    <p className="text-xs text-muted-foreground">
                      Checked in: {checkIn.checkInTime?.toLocaleString()}
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                      Don't forget to check out!
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scanner */}
          {!scanResult && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  style={{ display: isScanning ? 'block' : 'none' }}
                />
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Ready to scan</p>
                      <p className="text-sm opacity-75">Click the button below to start</p>
                    </div>
                  </div>
                )}
              </div>

              {!isScanning ? (
                <Button onClick={startScanning} className="w-full" size="lg">
                  <Camera className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              ) : (
                <Button onClick={stopScanning} variant="outline" className="w-full" size="lg">
                  Stop Scanning
                </Button>
              )}
            </div>
          )}

          {/* Scan Result */}
          {scanResult && (
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Location Detected</h3>
                <p className="text-2xl font-bold text-primary mb-1">{scanResult.locationName}</p>
                <p className="text-sm text-muted-foreground">
                  Type: {scanResult.type === 'check-in' ? 'Check-In' : 'Check-Out'}
                </p>
              </div>

              <div className="flex gap-3">
                {scanResult.type === 'check-in' ? (
                  <Button
                    onClick={handleCheckIn}
                    disabled={loading}
                    className="flex-1"
                    size="lg"
                  >
                    {loading ? 'Processing...' : '✓ Check In'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheckOut}
                    disabled={loading}
                    className="flex-1"
                    size="lg"
                  >
                    {loading ? 'Processing...' : '✓ Check Out'}
                  </Button>
                )}
                <Button onClick={resetScanner} variant="outline" size="lg">
                  Scan Again
                </Button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
              🛡️ How it works
            </h4>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Scan the QR code when entering a location</li>
              <li>• Scan again when leaving</li>
              <li>• If you don't check out in time, authorities will be alerted</li>
              <li>• Your safety is our priority</li>
            </ul>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
