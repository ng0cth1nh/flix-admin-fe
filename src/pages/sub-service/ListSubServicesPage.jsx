import "./ListSubServices.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Config from "../../constants/Config";
import Loading from "../../components/loading/Loading";
import SearchInline from "../../components/search/SearchInline";
import ApiContants from "../../constants/Api";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getMoneyFormat } from "../../utils/util";
const columns = [
  { id: "index", label: "#", width: "5%", align: "center" },
  {
    id: "subServiceName",
    label: "TÊN DỊCH VỤ CON",
    width: "15%",
    align: "center",
  },
  {
    id: "price",
    label: "GIÁ SỬA CHỮA",
    width: "15%",
    align: "center",
    format: (value) => getMoneyFormat(value),
  },
  {
    id: "description",
    label: "MÔ TẢ",
    width: "35%",
    align: "center",
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "15%",
    align: "center",
    format: (value) =>
      value === "ACTIVE" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Hoạt động
        </Typography>
      ) : (
        <Typography variant="p" sx={{ color: "red" }}>
          Vô hiệu hóa
        </Typography>
      ),
  },
  {
    id: "action",
    label: "THAO TÁC",
    width: "15%",
    align: "center",
    format: (value) => (
      <Button variant="contained" sx={{ textTransform: "none" }} size="small">
        <Link
          to={`/categories/${value.categoryId}/services/${value.serviceId}/subservices/subservice?id=${value.id}`}
          style={{ textDecoration: "none", color: "white" }}
          state={{
            categoryName: value.categoryName,
            serviceName: value.serviceName,
          }}
        >
          Cập nhật
        </Link>
      </Button>
    ),
  },
];
const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      backgroundColor: "#edeff0",
    },
  },
});
const ListSubServicesPage = () => {
  const { state } = useLocation();
  const classes = useStyles();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const { categoryId, serviceId } = useParams();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.get(
        ApiContants.SUBSERVICE_LIST +
          `?pageNumber=${page}&serviceId=${serviceId}`
      );
      setTotalRecord(response.data.totalRecord);
      setData(response.data.subServices);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/error");
    }
  };
  const searchData = async () => {
    // case both search text and status is null then fetch data by paging
    if (!search.trim()) {
      setIsSearching(false);
      setPage(0);
      fetchData();
      return;
    }
    let searchUrl = ApiContants.SUBSERVICE_SEARCH;
    if (search.trim()) {
      searchUrl += `?keyword=${search.trim()}&serviceId=${serviceId}`;
    }
    try {
      setPage(0);
      setLoading(true);
      setIsSearching(true);
      const response = await userAPI.get(searchUrl);
      setData(
        response.data.subServices.map((item) => ({
          ...item,
          subServiceName: item.name,
        }))
      );
      setTotalRecord(response.data.subServices.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/error");
    }
  };
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (!isSearching) {
      fetchData();
    }
  }, [page]);

  return (
    <div className="list-subservices">
      <Sidebar />
      <div className="list-subservices-container">
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
            <h1>
              {state.categoryName + " > " + state.serviceName + " > "}Dịch vụ
              con
            </h1>
            <div style={{ display: "flex" }}>
              <SearchInline
                placeholder="Tên dịch vụ"
                handleSearch={searchData}
                search={search}
                setSearch={setSearch}
              />
              <Button variant="contained" color="success">
                <Link
                  to={`/categories/${categoryId}/services/${serviceId}/subservices/subservice`}
                  style={{ textDecoration: "none", color: "white" }}
                  state={state}
                >
                  Thêm
                </Link>
              </Button>
            </div>
          </div>
          {data.length !== 0 ? (
            <div>
              <TableContainer sx={{ minHeight: "600px", marginTop: "20px" }}>
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
                    {data
                      .slice(
                        data.length <= Config.ROW_PER_PAGE
                          ? 0
                          : page * Config.ROW_PER_PAGE,
                        data.length <= Config.ROW_PER_PAGE
                          ? Config.ROW_PER_PAGE
                          : page * Config.ROW_PER_PAGE + Config.ROW_PER_PAGE
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              if (column.id === "index") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {page * Config.ROW_PER_PAGE + index + 1}
                                  </TableCell>
                                );
                              } else {
                                const value =
                                  column.id === "action"
                                    ? {
                                        categoryId,
                                        serviceId,
                                        categoryName: state.categoryName,
                                        serviceName: state.serviceName,
                                        id: row["id"],
                                      }
                                    : row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format
                                      ? column.format(value)
                                      : value}
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
                count={totalRecord}
                rowsPerPage={Config.ROW_PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
              />{" "}
            </div>
          ) : loading ? null : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/nodata.png"
                alt="nodata"
                style={{ width: "60%", aspectRatio: 1.5, margin: "auto" }}
              />
            </div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default ListSubServicesPage;
