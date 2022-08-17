export const getErrorImageSelect = (image) => {
  const listImageType = ["jpg", "jpeg", "png", "gif"];
  if (image.size > 1024 * 1024 * 20) {
    return "Vui lòng chọn ảnh không vượt quá 20MB";
  } else if (
    !image.type.split("/")[1] ||
    !listImageType.includes(image.type.split("/")[1])
  ) {
    return "File không đúng định dạng";
  }
  return "";
};
export const getMoneyFormat = (money) => {
  return parseInt(money).toLocaleString("en-US") + " vnđ";
};
export const getStatus = (statusCode) => {
  switch (statusCode) {
    case "PENDING":
      return "Đang đợi";
    case "PROCESSING":
      return "Đang xử lí";
    case "DONE":
      return "Đã hoàn thành";
    case "REJECTED":
      return "Đã hủy";
    default:
      return "";
  }
};
