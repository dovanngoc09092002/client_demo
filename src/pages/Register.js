import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactJsAlert from "reactjs-alert";
import "../css/register.css";
import { getCookie } from "../cookie";
import { ColorRing } from "react-loader-spinner";

function Register() {
  let navigate = useNavigate();
  const [isloadding, setIsloadding] = useState(false);
  const token = getCookie("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  const [status, setStatus] = useState(false);

  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    name: "",
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5).max(15000),
    password: Yup.string().min(5).max(15000),
    name: Yup.string().min(5).max(10000),
  });

  const onSubmit = (data) => {
    setIsloadding(true);
    setInitialValues({
      username: "",
      password: "",
      name: "",
    });
    axios
      .post("https://api-ngoc.onrender.com/user/register", data)
      .then((response) => {
        if (response.data.errCode === 0) {
          setIsloadding(false);

          navigate("/login");
        }
        if (response.data.errCode === 1) {
          setStatus(true);
        }
      });
  };
  return (
    <div className="body_register">
      <div className="createPostPage marginTop130px">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. username...)"
            />
            <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="password"
              placeholder="(Ex. ******...)"
            />
            <label>Name: </label>
            <ErrorMessage name="name" component="span" />
            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="name"
              placeholder="(Ex. Ngoc...)"
            />
            <button className="submit_register" type="submit">
              {" "}
              Đăng Ký
            </button>
            {isloadding && (
              <div style={{ textAlign: "center" }}>
                {" "}
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["#ddd", "#fff", "#fff", "#fff", "#fff"]}
                />{" "}
              </div>
            )}
          </Form>
        </Formik>
      </div>

      <ReactJsAlert
        status={status} // true or false
        type="info" // success, warning, error, info
        title="Đã tồn tại tài khoản , yêu cầu nhập lại"
        Close={() => setStatus(false)}
      />
    </div>
  );
}

export default Register;
