import moment from "moment";
export const formatFromDate = (date) => {
    return moment(date,"DD-MM-YYYY").format("DD/MM/YYYY")
};
export const formatFromDateTime = (date) => {
    return moment(date,"YYYY-MM-DD H:mm:ss").format("DD/MM/YYYY")
};
