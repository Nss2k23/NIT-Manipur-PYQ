import { useNavigate } from 'react-router-dom';

const UploadButton = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate('/upload', { state: { fromLogin: true } });
  };


  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleUpload}>
      Uplaod PYQ
    </button>
  );
};

export default UploadButton;