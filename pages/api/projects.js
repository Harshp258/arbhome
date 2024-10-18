import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, staging_type, address, description } = req.body;
    
    const { data, error } = await supabase
      .from('projects')
      .insert([
         { title, staging_type, address, description }
       ]);

    if (error) return res.status(500).json({ error: error.message });
    
    return res.status(201).json(data);
  }
  
  // Handle other HTTP methods...
}