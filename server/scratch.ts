import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  const { data, error } = await supabase.from('partners').insert({
    name: 'Test Partner',
    category: 'Test',
    country: 'Test',
    logo_text: 'TEST',
    description: 'This is a test description'
  }).select().single();
  
  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Success:", data);
    // clean up
    await supabase.from('partners').delete().eq('id', data.id);
  }
}
run();
