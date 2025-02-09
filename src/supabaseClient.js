import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if env variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not defined!');
  throw new Error('Please check your .env file and setup!');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
