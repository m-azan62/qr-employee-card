
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wktkekwokuwvndcsdznw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrdGtla3dva3V3dm5kY3Nkem53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5ODIxNTMsImV4cCI6MjA2NDU1ODE1M30.XERWyKsRoLPiHX2q5UAlOCwSD3yvogJdEhd0427pIlE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Employee {
  id: string;
  name: string;
  job_title: string;
  department: string;
  phone: string;
  email: string;
  photo_url?: string;
  qr_code_url?: string;
  created_at: string;
  updated_at: string;
}
