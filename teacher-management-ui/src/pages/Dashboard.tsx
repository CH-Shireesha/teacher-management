
import React from 'react';
import { Users, UserCheck, CreditCard, IndianRupee } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { DashboardStats } from '../types/teacher';

const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const stats: DashboardStats = {
    totalTeachers: 24,
    activeTeachers: 22,
    totalPayments: 156,
    pendingPayments: 3,
    monthlyExpenses: 12450
  };

  const statsCards = [
    {
      title: 'Total Teachers',
      value: stats.totalTeachers,
      icon: Users,
      gradient: 'gradient-primary',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Active Teachers',
      value: stats.activeTeachers,
      icon: UserCheck,
      gradient: 'gradient-success',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: CreditCard,
      gradient: 'gradient-warning',
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Monthly Expenses',
      value: `₹${stats.monthlyExpenses.toLocaleString()}`,
      icon: IndianRupee,
      gradient: 'gradient-info',
      trend: { value: 15, isPositive: true }
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New teacher added',
      teacher: 'Priya Sharma',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Payment processed',
      teacher: 'Rajesh Kumar',
      time: '4 hours ago',
      type: 'info'
    },
    {
      id: 3,
      action: 'Profile updated',
      teacher: 'Anjali Patel',
      time: '1 day ago',
      type: 'warning'
    },
    {
      id: 4,
      action: 'Payment pending',
      teacher: 'Vikram Singh',
      time: '2 days ago',
      type: 'error'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your teacher management overview.</p>
        </div>
        <div className="mt-4 sm:mt-0 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            gradient={card.gradient}
            trend={card.trend}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.teacher}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Add New Teacher</p>
                <p className="text-sm text-gray-500">Quickly add a new teacher to the system</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Process Payment</p>
                <p className="text-sm text-gray-500">Make payments to teachers</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">View All Teachers</p>
                <p className="text-sm text-gray-500">Browse and manage teacher profiles</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
