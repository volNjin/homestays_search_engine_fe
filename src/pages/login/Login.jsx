import React, { useMemo, useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import USER from "../../services/userService";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.mail) newErrors.mail = "Email trống. Vui lòng nhập Email";
    if (!formData.password)
      newErrors.password = "Mật khẩu trống. Vui lòng nhập mật khẩu";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const res = await USER.login({
          email: formData.mail,
          password: formData.password,
        });
        const token = res?.data?.accessToken;
        if (token) {
          localStorage.setItem("token", token);
        }
        const id = res?.data?.id;
        if (id) {
          localStorage.setItem("id", id);
        }
        toast.success("Đăng nhập thành công");
        navigate(-1);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setErrors({
          invalid: "Email hoặc mật khẩu không chính xác. Vui lòng nhập lại",
        });
      }
    }
  };

  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-stack">
          <div className="login-auth-form-login">
            <div className="login-head">
              <span className="login-text02 H4">Đăng nhập</span>
            </div>
            <form className="login-content1" onSubmit={handleSubmit}>
              <span>Email *</span>
              <div className="login-input">
                <input
                  type="text"
                  name="mail"
                  placeholder="Email"
                  className="login-input"
                  value={formData.mail}
                  onChange={handleChange}
                />
              </div>
              {errors.mail && <p className="error">*{errors.mail}</p>}

              <span>Mật khẩu *</span>
              <div className="login-input">
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  className="login-input"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <p className="error">*{errors.password}</p>}
              {errors.invalid && <p className="error">*{errors.invalid}</p>}

              <div className="login-text13">
                <span
                  className="help-button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Tạo tài khoản
                </span>
              </div>

              <button type="submit" className="login-button">
                <span className="login-text15 ComponentsButtonLarge">
                  <span>Đăng nhập</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
