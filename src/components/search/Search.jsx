import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Search.scss";
const Search = ({ placeholder, handleSearch, search, setSearch }) => {
  return (
    <div className="search">
      <input
        type="text"
        value={search}
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <SearchOutlinedIcon sx={{ cursor: "pointer" }} onClick={handleSearch} />
    </div>
  );
};

export default Search;
