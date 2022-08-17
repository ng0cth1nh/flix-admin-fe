import { TextField } from "@mui/material";
const MuiFormInput = ({
  id,
  item,
  errorMessage,
  isRequired,
  pattern,
  onChange,
  ...props
}) => {
  return (
    <div
      style={{
        width: "40%",
      }}
    >
      <TextField
        id={id}
        {...props}
        margin="normal"
        error={item.error !== ""}
        value={item.value}
        onChange={(e) => {
          let text= e.target.value;
          let err="";
           if (text && !text.trim().match(pattern)) {
            err = errorMessage;
          }
          onChange(id, text, err);
        }}
        sx={{ width: "100%" }}
        variant="outlined"
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

export default MuiFormInput;
