import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Upload = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [year, setYear] = useState("");
  const [dept, setDept] = useState("");
  const [sem, setSem] = useState("");
  const [sub, setSub] = useState("");
  const [faculty, setFaculty] = useState("");
  const [file, setFile] = useState(null);
  const[multileSubmitPrevent,setMultipleSubmitPrevent]=useState(false);

  useEffect(() => {
    if (!location.state?.fromLogin) {
      navigate('/adminHome');
    }
  }, [location, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleSubmit = async(e) => {
  //    console.log({
  //     year,
  //     dept,
  //     sem,
  //     sub,
  //     faculty,
  //     file,
  //   });

  //   try{
  //     const response = await axios.post()
  //   }
  //   catch(error)
  //   {

  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload on form submit

    const formData = new FormData();
    formData.append("year", year);
    formData.append("department", dept);
    formData.append("semester", sem);
    formData.append("subject", sub);
    formData.append("faculty", faculty);
    formData.append("file", file); // Append the file itself
    console.log(formData);
    if(multileSubmitPrevent)
    {
      //this is prevent mutiple submit
      return;
    }

    try {
      setMultipleSubmitPrevent(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);

      console.log("Upload successful:", response.data);
      alert("Upload successful!");
      
      // Optionally reset fields
      // setYear("");
      // setDept("");
      // setSem("");
      // setSub("");
      // setFaculty("");
      // setFile(null);
      navigate(0);

    } catch (error) {
      // setYear("");
      // setDept("");
      // setSem("");
      // setSub("");
      // setFaculty("");
      // setFile(null);

      console.error("Upload failed:", error);
      //see the error format here.
      alert("Upload failed. Please try again.");
      navigate(0);
    }
  };




  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload PYQ</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Year eg:2025"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Department (CSE, ECE, EE, ME, CE)"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Semester eg:4"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Subject"
          value={sub}
          onChange={(e) => setSub(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        />
      </div>

      <div className="flex items-center space-x-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-50 text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
          >
            Choose File
          </label>

          <span className="text-gray-600 text-sm">
            {file ? file.name : "No file chosen"}
          </span>
      </div>

        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

      <div className="text-center">
        <button
          disabled={!year || !dept || !sem || !sub || !faculty || !file}
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Upload;
