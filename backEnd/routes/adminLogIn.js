import express from 'express';
import { supabaseClient, supabaseAdmin } from "../database/supabase.js";

const router = express.Router();

// 1. Check if user exists in Auth (using admin)
const checkIfUserExistsInModerator = async (email) => {
    console.log('hitting checkIfUserExistsInModerator')
  try {
    const { data, error } = await supabaseAdmin
      .from('moderator')
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
  console.log('hitting adminLogIn.js')

  const userExists = await checkIfUserExistsInModerator(email);
   console.log('userExist:'+userExists);
    if (userExists) {
                    try {
                    const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email,
                    password
                    });

                    console.log('data:'+data);
                    console.log('error:'+error);

                    if (error) {
                    const customMessage = error.code + " reasons: " + error.reasons;
                    return res.status(401).json({message: customMessage
                    });
                    }

                    // You get session and user here
                    const { session, user } = data;

                    return res.status(200).json({
                    message: "Login successful",
                    user,
                    access_token: session.access_token,
                    expires_in: session.expires_in // in seconds
                    });

                    } catch (err) {
                    return res.status(500).json({ message: "Internal server error" });
                    }  
    }
    else{
        return res.status(401).json({message: 'U are not a Admin'});
    }
})
export default router;