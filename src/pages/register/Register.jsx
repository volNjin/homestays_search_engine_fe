import React, { useEffect, useMemo } from "react";
import "./register.css";
import USER from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    password: "",
    password2: "",
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
    if (!formData.name)
      newErrors.name = "Họ tên trống. Vui lòng nhập họ và tên";
    if (!formData.mail) newErrors.mail = "Email trống. Vui lòng nhập Email";
    if (!formData.password)
      newErrors.password = "Mật khẩu trống. Vui lòng nhập mật khẩu";
    if (!formData.password2)
      newErrors.password2 = "Vui lòng xác nhận lại mật khẩu";
    if (formData.password !== formData.password2)
      newErrors.password2 = "Xác nhận mật khẩu không khớp. Vui lòng nhập lại";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const result = await USER.register({
          name: formData.name,
          email: formData.mail,
          password: formData.password,
        });
        const token = result?.data?.accessToken;
        localStorage.setItem("token", token);
        const id = result?.data?.user_id;
        localStorage.setItem("id", id);
        toast.success("Đăng ký thành công");
        navigate("/");
      } catch (err) {
        toast.error(err?.response?.data?.message);
        setErrors({user_existed: "Email đã được đăng ký. Vui lòng sử dụng email khác."})
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
              <span className="login-text02 H4">Đăng ký</span>
            </div>
            <form className="login-content1"onSubmit={handleSubmit}>
                <span>Họ và tên *</span>
                <div className="login-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Họ và tên"
                    className="login-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="error">*{errors.name}</p>}

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

                <span>Xác nhận mật khẩu *</span>
                <div className="login-input">
                  <input
                    type="password"
                    name="password2"
                    placeholder="Xác nhận mật khẩu"
                    className="login-input"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </div>
                {errors.password2 && (
                  <p className="error">*{errors.password2}</p>
                )}
                {errors.user_existed && (<p className="error">*{errors.user_existed}</p>)}
                <button type="submit" className="login-button">
                  <span className="login-text15 ComponentsButtonLarge">
                    <span>Đăng ký</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Register;
