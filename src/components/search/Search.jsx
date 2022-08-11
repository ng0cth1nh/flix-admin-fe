import React from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Search = ({ placeholder, handleSearch, search, setSearch }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 200,
        border:"0.1px solid #9d9e9f",
        boxShadow:"none"
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton onClick={handleSearch} sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
