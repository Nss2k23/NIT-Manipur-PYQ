import { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [year, setYear] = useState("");
  const [dept, setDept] = useState("");
  const [sem, setSem] = useState("");
  const [sub,setSub]=useState("");
  const [options, setOptions] = useState({
    years: [],
    departments: [],
    semesters: [],
    subjects:[]
  });

  // Fetch dropdown data only once on mount
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/dropdowns");
        console.log(data);
        setOptions(data);
      } catch (err) {
        console.error("Failed to fetch dropdown options", err);
      }
    };

    fetchDropdowns();
  }, []);

  const handleSearch = () => {
    console.log(`we are searching on searchBar:- ${year} ${dept} ${sem} ${sub}`);
    onSearch({ year, dept, sem, sub });//i need to add subject
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        //className="p-2 border rounded"
         className="p-2 border rounded appearance-none bg-white"
      >
        <option value="">All Years</option>
        {options.years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={dept}
        onChange={(e) => setDept(e.target.value)}
        //className="p-2 border rounded"
        className="p-2 border rounded appearance-none bg-white"
      >
        <option value="">All Dept</option>
        {options.departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={sem}
        onChange={(e) => setSem(e.target.value)}
        //className="p-2 border rounded"
        className="p-2 border rounded appearance-none bg-white"
      >
        <option value="">All Sem</option>
        {options.semesters.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* <select
        value={sub}
        onChange={(e) => setSub(e.target.value)}
        //className="p-2 border rounded"
         className="p-2 border rounded appearance-none bg-white"
      >
        <option value="">All Sujects</option>
        {options.subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select> */}

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
