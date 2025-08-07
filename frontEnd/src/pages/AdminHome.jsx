import { useEffect, useState } from "react";
import LogoutButton from "./components/LogOutButton";
import SearchBar from "./components/SearchBar";
import AdminQuestionPaperTable from "./components/AdminQPaper";
import Pagination from "./components/Pagination";
import axios from "axios";
import UploadButton from "./components/UploadButton";

const Home = () => {
  const [searchParams, setSearchParams] = useState({ year: "", dept: "", sem: "" });
  const [papers, setPapers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadPapers();
  }, [page, searchParams]);

  const loadPapers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/adminHome", {
        params: { ...searchParams, page }
      });
      setPapers(response.data.data);
      console.log(response.data.data);
      setTotalPages(response.data.totalPages);
      console.log('totalPages:'+response.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch question papers", err);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    setPage(1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} />
        <UploadButton/>
        <LogoutButton />
      </div>

      <AdminQuestionPaperTable papers={papers} />

      {/* {papers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No Question Papers</p>
      )} */}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Home;