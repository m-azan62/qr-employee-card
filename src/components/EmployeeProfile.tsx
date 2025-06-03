
import React from 'react';
import EmployeeCard from './EmployeeCard';
import ContactInfo from './ContactInfo';

export interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  phone: string;
  email: string;
  photo: string;
}

interface EmployeeProfileProps {
  employee: Employee;
}

const EmployeeProfile = ({ employee }: EmployeeProfileProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Employee Profile</h1>
          <p className="text-sm text-gray-600">Access via QR Code</p>
        </div>
        
        <EmployeeCard employee={employee} />
        <ContactInfo employee={employee} />
        
        <div className="text-center pt-6">
          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
