
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Users, Database, Eye } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Employee QR Code System</h1>
          <p className="text-lg text-gray-600 mb-8">Manage employees and generate QR codes for instant profile access</p>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-4">
                <Database className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <Button asChild variant="outline" className="w-full">
                  <a href="/database-setup">Setup Database</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <Button asChild className="w-full">
                  <a href="/admin">Admin Panel</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <QrCode className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <Button asChild variant="outline" className="w-full">
                  <a href="#preview">Preview Below</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div id="preview" className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Preview</h2>
            <p className="text-gray-600">This is how employee profiles will look when accessed via QR code</p>
          </div>
          
          <div className="max-w-md mx-auto">
            <EmployeeProfile employee={sampleEmployee} />
          </div>
        </div>

        <div className="text-center pt-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>Simple steps to get your QR code system running</CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold">Setup Database</p>
                  <p className="text-sm text-gray-600">Create the employees table in your Supabase database</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold">Add Employees</p>
                  <p className="text-sm text-gray-600">Use the admin panel to add employee information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold">Generate QR Codes</p>
                  <p className="text-sm text-gray-600">Create unique QR codes for each employee profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <p className="font-semibold">Share & Scan</p>
                  <p className="text-sm text-gray-600">Print or share QR codes for instant profile access</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
