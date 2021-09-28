import { createClient } from '@supabase/supabase-js';

const apiKey: any = import.meta.env.VITE_SUPABASE_ANON_KEY;
const apiUrl: any = import.meta.env.VITE_SUPABASE_CLIENT_URL;

const supabase = createClient(apiUrl, apiKey);

export default supabase;
