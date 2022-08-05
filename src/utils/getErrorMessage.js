import Error from "../constants/Error";
const getErrorMessage = (err) => {
  return !err.response.data
    ? "Kết nối bị gián đoạn. Vui lòng thử lại sau!"
    : Error[err.response.data.message]
    ? Error[err.response.data.message]
    : err.response.status >= 500
    ? "Hệ thống đang gặp sự cố! Vui lòng thử lại sau"
    : "Yêu cầu không hợp lệ! Vui lòng thử lại sau";
};
export default getErrorMessage;
