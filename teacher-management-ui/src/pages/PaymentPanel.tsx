
"use client";

import React, { useState } from 'react';
import { CreditCard, Calendar, DollarSign, User, Check, History, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Payment, Teacher } from '../types/teacher';
import UpiPayment from '../components/UpiPayment';

const PaymentPanel: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'cash' | 'check' | 'digital_wallet' | 'upi'>('bank_transfer');
  const [description, setDescription] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUpiPayment, setShowUpiPayment] = useState(false);

  // Mock data
  const teachers: Teacher[] = [
    {
      id: '1',
      fullName: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      phoneNumber: '+91 98765 43210',
      role: 'Piano Teacher',
      dateOfBirth: '1985-03-15',
      address: '123 Banjara Hills, Hyderabad, Telangana 500034',
      highestQualification: 'Masters in Music Performance',
      salary: 45,
      salaryType: 'hourly',
      privateQualifications: [
        { id: '1', subject: 'Piano', hourlyRate: 50 },
        { id: '2', subject: 'Music Theory', hourlyRate: 40 }
      ],
      joinedDate: '2023-01-15',
      status: 'active'
    },
    {
      id: '2',
      fullName: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      phoneNumber: '+91 87654 32109',
      role: 'Guitar Teacher',
      dateOfBirth: '1990-07-22',
      address: '456 Jubilee Hills, Hyderabad, Telangana 500033',
      highestQualification: 'Bachelor of Music',
      salary: 3500,
      salaryType: 'fixed',
      privateQualifications: [
        { id: '3', subject: 'Guitar', hourlyRate: 45 },
        { id: '4', subject: 'Bass Guitar', hourlyRate: 40 }
      ],
      joinedDate: '2023-02-01',
      status: 'active'
    }
  ];

  const recentPayments: Payment[] = [
    {
      id: '1',
      teacherId: '1',
      teacherName: 'Priya Sharma',
      amount: 1200,
      paymentMethod: 'bank_transfer',
      date: '2024-01-15',
      status: 'completed',
      description: 'Monthly salary'
    },
    {
      id: '2',
      teacherId: '2',
      teacherName: 'Rajesh Kumar',
      amount: 800,
      paymentMethod: 'digital_wallet',
      date: '2024-01-14',
      status: 'pending',
      description: 'Bonus payment'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'upi') {
      setShowUpiPayment(true);
      return;
    }

    const paymentData = {
      id: Date.now().toString(),
      teacherId: selectedTeacher,
      teacherName: teachers.find(t => t.id === selectedTeacher)?.fullName || '',
      amount: parseFloat(amount),
      paymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'completed' as const,
      description
    };

    console.log('Payment processed:', paymentData);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedTeacher('');
      setAmount('');
      setDescription('');
      setPaymentMethod('bank_transfer');
    }, 3000);
  };

  const handleUpiPaymentComplete = () => {
    const paymentData = {
      id: Date.now().toString(),
      teacherId: selectedTeacher,
      teacherName: teachers.find(t => t.id === selectedTeacher)?.fullName || '',
      amount: parseFloat(amount),
      paymentMethod: 'upi' as const,
      date: new Date().toISOString().split('T')[0],
      status: 'completed' as const,
      description
    };

    console.log('UPI Payment processed:', paymentData);
    setShowSuccess(true);
    setShowUpiPayment(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedTeacher('');
      setAmount('');
      setDescription('');
      setPaymentMethod('bank_transfer');
    }, 3000);
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return <CreditCard className="h-4 w-4" />;
      case 'digital_wallet':
        return <Smartphone className="h-4 w-4" />;
      case 'upi':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Panel</h1>
        <p className="text-gray-600 mt-1">Process payments and manage teacher compensation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Make Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">The payment has been processed successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Teacher
                  </label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a teacher...</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.fullName} - {teacher.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-10"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="text-blue-600"
                      />
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm">Bank Transfer</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="digital_wallet"
                        checked={paymentMethod === 'digital_wallet'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="text-blue-600"
                      />
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm">Digital Wallet</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="text-blue-600"
                      />
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm">UPI</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="text-blue-600"
                      />
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">Cash</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Payment description..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={!selectedTeacher || !amount}
                >
                  {paymentMethod === 'upi' ? 'Pay with UPI' : 'Process Payment'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">₹12,450</p>
                  <p className="text-sm text-gray-600">Total Paid</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">₹2,340</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Month:</span>
                  <span className="font-medium">₹4,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Month:</span>
                  <span className="font-medium">₹3,890</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average/Month:</span>
                  <span className="font-medium">₹4,150</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Recurring Payment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <History className="h-4 w-4 mr-2" />
                View Payment History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Bulk Payment Processing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Recent Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.teacherName}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      <span className="capitalize">{payment.paymentMethod.replace('_', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.description || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* UPI Payment Modal */}
      <UpiPayment
        isOpen={showUpiPayment}
        onClose={() => setShowUpiPayment(false)}
        amount={parseFloat(amount) || 0}
        teacherName={teachers.find(t => t.id === selectedTeacher)?.fullName || ''}
        onPaymentComplete={handleUpiPaymentComplete}
      />
    </div>
  );
};

export default PaymentPanel;
