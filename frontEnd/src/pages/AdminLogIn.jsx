import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminLogIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isCollegeMail, setIsCollegeMail] = useState(false);
  const[isSubmitButtonClicked,setIsSubmitClicked]=useState(false);
  const navigate = useNavigate();

  const mailChecker = (email) => {
    return email.endsWith('@nitmanipur.ac.in');
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'email') {
        const match = mailChecker(updated.email);
        setIsCollegeMail(match);
      }

      if (name === 'password') {
        setIsPasswordValid(value.length >= 6);
      }

      return updated;
    });
  };

  const handleForgotPassword = () => {
    navigate('/forgetPassword', { state: { fromLogin: true } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (isSubmitButtonClicked) return;

    setIsSubmitClicked(true);

    try {
      console.log('Hitting the submit button of LogIn');
      const response = await axios.post('http://localhost:3000/auth/adminLogIn', values);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data.access_token);
        localStorage.setItem('adminToken', response.data.access_token);
        console.log('Navigating to adminHome');
        navigate('/adminHome');
      }
    } catch (err) {
      console.log('frontend catch error');
      if (err.response.status === 500) {
        console.log('this error is due to catch block in back end');
        alert(err.response.message);
      } else {
        console.log('this is supabase error');
        console.log(err);
        alert(err.response.data.message);
      }
      //navigate(0);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 border w-80 rounded">
        <h2 className="text-lg font-bold mb-4 text-center">Admin LogIn</h2>

        <form onSubmit={handleSubmit}>
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
            {values.email && !isCollegeMail && (
              <p className="text-red-500 text-sm mt-1">❌ Enter your college email</p>
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
            {values.password && !isPasswordValid && (
              <p className="text-red-500 text-sm mt-1">
                ❌ Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-2 rounded text-white font-medium ${
              isPasswordValid && isCollegeMail
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            type="submit"
            disabled={(!isPasswordValid && !isCollegeMail)}
          >
            Submit
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="text-blue-500 hover:underline text-sm"
          >
          <Link to="/logIn" className="text-blue-500 hover:underline">
            Not an Admin
          </Link>
          </button>
        </div>

        <div className="text-center mt-3">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>

        {/* SignUp link */}
        <div className="text-center mt-4">
          <span>Not having any account? </span>
          <Link to="/signUp" className="text-blue-500 hover:underline">
            SignUp
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogIn;