
import React from 'react';
import { Employee } from './EmployeeProfile';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-200 hover:shadow-xl">
      <div className="relative inline-block mb-6">
        <img
          src={employee.photo}
          alt={`${employee.name}'s profile`}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80";
          }}
        />
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
        
        <div className="space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {employee.jobTitle}
          </div>
          
          <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium ml-2">
            {employee.department}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
