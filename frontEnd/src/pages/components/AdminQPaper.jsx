import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminQuestionPaperTable = ({ papers }) => {
    const navigate=useNavigate()
    const handleDelete=async(paper)=>
    {
        try {
            await axios.delete(`http://localhost:3000/adminHome/${paper.id}`);
            // Optionally: trigger re-fetch from parent, or remove from state (lift this to parent)
            console.log(`Deleted paper with id: ${paper.id}`);
            alert(`Deleted paper with id: ${paper.id}`);
            navigate(0);
        } catch (err) {
            console.error("Delete failed:", err);
  }
    }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Semester</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Faculty</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {papers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No Question Papers Found.
              </td>
            </tr>
          ) : (
            papers.map((paper, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border text-center">{paper.year}</td>
                <td className="p-2 border text-center">{paper.department}</td>
                <td className="p-2 border text-center">{paper.subject}</td>
                <td className="p-2 border text-center">{paper.semester}</td>
                <td className="p-2 border text-center">{paper.faculty}</td>
                <td className="p-2 border text-center">
                  <a
                    href={paper.pyq_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline m-2"
                  >
                    View
                  </a>
                  {/*this delete button should be able to delete the q paper*/}
                  <button
                    onClick={() => handleDelete(paper)} 
                    className="text-blue-600 hover:underline m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuestionPaperTable;

