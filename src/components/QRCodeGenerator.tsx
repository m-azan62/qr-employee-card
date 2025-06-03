
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode } from 'lucide-react';

interface QRCodeGeneratorProps {
  employeeId: string;
}

const QRCodeGenerator = ({ employeeId }: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    setIsGenerating(true);
    const profileUrl = `${window.location.origin}/employee/${employeeId}`;
    
    // Using QR Server API for free QR code generation
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileUrl)}`;
    setQrCodeUrl(qrUrl);
    setIsGenerating(false);
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `employee-${employeeId}-qr.png`;
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={generateQRCode}>
          <QrCode className="w-4 h-4 mr-1" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Employee QR Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isGenerating ? (
            <div className="text-center py-8">
              <p>Generating QR code...</p>
            </div>
          ) : qrCodeUrl ? (
            <div className="text-center space-y-4">
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto border rounded" />
              <p className="text-sm text-gray-600">
                Scan this QR code to view the employee profile
              </p>
              <div className="space-x-2">
                <Button onClick={downloadQRCode}>Download QR Code</Button>
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/employee/${employeeId}`)}>
                  Copy Link
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p>Click "QR Code" to generate</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeGenerator;
