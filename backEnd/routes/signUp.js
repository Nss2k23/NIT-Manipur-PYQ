import express from 'express';
import { supabaseClient, supabaseAdmin } from "../database/supabase.js";

const router = express.Router();

// 1. Check if user exists in Auth (using admin)
// const checkIfUserExists = async (email) => {
//   try {
//     const { data, error } = await supabaseAdmin.auth.admin.listUsers({ email });
//     if (error) {
//       console.error("Error fetching user:", error.message);
//       return false;
//     }
//     console.log('data.user:');
//     console.log(data.users);
//     return data.users.length > 0;
//   } catch (err) {
//     console.error("Unexpected error:", err.message);
//     return false;
//   }
// };


const checkIfUserExists = async (email) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      console.error("Error fetching user list:", error.message);
      return false;
    }

    const existingUser = data.users.find(user => user.email === email);
    console.log("Matched user:", existingUser);
    return !!existingUser;
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return false;
  }
};


// 2. Main sign-up route
router.post('/', async (req, res) => {
  console.log("hitting up signUp route");
  try {
    const { email, password, enrolment } = req.body;
    console.log(
      {
        email,password,enrolment
      }
    )
    const userExists = await checkIfUserExists(email);
   
    console.log(userExists);
    if (userExists) {
      console.log("User already exists in Auth");
      return res.status(400).json({ message: "User already exists in Auth" });
    }


    const { data, error } = await supabaseClient.auth.signUp({ email, password,
      options: {
      emailRedirectTo: 'http://localhost:5173/home'
  }
    });
    console.log('just below auth.signUp');
    if (error) {
      console.log('inside error');
      console.log(error);
      const customMessage = error.code + " reasons: " + error.reasons;
      return res.status(401).json({message: customMessage
      });
    }

     console.log("verification mail send");

    let { session, user } = data;
    // If no session is returned, poll for it (max 60 seconds)
    if (!session) {
      console.log("Waiting for email confirmation...");
      const startTime = Date.now();
      const timeout = 60 * 1000; // 60 seconds

      while (!session && Date.now() - startTime < timeout) {
        try {
          const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({ email, password });

          if (signInError) {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds before retry
            continue;
          }

          session = signInData.session;
          user = signInData.user;
        } catch (err) {
          console.error("Sign-in retry failed:", err.message);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }

      if (!session) {
         if (user && user.id) {
          console.log("Deleting user due to timeout...");
          await supabaseAdmin.auth.admin.deleteUser(user.id);
        }

        return res.status(401).json({ message: "Email not confirmed within 60 seconds. Account deleted." });
      }
    }
    console.log("mail confirmed");
    console.log("Session establishing");

    // Set session
    await supabaseClient.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    const { error: insertError } = await supabaseClient.from('user').insert([
      { email:email, enrolmentNumber:enrolment, id: user.id }
    ]);

    if (insertError) {
      console.error("Insert failed. Deleting user from Supabase Auth...");
      // Cleanup on DB insert failure
      await supabaseAdmin.auth.admin.deleteUser(user.id);

      return res.status(500).json({
        message: "Sign up succeeded but DB insert failed. User removed from auth.",
        dbError: insertError.message,
      });
    }

    console.log("Data inserted into user table");

    return res.status(201).json({
      message: "Sign up successful",
      access_token: session.access_token,
      expires_in: session.expires_in,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Unexpected error in sign-up route:", err);
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

export default router;
