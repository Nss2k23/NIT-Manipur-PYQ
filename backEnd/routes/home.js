import express from 'express';
// import { supabaseClient } from '../../backEnd/database/supabase';
import { supabaseClient } from '../database/supabase.js';


const router = express.Router();

router.get('/', async (req, res) => {
  console.log('hitting the home.js')
  try {
    const { year, dept, sem, sub, page } = req.query;//we need add subject here
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    console.log('year:'+year);
    console.log('dept:'+dept);
    console.log('sem:'+sem);
    console.log('sub:'+sub);

    let query = supabaseClient
      .from('pyq')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (year) query = query.eq('year', year);
    if (dept) query = query.eq('department', dept); // Adjust 'subject' if 'dept' column exists
    if (sem) query = query.eq('semester', sem);//we need to add a line for subject
    if (sub) query = query.eq('subject', sub);//we need to add a line for subject

    // Apply pagination
    console.log('offset:'+offset+' offset + pageSize - 1:'+(offset + pageSize - 1));
    const { data, count, error } = await query.range(offset, offset + pageSize - 1);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch question papers' });
    }

    console.log(count);
    const totalPages = Math.ceil(count / pageSize);

    if(data.length>0)
    console.log('data:'+data);

    res.status(200).json({ data, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
