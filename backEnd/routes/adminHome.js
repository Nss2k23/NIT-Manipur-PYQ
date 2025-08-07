import express from 'express';
import { supabaseClient } from '../database/supabase.js';//here i need to add a option for deleting the particular q paper


const router = express.Router();

router.get('/', async (req, res) => {
  console.log('hitting the home.js')
  try {
    const { year, dept, sem, page } = req.query;
    const pageSize = 20;
    const offset = (page - 1) * pageSize;

    let query = supabaseClient
      .from('pyq')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (year) query = query.eq('year', year);
    if (dept) query = query.eq('subject', dept); // Adjust 'subject' if 'dept' column exists
    if (sem) query = query.eq('semester', sem);

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
    console.log('data is present');

    res.status(200).json({ data, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.delete('/:id', async (req, res) => {
  console.log('Hitting the delete button');
  const { id } = req.params;
  console.log('id:'+id);
  try {
    const { error } = await supabaseClient
      .from('pyq')
      .delete()
      .eq('id', id);  // Ensure 'id' exists in your table

    if (error)
        {
            alert(`PYQ with id ${id} does not exist`);
        };
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete' });
  }
});

export default router;
