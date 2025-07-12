# Teacher Management System

A modern, responsive web application for managing teachers, their qualifications, and payment processing. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

=> Add & manage teacher profiles
=> Track private & group qualifications
=> Manage payments (UPI, cash, etc.)
=> Dashboard with teacher stats
=> Fully responsive, clean UI

## Requirements

=> Node.js 18+
=> npm, yarn, or bun
=> Git

## Setup

# Clone project
git clone <repo-url>
cd teacher-management-ui

# Install dependencies
npm install   # or yarn / bun

# Setup env file
cp .env.example .env.local

# Run the app
npm run dev
App runs at: http://localhost:3000

## Folder Structure
bash
Copy
Edit
src/
├── app/           # Pages (Next.js App Router)
├── components/    # UI & layout components
├── pages/         # Legacy Next.js pages
├── types/         # TypeScript types
├── hooks/         # Custom React hooks
├── lib/           # Utilities

## Scripts

npm run dev     # Dev server
npm run build   # Production build
npm start       # Start production server
npm run lint    # Lint code

## Deployment
➤ Vercel (Recommended)
npm i -g vercel
vercel


Build locally:
npm run build


## Data Models

### Teacher
```typescript
interface Teacher {
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
```

### Payment
```typescript
interface Payment {
  id: string;
  teacherId: string;
  teacherName: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'cash' | 'check' | 'digital_wallet';
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}
