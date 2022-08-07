export const getErrorImageSelect = (image) => {
  const listImageType = ["jpg", "jpeg", "png","gif"];
  if (image.size > 1024 * 1024 * 20) {
    return "Kích thước file không quá 20MB!";
  } else if (
    !image.type.split("/")[1] ||
    !listImageType.includes(image.type.split("/")[1])
  ) {
    return "File không đúng định dạng!";
  }
  return "";
};
