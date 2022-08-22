import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  TextField,
  Button,
  Typography,
  TextareaAutosize,
  List,
} from "@mui/material";
import { MapInteractionCSS } from "react-map-interaction";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Config from "../../constants/Config";
import "./FeedbackDetail.scss";
import { getStatus } from "../../utils/util";
import { formatFromDateTime } from "../../utils/getFormatDate";
const FeedbackDetailPage = () => {
  const { feedbackId } = useParams();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isNaN(feedbackId)) throw new Error();
        setLoading(true);
        const response = await userAPI.get(
          ApiContants.FEEDBACK_SINGLE + `?feedbackId=${feedbackId}`
        );
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        navigate("/error");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="single-feedback">
      <Sidebar />
      <div className="single-feedback-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body">
            <h1>Phản hồi</h1>
            <div className="feedback-information">
              <TextField
                id="phone"
                label="Số điện thoại"
                margin="normal"
                error={false}
                value={data.phone}
                variant="outlined"
                sx={{
                  width: "40%",
                }}
                inputProps={{ readOnly: true }}
              />
              <TextField
                id="type"
                label="Loại yêu cầu"
                margin="normal"
                error={false}
                value={Config.FEEDBACK_TYPE[data.feedbackType]}
                variant="outlined"
                sx={{
                  width: "40%",
                }}
                inputProps={{ readOnly: true }}
              />
              <TextField
                id="requestId"
                label="Mã đặt lịch"
                margin="normal"
                error={false}
                defaultValue={data.requestCode}
                variant="outlined"
                sx={{
                  width: "40%",
                }}
                inputProps={{ readOnly: true }}
              />
              <TextField
                id="title"
                label="Tiêu đề"
                margin="normal"
                error={false}
                defaultValue={data.title}
                variant="outlined"
                sx={{
                  width: "40%",
                }}
                inputProps={{ readOnly: true }}
              />
              <div style={{ width: "100%", marginTop: "10px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  Nội dung
                </Typography>
                <TextareaAutosize
                  minRows={5}
                  maxRows={7}
                  aria-label="maximum height"
                  placeholder="Nội dung*"
                  defaultValue={data.description}
                  style={{
                    width: "97%",
                    marginTop: "10px",
                    padding: "10px",
                    resize: "none",
                  }}
                  disabled
                />
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "bold", width: "40%" }}
                  >
                    Tệp đính kèm
                  </Typography>
                  {data.images.length === 0 && (
                    <Typography>Không có</Typography>
                  )}
                </div>
                <div className="file">
                  {data.images.map((img) => (
                    <div className="image-container">
                      <MapInteractionCSS>
                        <img src={img} alt="Ảnh minh họa" />
                      </MapInteractionCSS>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "bold", width: "40%" }}
                >
                  Trạng thái
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {getStatus(data.status)}
                </Typography>
              </div>
              <List
                style={{
                  maxHeight: "500px",
                  overflow: "auto",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    marginTop: "20px",

                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "bold", width: "40%" }}
                  >
                    Phản hồi
                  </Typography>
                  {data.responses.length === 0 && (
                    <Typography>Không có</Typography>
                  )}
                </div>
                {data.responses.map((item) => (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <TextareaAutosize
                      minRows={5}
                      maxRows={7}
                      aria-label="maximum height"
                      placeholder="Phản hồi"
                      defaultValue={item.content}
                      style={{
                        width: "96%",
                        marginTop: "10px",
                        padding: "10px",
                        resize: "none",
                      }}
                      disabled
                    />
                    <Typography
                      sx={{
                        fontSize: "12px",
                        textAlign: "end",
                        marginRight: "20px",
                      }}
                    >
                      {formatFromDateTime(item.createdAt)}
                    </Typography>
                  </div>
                ))}
              </List>
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "bold", width: "40%" }}
                >
                  Ngày tạo phản hồi
                </Typography>
                <Typography>{formatFromDateTime(data.createdAt)}</Typography>
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "bold", width: "40%" }}
                >
                  Ngày cập nhật gần nhất
                </Typography>
                <Typography>{formatFromDateTime(data.updatedAt)}</Typography>
              </div>
              <div
                style={{ width: "100%", display: "flex", marginTop: "20px" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                >
                  <Link
                    to={`/feedbacks/feedback/update?feedbackId=${feedbackId}&statusId=${data.status}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Cập nhật
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackDetailPage;
