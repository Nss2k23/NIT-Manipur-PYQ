import express from 'express';
import { supabaseAdmin } from '../database/supabase.js';

const verifyAuth = async (req, res, next) => {
  console.log('hitting middleware verfyAuth of verifyToken.js')
  const authHeader = req.headers.authorization;
  if(authHeader)
    console.log('authHeader is present');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No header:'+authHeader);
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log('token is present');
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = data.user;
    next(); // Proceed to the protected route

  } catch (err) {
    console.error("Error verifying token:", err.message);
    return res.status(500).json({ message: 'Internal server error during token verification' });
  }
};


const router = express.Router();

router.get('/', verifyAuth, async (req, res) => {
  // Only accessible if token is valid
  console.log('after verifyAuth. About to return status 200')
  res.status(200).json({
    message: `Welcome ${req.user.email}, you have access to home data.`,
    user: req.user,
  });
});

export default router;
