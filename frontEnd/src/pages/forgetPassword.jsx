import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import supabaseClient from '../../database/supabase';

const ForgetPassword = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const[email,setEmail]=useState("")
 const [isCollegeMail, setIsCollegeMail] = useState(false);
 const [isSubmit,setIsSubmit]=useState(false);
 const[isSubmitButtonClicked,setIsSubmitClicked]=useState(false);
 

  const mailChecker = (email) => {
    return email.endsWith('@nitmanipur.ac.in');
  };

 const handleChanges = (e) => {
  const value = e.target.value;
  const match = mailChecker(value);
  setIsCollegeMail(match);
  setEmail(value);
};



  useEffect(() => {
    if (!location.state?.fromLogin) {
      navigate('/logIn'); // Redirect if not coming from login
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     if (isSubmitButtonClicked) return;

    setIsSubmitClicked(true); // blocks second click
        try
        {
        let { data, error } = await supabaseClient.auth.resetPasswordForEmail(
          email,
          {
          redirectTo: `https://nit-manipur-pyq.vercel.app/resetPassword`
          });

          
        // let { data, error } = await supabaseClient.auth.resetPasswordForEmail(email)


        if(error)
        {
            console.log('supabaseError');
            console.log(error);
            alert(error.code + " reasons: " + error.reasons);
            navigate('/logIn')
        }
        console.log(data);
        //from email we are being redireted
        //navigate('/resetPassword',{state:{fromForgetPassword:true}})
        }
        catch(err)
        {
        console.log('insideCatcherror');
        alert('Something unexpected happens')
        navigate('/logIn');
        }
        setIsSubmit(true); 
        // navigate(0);
    
    };

  return (
    !isSubmit?
    (  <div className="flex justify-center items-center h-screen">
          <div className="shadow-lg px-8 py-5 border w-80 rounded">
          <h2 className="text-lg font-bold mb-4 text-center">Forget Password</h2>

              <form onSubmit={handleSubmit}>

                      <div className="mb-4">
                          <label htmlFor="email" className="block text-gray-700">
                          Email
                          </label>
                          <input
                          id="email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChanges}
                          placeholder="Enter your college email"
                          className={`w-full px-3 py-2 border rounded ${
                              email
                              ? isCollegeMail
                                  ? 'border-green-500'
                                  : 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          required
                          />
                          {email && !isCollegeMail && (
                          <p className="text-red-500 text-sm mt-1">❌ Enter your college email</p>
                          )}
                      </div>

                      <button
                      className={`w-full py-2 rounded text-white font-medium ${
                      isCollegeMail
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      type="submit"
                      disabled={isSubmitButtonClicked || !isCollegeMail}//here is the changes
                      >
                      Submit
                      </button>

              </form>

          </div>

      </div>
    )
    :
    (
      <div className="flex justify-center items-center h-screen">
          <div className="shadow-lg px-8 py-5 border w-80 rounded">
            <h2 className="text-lg font-bold mb-4 text-center">Email has been seen for reseting password. Now u can close this tab</h2>
          </div>
      </div>
    )
  );
};

export default ForgetPassword;
