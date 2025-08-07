import env from 'dotenv';
env.config();
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabaseClient= createClient(supabaseUrl, supabaseKey)


const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY);

export {supabaseClient,supabaseAdmin}

