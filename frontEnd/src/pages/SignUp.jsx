import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {LoaderCircle} from 'lucide-react'



const SignUp = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [values, setValues] = useState({
    enrolment: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isCollegeMail,setIsCollegeMail]=useState(false);
  const [isVerified,setIsVerified]=useState(false);
  const[isSubmitButtonClicked,setIsSubmitClicked]=useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      // Only check match if password or confirmPassword changes
      if (name === 'confirmPassword' || name === 'password') {
        const match =updated.password && updated.confirmPassword && updated.password === updated.confirmPassword;
        setIsPasswordMatch(match);
      }

      if(name==='email')
      {
        const match=mailChecker(updated.email);
        setIsCollegeMail(match);
      }

      if (name === 'password') {
        setIsPasswordValid(value.length >= 6);
      }

      return updated;
    });
  };

  const mailChecker = (email) => {
  return email.endsWith('@nitmanipur.ac.in');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
     if (isSubmitButtonClicked) return;

    setIsSubmitClicked(true);

    try {
      console.log('Hitting the submit button of signUp');
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signUp`, values);
      //setIsLoading(false)
      console.log(response);
      if (response.status === 201) {
        console.log(response.data.access_token)
        localStorage.setItem('token', response.data.access_token);
        setIsVerified(true);
      } 
    } catch (err) {
      console.log('frontend catch error');
      console.log(err.response.status)
      if(err.response.status===400)
      {
        console.log(err.response.data.message);
        alert(err.response.data.message);
        navigate('/login');
      }
      else {
        console.log(err);
          alert(err.response.data.message);
          /* error in auth.signUp(401)
          email not confrim within 120 sec(401)
          sign up succeeded but DB insert failed.User removed from auth
          catch(err) something went wrong: (500)
          */
          navigate(0);
        }
      }
    };


  return (!isVerified?(<div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 border w-80 rounded">
        <h2 className="text-lg font-bold mb-4 text-center">SignUp</h2>

        <form onSubmit={handleSubmit}>
          {/* Enrolment */}
          <div className="mb-4">
            <label htmlFor="enrolment" className="block text-gray-700">
              Enrolment
            </label>
            <input
              id="enrolment"
              type="text"
              name="enrolment"
              value={values.enrolment}
              onChange={handleChanges}
              placeholder="Enter your enrolment no."
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChanges}
              placeholder="Enter your college email"
              className={`w-full px-3 py-2 border rounded ${
                values.email
                  ? isCollegeMail
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-gray-300'
              }`}
              required
            />
             {/* Inline Error Message */}
            {values.email && !isCollegeMail && (
              <p className="text-red-500 text-sm mt-1">❌Enter your college email</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChanges}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
             {/* Inline error message for password length */}
              {values.password && !isPasswordValid && (
                <p className="text-red-500 text-sm mt-1">
                  ❌ Password must be at least 6 characters
                </p>
              )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChanges}
              placeholder="Confirm your password"
              className={`w-full px-3 py-2 border rounded ${
                values.confirmPassword
                  ? isPasswordMatch
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-gray-300'
              }`}
              disabled={!values.password}
              required
            />

            {/* Inline Error Message */}
            {values.confirmPassword && !isPasswordMatch && (
              <p className="text-red-500 text-sm mt-1">❌ Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-2 rounded text-white font-medium ${
              isPasswordMatch&&isCollegeMail&&values.enrolment
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            type="submit"
            disabled={!isPasswordMatch||isLoading}
      
          >
           {isLoading ? (
                        <div className="flex items-center gap-1 pl-1">
                        <LoaderCircle className="animate-spin" />
                        <p>Waiting for email verification</p>
                        </div>
                        ) :   
                        ("Submit")
            }
          </button>
        </form>

        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <Link to="/logIn" className="text-blue-500 hover:underline">
            LogIn
          </Link>
        </div>
      </div>
    </div>) 

    :
    (
      <div className="flex justify-center items-center h-screen">
        <h1 className='text-4xl'>Verified. Now u can close this tab</h1>
      </div>
     
    )

 
   
  );
};

export default SignUp;
