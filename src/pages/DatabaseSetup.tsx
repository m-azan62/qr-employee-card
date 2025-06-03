
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Database, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DatabaseSetup = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [tableExists, setTableExists] = useState(false);
  const { toast } = useToast();

  const createEmployeesTable = async () => {
    setIsCreating(true);
    
    try {
      // Create the employees table
      const { error } = await supabase.rpc('create_employees_table');
      
      if (error) {
        console.error('Error creating table:', error);
        toast({
          title: "Error",
          description: "Failed to create employees table. Please check the console for details.",
          variant: "destructive"
        });
      } else {
        setTableExists(true);
        toast({
          title: "Success",
          description: "Employees table created successfully!",
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const checkTableExists = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('id')
        .limit(1);
      
      if (!error) {
        setTableExists(true);
      }
    } catch (err) {
      console.log('Table does not exist yet');
    }
  };

  React.useEffect(() => {
    checkTableExists();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Database Setup</h1>
          <p className="text-gray-600">Set up the employees table for your QR code system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Employees Table
            </CardTitle>
            <CardDescription>
              This table will store all employee information including their profile data and QR codes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tableExists ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>Employees table already exists!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="w-5 h-5" />
                <span>Employees table needs to be created</span>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Table Schema:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• id (UUID, Primary Key)</li>
                <li>• name (Text)</li>
                <li>• job_title (Text)</li>
                <li>• department (Text)</li>
                <li>• phone (Text)</li>
                <li>• email (Text)</li>
                <li>• photo_url (Text, Optional)</li>
                <li>• qr_code_url (Text, Optional)</li>
                <li>• created_at (Timestamp)</li>
                <li>• updated_at (Timestamp)</li>
              </ul>
            </div>

            {!tableExists && (
              <Button 
                onClick={createEmployeesTable} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? 'Creating Table...' : 'Create Employees Table'}
              </Button>
            )}

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Manual SQL Creation</h4>
              <p className="text-sm text-blue-700 mb-2">
                If the button doesn't work, you can run this SQL directly in your Supabase dashboard:
              </p>
              <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
{`CREATE TABLE employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  department TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  photo_url TEXT,
  qr_code_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed)
CREATE POLICY "Allow all operations on employees" ON employees
  FOR ALL USING (true);`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild variant="outline">
            <a href="/admin">Go to Admin Panel</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;
