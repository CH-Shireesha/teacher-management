
import React, { useState } from 'react';
import { X, Check, Copy, QrCode, Smartphone, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

interface UpiPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  teacherName: string;
  onPaymentComplete: () => void;
}

const UpiPayment: React.FC<UpiPaymentProps> = ({
  isOpen,
  onClose,
  amount,
  teacherName,
  onPaymentComplete
}) => {
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');
  const [selectedMethod, setSelectedMethod] = useState<'qr' | 'upi' | 'app'>('qr');
  const [upiId, setUpiId] = useState('');

  const mockUpiId = 'teacher@paytm';
  const mockTransactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const handlePayment = () => {
    setPaymentStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        onPaymentComplete();
        onClose();
        setPaymentStep('method');
      }, 2000);
    }, 2000);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(mockUpiId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">UPI Payment</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {paymentStep === 'method' && (
            <>
              <div className="text-center bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Paying to</p>
                <p className="font-semibold text-lg">{teacherName}</p>
                <p className="text-2xl font-bold text-green-600">₹{amount}</p>
              </div>

              <div className="space-y-3">
                <p className="font-medium">Select Payment Method:</p>
                
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="method"
                      value="qr"
                      checked={selectedMethod === 'qr'}
                      onChange={(e) => setSelectedMethod(e.target.value as 'qr')}
                      className="text-blue-600"
                    />
                    <QrCode className="h-5 w-5 text-gray-600" />
                    <span>Scan QR Code</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="method"
                      value="upi"
                      checked={selectedMethod === 'upi'}
                      onChange={(e) => setSelectedMethod(e.target.value as 'upi')}
                      className="text-blue-600"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span>UPI ID</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="method"
                      value="app"
                      checked={selectedMethod === 'app'}
                      onChange={(e) => setSelectedMethod(e.target.value as 'app')}
                      className="text-blue-600"
                    />
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <span>UPI Apps</span>
                  </label>
                </div>
              </div>

              {selectedMethod === 'qr' && (
                <div className="text-center bg-gray-100 p-6 rounded-lg">
                  <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center mb-3">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Scan with any UPI app</p>
                </div>
              )}

              {selectedMethod === 'upi' && (
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">UPI ID:</p>
                    <div className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="font-mono">{mockUpiId}</span>
                      <Button variant="ghost" size="sm" onClick={copyUpiId}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Input
                    placeholder="Enter your UPI ID for verification"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {selectedMethod === 'app' && (
                <div className="grid grid-cols-3 gap-3">
                  {['GPay', 'PhonePe', 'Paytm'].map((app) => (
                    <div
                      key={app}
                      className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{app[0]}</span>
                      </div>
                      <span className="text-sm font-medium">{app}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button onClick={handlePayment} className="w-full bg-green-600 hover:bg-green-700">
                Pay ₹{amount}
              </Button>
            </>
          )}

          {paymentStep === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium">Processing Payment...</p>
              <p className="text-sm text-gray-600">Please wait while we confirm your payment</p>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-medium text-green-600 mb-2">Payment Successful!</p>
              <p className="text-sm text-gray-600 mb-4">
                Transaction ID: {mockTransactionId}
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm">₹{amount} paid to {teacherName}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpiPayment;
