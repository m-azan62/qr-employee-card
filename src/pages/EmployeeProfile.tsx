
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, Employee as DatabaseEmployee } from '../lib/supabase';
import EmployeeCard from '../components/EmployeeCard';
import ContactInfo from '../components/ContactInfo';
import { Employee as ComponentEmployee } from '../components/EmployeeProfile';

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<ComponentEmployee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (employeeId: string) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', employeeId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Employee not found');
        } else {
          throw error;
        }
      } else {
        // Convert database format to component format
        const employeeData: ComponentEmployee = {
          id: data.id,
          name: data.name,
          jobTitle: data.job_title,
          department: data.department,
          phone: data.phone,
          email: data.email,
          photo: data.photo_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
        };
        setEmployee(employeeData);
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      setError('Failed to load employee profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-lg">Loading employee profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Employee Not Found</h2>
          <p className="text-gray-600">The requested employee profile could not be found.</p>
        </div>
      </div>
    );
  }

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
