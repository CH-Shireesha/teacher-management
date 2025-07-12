
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { Teacher, PrivateQualification } from '../types/teacher';
// import { toast } from '../hooks/use-toast';

const AddTeacher: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    dateOfBirth: '',
    address: '',
    highestQualification: '',
    salary: '',
    salaryType: 'hourly' as 'hourly' | 'fixed'
  });

  const [privateQualifications, setPrivateQualifications] = useState<PrivateQualification[]>([
    { id: '1', subject: '', hourlyRate: 0 }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.highestQualification.trim()) newErrors.highestQualification = 'Qualification is required';
    if (!formData.salary || parseFloat(formData.salary) <= 0) newErrors.salary = 'Valid salary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addPrivateQualification = () => {
    setPrivateQualifications(prev => [
      ...prev,
      { id: Date.now().toString(), subject: '', hourlyRate: 0 }
    ]);
  };

  const removePrivateQualification = (id: string) => {
    if (privateQualifications.length > 1) {
      setPrivateQualifications(prev => prev.filter(q => q.id !== id));
    }
  };

  const updatePrivateQualification = (id: string, field: string, value: string | number) => {
    setPrivateQualifications(prev =>
      prev.map(q => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // toast({
      //   title: "Validation Error",
      //   description: "Please fix the errors and try again.",
      //   variant: "destructive"
      // });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newTeacher: Teacher = {
        id: Date.now().toString(),
        ...formData,
        salary: parseFloat(formData.salary),
        privateQualifications: privateQualifications.filter(q => q.subject.trim()),
        joinedDate: new Date().toISOString(),
        status: 'active'
      };

      console.log('New teacher:', newTeacher);

      // toast({
      //   title: "Success!",
      //   description: "Teacher has been added successfully.",
      // });

      router.push('/teachers');
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to add teacher. Please try again.",
      //   variant: "destructive"
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Teacher</h1>
        <p className="text-gray-600 mt-1">Fill in the information below to add a new teacher to the system.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={errors.phoneNumber ? 'border-red-500' : ''}
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'border-red-500' : ''}
                />
                {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'border-red-500' : ''}
                rows={3}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vocal">Vocal Teacher</SelectItem>
                    <SelectItem value="instrumental">Instrumental Teacher</SelectItem>
                    <SelectItem value="theory">Music Theory Teacher</SelectItem>
                    <SelectItem value="piano">Piano Teacher</SelectItem>
                    <SelectItem value="guitar">Guitar Teacher</SelectItem>
                    <SelectItem value="violin">Violin Teacher</SelectItem>
                    <SelectItem value="drums">Drums Teacher</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="highestQualification">Highest Qualification *</Label>
                <Input
                  id="highestQualification"
                  value={formData.highestQualification}
                  onChange={(e) => handleInputChange('highestQualification', e.target.value)}
                  className={errors.highestQualification ? 'border-red-500' : ''}
                  placeholder="e.g., Masters in Music"
                />
                {errors.highestQualification && <p className="text-sm text-red-500">{errors.highestQualification}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salaryType">Salary Type *</Label>
                <Select onValueChange={(value: 'hourly' | 'fixed') => handleInputChange('salaryType', value)} defaultValue="hourly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="fixed">Fixed Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">
                  {formData.salaryType === 'hourly' ? 'Hourly Rate (₹)' : 'Monthly Salary (₹)'} *
                </Label>
                <Input
                  id="salary"
                  type="number"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  className={errors.salary ? 'border-red-500' : ''}
                />
                {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Private Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Private Teaching Qualifications
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPrivateQualification}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Subject</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {privateQualifications.map((qual, index) => (
              <div key={qual.id} className="flex items-end space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-1 space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={qual.subject}
                    onChange={(e) => updatePrivateQualification(qual.id, 'subject', e.target.value)}
                    placeholder="e.g., Piano, Guitar, Vocals"
                  />
                </div>
                <div className="w-32 space-y-2">
                                      <Label>Rate (₹/hr)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={qual.hourlyRate || ''}
                    onChange={(e) => updatePrivateQualification(qual.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                {privateQualifications.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePrivateQualification(qual.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/teachers')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isSubmitting ? (
              'Adding Teacher...'
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Add Teacher
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
