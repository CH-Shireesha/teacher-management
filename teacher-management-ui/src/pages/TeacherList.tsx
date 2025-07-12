
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Filter, MoreVertical, Mail, Phone, Edit, Eye } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Teacher } from '../types/teacher';

const TeacherList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const router = useRouter();

  // Mock data - in a real app, this would come from an API
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
    },
    {
      id: '3',
      fullName: 'Anjali Patel',
      email: 'anjali.patel@gmail.com',
      phoneNumber: '+91 76543 21098',
      role: 'Vocal Teacher',
      dateOfBirth: '1988-11-10',
      address: '789 Hitech City, Hyderabad, Telangana 500081',
      highestQualification: 'Masters in Vocal Performance',
      salary: 55,
      salaryType: 'hourly',
      privateQualifications: [
        { id: '5', subject: 'Vocals', hourlyRate: 60 },
        { id: '6', subject: 'Music Theory', hourlyRate: 45 }
      ],
      joinedDate: '2023-01-20',
      status: 'active'
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || teacher.role.toLowerCase().includes(filterRole.toLowerCase());
    
    return matchesSearch && matchesRole;
  });

  const handleCardClick = (teacherId: string) => {
    router.push(`/teacher/${teacherId}`);
  };

  const handleEditClick = (e: React.MouseEvent, teacherId: string) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/teacher/${teacherId}`);
  };

  const handleViewClick = (e: React.MouseEvent, teacherId: string) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/teacher/${teacherId}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600 mt-1">Manage and view all teachers in your system.</p>
        </div>
        <Link href="/add-teacher">
          <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Add New Teacher
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teachers by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="piano">Piano</option>
                <option value="guitar">Guitar</option>
                <option value="vocal">Vocal</option>
                <option value="violin">Violin</option>
                <option value="drums">Drums</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card 
            key={teacher.id} 
            className="hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:scale-105"
            onClick={() => handleCardClick(teacher.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {teacher.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{teacher.fullName}</h3>
                    <p className="text-sm text-gray-600">{teacher.role}</p>
                  </div>
                </div>
                <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                  {teacher.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{teacher.phoneNumber}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.privateQualifications.map((qual) => (
                    <Badge key={qual.id} variant="outline" className="text-xs">
                      {qual.subject} (₹{qual.hourlyRate}/hr)
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <span className="text-gray-600">Salary: </span>
                  <span className="font-medium">
                    ₹{teacher.salary}{teacher.salaryType === 'hourly' ? '/hr' : '/month'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => handleViewClick(e, teacher.id)}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => handleEditClick(e, teacher.id)}
                    className="hover:bg-green-50 hover:text-green-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterRole !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first teacher.'}
          </p>
          <Link href="/add-teacher">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Add New Teacher
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
