
import React from 'react';
import { Phone, Mail, QrCode } from 'lucide-react';
import { Employee } from './EmployeeProfile';

interface ContactInfoProps {
  employee: Employee;
}

const ContactInfo = ({ employee }: ContactInfoProps) => {
  const handlePhoneClick = () => {
    window.location.href = `tel:${employee.phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${employee.email}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handlePhoneClick}
          className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm text-gray-500 font-medium">Phone</p>
            <p className="text-lg font-semibold text-gray-900">{employee.phone}</p>
          </div>
        </button>
        
        <button
          onClick={handleEmailClick}
          className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm text-gray-500 font-medium">Email</p>
            <p className="text-lg font-semibold text-gray-900 break-all">{employee.email}</p>
          </div>
        </button>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Tap phone or email to contact directly
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
