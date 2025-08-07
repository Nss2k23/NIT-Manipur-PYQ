import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../database/supabase';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [validLink, setValidLink] = useState(false);
  const [checking, setChecking] = useState(true);
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const[isPasswordValid,setIsPasswordValid]=useState(false);
  const[isPasswordMatch,setIsPasswordMatch]=useState(false);
  const[isSubmitButtonClicked,setIsSubmitClicked]=useState(false);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');

    if (type === 'recovery' && accessToken) {
      // Allow rendering password reset form
      setValidLink(true);
    } else {
      // Redirect to login if accessed directly
      console.log('becuase of type and token')
      setInterval(3000);
      navigate('/logIn');
    }

    setChecking(false);
  }, []);

  if (checking) return null;

  if (!validLink) {
    return null; // Prevent render during redirect
  }



  const handleChanges = (e) => {
  const { name, value } = e.target;

  if (name === 'password') {
    setPassword(value);
    setIsPasswordValid(value.length >= 6);
  }

  if (name === 'confirmPassword') {
    setConfirmPassword(value);
    setIsPasswordMatch(password === value);
  }
};
;

const handleSubmit=async(e)=>{
  e.preventDefault();
   if (isSubmitButtonClicked) return;

    setIsSubmitClicked(true); 
 try{
  console.log('hitting superbase')
  const { data, error } = await supabaseClient.auth.updateUser({
  password: password})
  console.log('data:'+data);
 if (error) {
    console.log(error);
    alert(error.code + " reasons: " + error.message);
    return navigate('/login');  // 👈 Return here to prevent further code from running
  }

  alert('Password reset. Now try logging in');
  navigate('/login');
 } 
 catch(err)
 {
    console.log('inside catch:'+err);
    alert(err.message);
    navigate('/login');
 }
};







  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 border w-96 rounded">
        <h2 className="text-lg font-bold mb-4 text-center">Reset Password</h2>
          <form onSubmit={handleSubmit}>



            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChanges}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              />
              {/* Inline error message for password length */}
              {password && !isPasswordValid && (
                <p className="text-red-500 text-sm mt-1">
                  ❌ Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
              <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChanges}
              placeholder="Confirm your password"
              className={`w-full px-3 py-2 border rounded ${
                confirmPassword
                  ? isPasswordMatch
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-gray-300'
              }`}
              disabled={!password}
              required
              />

            {/* Inline Error Message */}
            {confirmPassword && !isPasswordMatch && (
              <p className="text-red-500 text-sm mt-1">❌ Passwords do not match</p>
            )}
            </div>



            {/*submit button*/}
            <button
            className={`w-full py-2 rounded text-white font-medium ${
              isPasswordMatch
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            type="submit"
            disabled={!isPasswordMatch}
      
            >
              Submit
            </button>



          </form>
      </div>
    </div>
  );
};

export default ResetPassword;

