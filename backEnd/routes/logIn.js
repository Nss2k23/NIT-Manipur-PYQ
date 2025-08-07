import express from 'express';
import { supabaseClient,supabaseAdmin } from '../database/supabase.js';

const router = express.Router();


const checkIfUserExistsInModerator = async (email) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('user')
      .select('*')
      .eq('email', email)
      .single();  // Optional: if you expect only one row

    if (error) {
      console.error("Error querying moderator table:", error.message);
      return false;
    }

    return !!data;  // true if user exists
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return false;
  }
};

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log('hitting logIn.js')

  const userExists = await checkIfUserExistsInModerator(email);
   console.log('userExist:'+userExists);
    if (userExists) {
                    try {
                    const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email,
                    password
                    });
                    if (error) {
                      console.log('Error:'+error);
                    const customMessage = error.code + " reasons: " + error.reasons;
                    return res.status(401).json({message: customMessage
                    });
                    }
                    if(data)
                      console.log('Data is return');
                    // You get session and user here
                    const { session, user } = data;

                    console.log('returning session');
                    return res.status(200).json({
                    message: "Login successful",
                    user,
                    access_token: session.access_token,
                    expires_in: session.expires_in // in seconds
                    });

                    } catch (err) {
                    console.log('inside catch err');
                    return res.status(500).json({ message: "Internal server error" });
                    }  
    }
    else{
        console.log('User does not exist in the database');
        return res.status(401).json({message: 'User does not exist in the database. Try signing in'});
    }
  })

export default router;
