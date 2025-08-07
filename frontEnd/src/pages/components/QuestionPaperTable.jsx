const QuestionPaperTable = ({ papers }) => {
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
                <td className="p-2 border text-center">{paper.department}</td>{/*here dept is use instead of departments*/}
                <td className="p-2 border text-center">{paper.semester}</td>
                 <td className="p-2 border text-center">{paper.subject}</td>
                <td className="p-2 border text-center">{paper.faculty}</td>
                <td className="p-2 border text-center">
                  <a
                    href={paper.pyq_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionPaperTable;

