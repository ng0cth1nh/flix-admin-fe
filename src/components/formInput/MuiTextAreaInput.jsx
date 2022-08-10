import React from "react";
import Pattern from "../../constants/Pattern";
import { Typography, TextareaAutosize } from "@mui/material";
const MuiTextAreaInput = ({id, label, item, isRequired = false, onChange }) => {
  return (
    <div style={{ width: "100%", marginTop: "10px" }} key={id}>
      <Typography sx={{ fontSize: "14px" }}>{label}</Typography>
      <TextareaAutosize
        minRows={5}
        maxRows={7}
        error={item.error !== ""}
        aria-label="maximum height"
        value={item.value}
        onChange={(e) => {
          let text = e.target.value;
          let err = "";
          if (text && !text.match(Pattern.TEXT_AREA)) {
            err = "Trường nhập không được quá 2500 kí tự!";
          }
          onChange(id, text, err);
        }}
        style={{
          width: "97%",
          marginTop: "5px",
          padding: "10px",
          resize: "none",
        }}
        required={isRequired}
      />
      {item.error && (
        <span style={{ fontSize: "12px", color: "red", padding: "3px" }}>
          {item.error}
        </span>
      )}
    </div>
  );
};

export default MuiTextAreaInput;
