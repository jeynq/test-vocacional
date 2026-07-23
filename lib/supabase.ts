import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uyinpwvjnrdhkuwafxss.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aW5wd3ZqbnJkaGt1d2FmeHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDgzNTMsImV4cCI6MjEwMDMyNDM1M30.l9YI8ssZYXLMw6pEyc9BoYIayXgI7CEpMa9T-qWruZU";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);