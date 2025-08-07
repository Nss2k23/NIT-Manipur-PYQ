// import express from 'express';
// import { supabaseClient } from '../database/supabase.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//     console.log('hiiting the dropdowns');
//   try {
//     const [yearRes, deptRes, semRes] = await Promise.all([
//       supabaseClient.from('pyq').select('year').neq('year', null),
//       supabaseClient.from('pyq').select('subject').neq('subject', null),
//       supabaseClient.from('pyq').select('sem').neq('sem', null),
//     ]);

//     // Check for any error
//     if (yearRes.error || deptRes.error || semRes.error) {
//       return res.status(500).json({
//         message: 'Failed to fetch dropdown data',
//         error: yearRes.error || deptRes.error || semRes.error,
//       });
//     }

//     // Extract distinct values
//     const years = [...new Set(yearRes.data.map(item => item.year))].sort((a, b) => b - a);
//     const departments = [...new Set(deptRes.data.map(item => item.subject))].sort();
//     const semesters = [...new Set(semRes.data.map(item => item.sem))].sort((a, b) => a - b);

//     console.log('years:'+years);
//     console.log('departments:'+departments);
//     console.log('semestets:'+semesters);
//     return res.status(200).json({
//       years,
//       departments,
//       semesters
//     });
//   } catch (error) {
//     console.error('Dropdown fetch error:', error.message);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// export default router;

import express from 'express';
import { supabaseClient } from '../database/supabase.js';
const router = express.Router();


router.get('/', async (req, res) => {
  console.log('hiiting the dropdowns');
  try {
    const [yearRes, deptRes, semRes, subRes] = await Promise.all([
      supabaseClient.from('pyq').select('year'),
      supabaseClient.from('pyq').select('department'),
      supabaseClient.from('pyq').select('semester'),
      supabaseClient.from('pyq').select('subject'),
    ]);

    console.log('after fetching');
    // Log all results
    console.log('yearRes:', yearRes);
    console.log('deptRes:', deptRes);
    console.log('semRes:', semRes);
    console.log('subRes:', subRes);

    // Check for errors explicitly
    if (yearRes.error || deptRes.error || semRes.error|| subRes.error) {
      console.error('Supabase errors:', {
        year: yearRes.error,
        subject: deptRes.error,
        sem: semRes.error,
        sub:subRes.error
      });

      return res.status(500).json({
        message: 'Failed to fetch dropdown data',
        errors: {
          year: yearRes.error,
          subject: deptRes.error,
          sem: semRes.error,
          sub: subRes.error
        },
      });
    }

    const years = [...new Set(yearRes.data.map(item => item.year))].sort((a, b) => b - a);
    const departments = [...new Set(deptRes.data.map(item => item.department))];
    const semesters = [...new Set(semRes.data.map(item => item.semester))].sort((a,b)=>a-b);
    const subjects = [...new Set(subRes.data.map(item => item.subject))].sort((a,b)=>a-b);

    console.log('years:'+years);
    console.log('departmets:'+departments);
    console.log('semesters:'+semesters);
    console.log('subjects:'+subjects);

    console.log('returning the data');
    return res.status(200).json({ years, departments, semesters ,subjects});

  } catch (error) {
    console.error('Caught error in /dropdowns route:', error);
    return res.status(500).json({ message: 'Unexpected error', error });
  }
});

export default router;