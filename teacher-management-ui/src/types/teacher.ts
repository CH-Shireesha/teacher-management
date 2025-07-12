
export interface Teacher {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  dateOfBirth: string;
  address: string;
  highestQualification: string;
  salary: number;
  salaryType: 'hourly' | 'fixed';
  privateQualifications: PrivateQualification[];
  groupQualifications?: GroupQualification[];
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface PrivateQualification {
  id: string;
  subject: string;
  hourlyRate: number;
}

export interface GroupQualification {
  id: string;
  subject: string;
  hourlyRate: number;
  maxStudents: number;
}

export interface Payment {
  id: string;
  teacherId: string;
  teacherName: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'cash' | 'check' | 'digital_wallet';
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

export interface DashboardStats {
  totalTeachers: number;
  activeTeachers: number;
  totalPayments: number;
  pendingPayments: number;
  monthlyExpenses: number;
}
