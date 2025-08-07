import { useEffect, useState } from "react";
import LogoutButton from "./components/LogOutButton";
import SearchBar from "./components/SearchBar";
import QuestionPaperTable from "./components/QuestionPaperTable";
import Pagination from "./components/Pagination";
import axios from "axios";

const Home = () => {
  const [searchParams, setSearchParams] = useState({ year: "", dept: "", sem: "", sub:""});//i need to add sub
  const [papers, setPapers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadPapers();
  }, [page, searchParams]);

  const loadPapers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/home", {
        params: { ...searchParams, page }
      });
      console.log('papers:');
      console.log(response.data.data);
      setPapers(response.data.data);
      console.log('totalPages:'+response.data.totalPages);
      setTotalPages(response.data.totalPages);
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
        <LogoutButton />
      </div>

      <QuestionPaperTable papers={papers} />

      {/*this is where one No question papers */}

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
