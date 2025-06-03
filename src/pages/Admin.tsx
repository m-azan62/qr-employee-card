
import React, { useState, useEffect } from 'react';
import { supabase, Employee } from '../lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, QrCode, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCodeGenerator from '../components/QRCodeGenerator';

const Admin = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    job_title: '',
    department: '',
    phone: '',
    email: '',
    photo_url: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEmployee) {
        const { error } = await supabase
          .from('employees')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingEmployee.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Employee updated successfully!" });
      } else {
        const { error } = await supabase
          .from('employees')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Employee added successfully!" });
      }
      
      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      toast({
        title: "Error",
        description: "Failed to save employee",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Employee deleted successfully!" });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      job_title: '',
      department: '',
      phone: '',
      email: '',
      photo_url: ''
    });
    setEditingEmployee(null);
    setShowForm(false);
  };

  const startEdit = (employee: Employee) => {
    setFormData({
      name: employee.name,
      job_title: employee.job_title,
      department: employee.department,
      phone: employee.phone,
      email: employee.email,
      photo_url: employee.photo_url || ''
    });
    setEditingEmployee(employee);
    setShowForm(true);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
            <p className="text-gray-600">Manage employees and generate QR codes</p>
          </div>
          <div className="space-x-2">
            <Button asChild variant="outline">
              <a href="/database-setup">Database Setup</a>
            </Button>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="job_title">Job Title</Label>
                    <Input
                      id="job_title"
                      value={formData.job_title}
                      onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="photo_url">Photo URL</Label>
                    <Input
                      id="photo_url"
                      value={formData.photo_url}
                      onChange={(e) => setFormData({...formData, photo_url: e.target.value})}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingEmployee ? 'Update Employee' : 'Add Employee'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {employees.map((employee) => (
            <Card key={employee.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {employee.photo_url && (
                      <img
                        src={employee.photo_url}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-gray-600">{employee.job_title} • {employee.department}</p>
                      <p className="text-sm text-gray-500">{employee.email} • {employee.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={`/employee/${employee.id}`} target="_blank">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </a>
                    </Button>
                    <QRCodeGenerator employeeId={employee.id} />
                    <Button variant="outline" size="sm" onClick={() => startEdit(employee)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(employee.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {employees.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No employees found. Add your first employee to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
