
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X, Calendar, Clock, User, Mail, Phone, MapPin, GraduationCap, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { Teacher } from '../types/teacher';

interface TeacherDetailsProps {
  teacherId: string;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({ teacherId }) => {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Mock data - in real app, this would fetch from API based on teacherId
  const [teacher, setTeacher] = useState<Teacher>({
    id: teacherId || '1',
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
    groupQualifications: [
      { id: '1', subject: 'Piano Group', hourlyRate: 30, maxStudents: 6 }
    ],
    joinedDate: '2023-01-15',
    status: 'active'
  });

  // Mock schedule data
  const scheduleData = [
    { day: 'Monday', time: '9:00 AM', duration: 60, subject: 'Piano', type: 'private' },
    { day: 'Monday', time: '2:00 PM', duration: 90, subject: 'Piano Group', type: 'group' },
    { day: 'Tuesday', time: '10:00 AM', duration: 60, subject: 'Music Theory', type: 'private' },
    { day: 'Wednesday', time: '9:00 AM', duration: 60, subject: 'Piano', type: 'private' },
    { day: 'Wednesday', time: '3:00 PM', duration: 60, subject: 'Piano', type: 'private' },
    { day: 'Thursday', time: '11:00 AM', duration: 90, subject: 'Piano Group', type: 'group' },
    { day: 'Friday', time: '10:00 AM', duration: 60, subject: 'Music Theory', type: 'private' },
    { day: 'Saturday', time: '9:00 AM', duration: 60, subject: 'Piano', type: 'private' },
    { day: 'Saturday', time: '11:00 AM', duration: 60, subject: 'Piano', type: 'private' }
  ];

  const mockStats = {
    totalHours: 156,
    monthlyEarnings: 7800,
    currentBalance: 2340,
    completedSessions: 89
  };

  const handleSave = () => {
    setIsEditMode(false);
    // Here you would save the data to your backend
    console.log('Saving teacher data:', teacher);
  };

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
    '7:00 PM', '8:00 PM', '9:00 PM'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getScheduleForDayAndTime = (day: string, time: string) => {
    return scheduleData.filter(session => 
      session.day === day && session.time === time
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/teachers')}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teachers
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{teacher.fullName}</h1>
            <p className="text-gray-600">{teacher.role}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Edit Mode</span>
            <Switch
              checked={isEditMode}
              onCheckedChange={setIsEditMode}
            />
          </div>
          {isEditMode && (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditMode(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditMode ? (
                    <Input
                      value={teacher.fullName}
                      onChange={(e) => setTeacher({...teacher, fullName: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{teacher.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  {isEditMode ? (
                    <Input
                      value={teacher.role}
                      onChange={(e) => setTeacher({...teacher, role: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{teacher.role}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditMode ? (
                    <Input
                      type="email"
                      value={teacher.email}
                      onChange={(e) => setTeacher({...teacher, email: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-gray-900">{teacher.email}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditMode ? (
                    <Input
                      value={teacher.phoneNumber}
                      onChange={(e) => setTeacher({...teacher, phoneNumber: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-gray-900">{teacher.phoneNumber}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  {isEditMode ? (
                    <Input
                      type="date"
                      value={teacher.dateOfBirth}
                      onChange={(e) => setTeacher({...teacher, dateOfBirth: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{new Date(teacher.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                  {isEditMode ? (
                    <Input
                      value={teacher.highestQualification}
                      onChange={(e) => setTeacher({...teacher, highestQualification: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-gray-900">{teacher.highestQualification}</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditMode ? (
                  <Input
                    value={teacher.address}
                    onChange={(e) => setTeacher({...teacher, address: e.target.value})}
                  />
                ) : (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                    <p className="text-gray-900">{teacher.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle>Qualifications & Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Private Lessons</h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.privateQualifications.map((qual) => (
                      <Badge key={qual.id} variant="outline" className="text-sm">
                        {qual.subject} - ₹{qual.hourlyRate}/hr
                      </Badge>
                    ))}
                  </div>
                </div>
                {teacher.groupQualifications && teacher.groupQualifications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Group Lessons</h4>
                    <div className="flex flex-wrap gap-2">
                      {teacher.groupQualifications.map((qual) => (
                        <Badge key={qual.id} variant="outline" className="text-sm">
                          {qual.subject} - ₹{qual.hourlyRate}/hr (Max {qual.maxStudents} students)
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Payment Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Type:</span>
                  <span className="font-medium">
                    ₹{teacher.salary}{teacher.salaryType === 'hourly' ? '/hr' : '/month'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hours:</span>
                  <span className="font-medium">{mockStats.totalHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Earnings:</span>
                  <span className="font-medium text-green-600">₹{mockStats.monthlyEarnings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Balance:</span>
                  <span className="font-medium">₹{mockStats.currentBalance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Sessions:</span>
                  <span className="font-medium">{mockStats.completedSessions}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                    {teacher.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Joined:</span>
                  <span className="font-medium">{new Date(teacher.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="text-center font-medium text-gray-700 p-2">Time</div>
                {days.map(day => (
                  <div key={day} className="text-center font-medium text-gray-700 p-2">
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>
              
              <div className="space-y-1">
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-8 gap-1">
                    <div className="text-sm text-gray-600 p-2 text-center font-medium">
                      {time}
                    </div>
                    {days.map(day => {
                      const sessions = getScheduleForDayAndTime(day, time);
                      return (
                        <div key={`${day}-${time}`} className="p-1 min-h-[40px] border border-gray-100">
                          {sessions.map((session, index) => (
                            <div
                              key={index}
                              className={`text-xs p-1 rounded mb-1 ${
                                session.type === 'private' 
                                  ? 'bg-green-100 text-green-800 border border-green-200' 
                                  : 'bg-blue-100 text-blue-800 border border-blue-200'
                              }`}
                            >
                              <div className="font-medium">{session.subject}</div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {session.duration}min
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
              <span>Private Lessons</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded mr-2"></div>
              <span>Group Lessons</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDetails;
