import "./navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      toast.success("Đăng xuất thành công");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleConfirm = async () => {
    await handleLogout();
    setShowLogoutConfirm(false);
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">JinHomes</span>
        </Link>

        {token && id ? (
          <div className="button-navbar-box">
            <button
              className="button-navbar"
              onClick={() => {
                navigate(`/favhomes`);
              }}
            >
              <span>Home yêu thích</span>
            </button>
            <button className="button-navbar" onClick={handleLogoutClick}>
              <span>Đăng xuất</span>
            </button>
          </div>
        ) : (
          <div className="button-navbar-box">
            <button
              className="button-navbar"
              onClick={() => {
                navigate("/signin");
              }}
            >
              <span>Đăng nhập</span>
            </button>
            <button
              className="button-navbar"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <span>Đăng ký</span>
            </button>
          </div>
        )}
      </div>
      <Dialog
        open={showLogoutConfirm}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận đăng xuất"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn đăng xuất?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Không
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
