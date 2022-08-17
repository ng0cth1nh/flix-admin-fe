import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
const ConfirmDialog = ({
  open,
  handleClose,
  title,
  handleConfirm,
  children,
  acceptButtonEnable = true,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
        style={{alignItems:"center", justifyContent:"center" }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center", marginTop: "50px", width: "85%" }}
        >
          {title}
        </DialogTitle>
        {children}
        <DialogActions
          sx={{
            marginTop: "30px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button variant="contained" color="error" onClick={handleClose}>
            Thoát
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={!acceptButtonEnable}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ConfirmDialog;
