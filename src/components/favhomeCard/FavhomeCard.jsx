import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./favhomeCard.css";
import USER from "../../services/userService";
import { toast } from "react-toastify";
import HOME from "../../services/homeService";
import { useNavigate } from "react-router-dom";

const FavhomeCard = ({ data }) => {
  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDetail = async () => {
    const homename = data.homename;
    try {
      const res = await HOME.getHomeByName({ homename: homename });
      if (res.data._id) {
        navigate(`/home/${res.data._id}`);
      }
    } catch {
      toast.error("Home này hiện không có phòng! Không thể xem chi tiết");
    }
  };

  const handleRemove = async () => {
    try {
      await USER.removeFavhome({
        user_id: user_id,
        homename: data.homename,
      });
      toast.success("Xóa thành công");
    } catch {
      toast.error("Xóa không thành công");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    await handleRemove();
    handleClose();
  };

  return (
    <div>
      <div className="favhome-cpn">
        <div>
          <img src={data?.homephoto} className="favhome-item-avatar" alt="" />
        </div>
        <div className="favhome-detail">
          <div className="detail-name">
            <span>{data.homename}</span>
          </div>
        </div>
        <div className="button-group">
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={handleDetail}
          >
            Chi tiết
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            onClick={handleClickOpen}
          >
            Xóa
          </Button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn xóa {data.homename} khỏi Home yêu thích?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FavhomeCard;
