import { createClient } from '@supabase/supabase-js';

// Use the environment variables
const supabaseUrl = "https://wubzoqmcskpsbdtjpseb.supabase.co";
const supabaseAnonKey = "=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1YnpvcW1jc2twc2JkdGpwc2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMzE5MjksImV4cCI6MjA1NDYwNzkyOX0.0PuoBFw3l-cMU7xw6ssk8UBh9Fu4t9AwKBt1ps33JDc";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
