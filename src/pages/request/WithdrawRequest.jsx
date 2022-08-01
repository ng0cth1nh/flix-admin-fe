import "./WithdrawRequest.scss";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Typography,
  TextareaAutosize,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const columns = [
  { id: "index", label: "#", width: "5%", align: "center" },
  {
    id: "name",
    label: "TÊN THỢ SỬA",
    width: "20%",
    align: "center",
  },
  {
    id: "phone",
    label: "SỐ ĐIỆN THOẠI",
    width: "15%",
    align: "center",
  },
  {
    id: "type",
    label: "LOẠI RÚT TIỀN",
    width: "15%",
    align: "center",
  },
  {
    id: "txCode",
    label: "MÃ GIAO DỊCH",
    width: "15%",
    align: "center",
  },
  {
    id: "amount",
    label: "SỐ TIỀN",
    width: "10%",
    align: "center",
  },
  {
    id: "action",
    label: "THAO TÁC",
    width: "20%",
    align: "center",
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function createData(id, name, phone, money, type, txCode, amount) {
  return {
    id,
    name,
    phone,
    money,
    type,
    txCode,
    amount,
  };
}

const rows = [
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Nguyễn Văn Việt",
    1324171354,
    "Ưng Hoàng Phúc",
    60483973,
    "20/10/2022",
    359090
  ),
  createData(
    "India",
    "Hưng baba",
    1324171354,
    "Hưng chòi",
    60483973,
    "21/11/2022",
    359090
  ),
  createData(
    "India",
    "Lâm bánh đa",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2028",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Lâm bánh đa",
    60483973,
    "21/10/2012",
    359090
  ),
  createData(
    "India",
    "Hưng baba",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
];
const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "bold",
    },
  },
});
const WithdrawRequest = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [banReason, setBanReson] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState("");
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/repairers/profile/${id}`);
  };
  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="withdraw-request">
      <Sidebar />
      <div className="withdraw-request-container">
        <Navbar />
        <div className="table-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h1>Yêu cầu rút tiền</h1>
            <div className="search">
              <input type="text" placeholder="Tìm kiếm..." />
              <SearchOutlinedIcon />
            </div>
          </div>
          <div className="filter">
            <h2>Lọc theo</h2>

            <FormControl
              sx={{
                width: "200px",
                marginRight: "50px",
              }}
              margin="normal"
            >
              <InputLabel id="status-label">Loại rút tiền</InputLabel>
              <Select
                labelId="status-label"
                id="typeFilter"
                value={typeFilter}
                label="Loại rút tiền"
                onChange={handleChangeTypeFilter}
              >
                <MenuItem value={10}>Dụng cụ gia dụng</MenuItem>
                <MenuItem value={20}>Điện lạnh</MenuItem>
                <MenuItem value={30}>Điện tử</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer sx={{ minHeight: "600px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.root}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ width: column.width }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ borderWidth: 1 }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{
                          cursor: "pointer",
                        }}
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          if (column.id === "index") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={() => {
                                  handleRowClick(row["id"]);
                                }}
                              >
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                            );
                          } else if (column.id === "action") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    sx={{ textTransform: "none" }}
                                    size="small"
                                    color="success"
                                  >
                                    Chấp nhận
                                  </Button>
                                  <Button
                                    variant="contained"
                                    sx={{ textTransform: "none" }}
                                    size="small"
                                    color="error"
                                    onClick={() => setOpen(true)}
                                  >
                                    Từ chối
                                  </Button>
                                </div>
                              </TableCell>
                            );
                          } else {
                            const value =
                              column.id === "action"
                                ? row["id"]
                                : row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={() => {
                                  handleRowClick(row["id"]);
                                }}
                              >
                                {column.format ? column.format(value) : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Bạn có chắc muốn hủy yêu cầu rút tiền này không?
              </Typography>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <Typography sx={{ fontSize: "14px" }}>Lý do</Typography>
                <TextareaAutosize
                  minRows={5}
                  maxRows={7}
                  aria-label="maximum height"
                  placeholder="..."
                  onChange={(e) => {
                    setBanReson(e.target.value.trim());
                  }}
                  style={{
                    width: "97%",
                    marginTop: "10px",
                    padding: "10px",
                    resize: "none",
                  }}
                />
              </div>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-around",
                  marginLeft: "auto",
                  marginTop: "40px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={() => setOpen(false)}
                  color="error"
                >
                  Thoát
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  disabled={!banReason}
                >
                  Lưu
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequest;
