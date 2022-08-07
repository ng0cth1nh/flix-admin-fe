import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const BanModal = ({
  open,
  handleClose,
  banReason,
  setBanReason,
  handleSave,
  phone,
  userType
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
          Bạn có chắc muốn chặn tài khoản này không?
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <TextField
            id="title"
            label="Số điện thoại"
            margin="normal"
            error={false}
            value={phone}
            defaultValue="45985858"
            variant="outlined"
            sx={{
              width: "40%",
            }}
            inputProps={{ readOnly: true }}
          />
          <TextField
            id="title"
            label="Loại người dùng"
            margin="normal"
            value={userType}
            variant="outlined"
            sx={{
              width: "40%",
            }}
            inputProps={{ readOnly: true }}
          />
        </div>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <Typography sx={{ fontSize: "14px" }}>Lí do</Typography>
          <TextareaAutosize
            minRows={5}
            maxRows={7}
            aria-label="maximum height"
            placeholder="Nội dung"
            value={banReason}
            onChange={(e) => {
              setBanReason(e.target.value);
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
            onClick={handleClose}
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
            onClick={handleSave}
          >
            Lưu
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default BanModal;
