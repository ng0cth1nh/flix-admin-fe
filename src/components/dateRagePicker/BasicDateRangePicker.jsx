import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"; // choose your lib
import "./basicDateRangePicker.scss";
import { TextField } from "@mui/material";

export default function BasicDateRangePicker({
  label,
  selectedFromDate,
  setSelectedFromDate,
  selectedToDate,
  setSelectedToDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="datePicker">
        <DatePicker
          label={
            label === "YEAR"
              ? "Từ năm"
              : label === "MONTH"
              ? "Từ tháng"
              : "Từ ngày"
          }
          views={
            label === "YEAR"
              ? ["year"]
              : label === "MONTH"
              ? ["year", "month"]
              : ["year", "month", "day"]
          }
          inputFormat={
            label === "YEAR"
              ? "yyyy"
              : label === "MONTH"
              ? "MM/yyyy"
              : "DD/MM/yyyy"
          }
          value={selectedFromDate}
          onChange={(date) => setSelectedFromDate(date)}
          renderInput={(startProps) => (
            <>
              <TextField {...startProps} />
            </>
          )}
        />
      </div>
      <div className="datePicker">
        <DatePicker
          label={
            label === "YEAR"
              ? "Đến năm"
              : label === "MONTH"
              ? "Đến tháng"
              : "Đến ngày"
          }
          views={
            label === "YEAR"
              ? ["year"]
              : label === "MONTH"
              ? ["year", "month"]
              : ["year", "month", "day"]
          }
          inputFormat={
            label === "YEAR"
              ? "yyyy"
              : label === "MONTH"
              ? "MM/yyyy"
              : "DD/MM/yyyy"
          }
          value={selectedToDate}
          minDate={selectedFromDate}
          onChange={(date) => setSelectedToDate(date)}
          renderInput={(startProps) => (
            <>
              <TextField {...startProps} />
            </>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
