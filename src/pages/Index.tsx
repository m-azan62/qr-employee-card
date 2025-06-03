
import React from 'react';
import EmployeeProfile from '../components/EmployeeProfile';
import { Employee } from '../components/EmployeeProfile';

const Index = () => {
  // Sample employee data - in a real app this would come from an API or database
  const sampleEmployee: Employee = {
    id: "1",
    name: "Sarah Johnson",
    jobTitle: "Senior Software Engineer",
    department: "Engineering",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@company.com",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
  };

  return <EmployeeProfile employee={sampleEmployee} />;
};

export default Index;
