
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
    <div className="space-y-6">
      <EmployeeCard employee={employee} />
      <ContactInfo employee={employee} />
      
      <div className="text-center pt-6">
        <p className="text-xs text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EmployeeProfile;
