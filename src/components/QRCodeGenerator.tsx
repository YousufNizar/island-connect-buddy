// QR Code Generator Component for Locations
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Download, MapPin, Copy, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { QRCodeData } from '../types/qrTracking';

type QRCodeGeneratorProps = {
  onClose?: () => void;
};

const QRCodeGenerator = ({ onClose }: QRCodeGeneratorProps) => {
  const [locationName, setLocationName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [qrType, setQrType] = useState<'check-in' | 'check-out'>('check-in');
  const [copied, setCopied] = useState(false);

  const generateQRData = (): QRCodeData => {
    return {
      locationId: locationId || `loc_${Date.now()}`,
      locationName,
      timestamp: Date.now(),
      type: qrType,
    };
  };

  const qrCodeValue = locationName ? JSON.stringify(generateQRData()) : '';

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `${locationName}_${qrType}_QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const copyQRData = () => {
    navigator.clipboard.writeText(qrCodeValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Generate Location QR Code</h2>
            <p className="text-sm text-muted-foreground">Create QR codes for check-in/check-out</p>
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/10 hover:text-destructive shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location-name">Location Name *</Label>
          <Input
            id="location-name"
            placeholder="e.g., Sigiriya Rock Fortress"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location-id">Location ID (Optional)</Label>
          <Input
            id="location-id"
            placeholder="Auto-generated if left empty"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="qr-type">QR Code Type</Label>
          <Select value={qrType} onValueChange={(value: 'check-in' | 'check-out') => setQrType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="check-in">Check-In</SelectItem>
              <SelectItem value="check-out">Check-Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          size="lg" 
          className="w-full" 
          disabled={!locationName.trim()}
          onClick={() => {
            // The QR code will appear automatically below
            document.getElementById('qr-code-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Generate QR Code
        </Button>
      </div>

      {locationName && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border-2 border-dashed border-border flex flex-col items-center">
            <div id="qr-code-container" className="bg-white p-4 rounded-lg">
              <QRCode
                id="qr-code-svg"
                value={qrCodeValue}
                size={256}
                level="H"
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-semibold text-lg">{locationName}</p>
              <p className="text-sm text-muted-foreground">
                {qrType === 'check-in' ? '📍 Check-In QR Code' : '🚪 Check-Out QR Code'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={downloadQRCode} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
            <Button onClick={copyQRData} variant="outline">
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Data
                </>
              )}
            </Button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2">📋 Instructions</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Print and display this QR code at the location entrance</li>
              <li>• Generate separate codes for check-in and check-out</li>
              <li>• Ensure QR codes are placed in well-lit, accessible areas</li>
              <li>• Include instructions for tourists in multiple languages</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
