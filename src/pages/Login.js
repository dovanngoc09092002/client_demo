import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactJsAlert from "reactjs-alert";
import "../css/register.css";
import { getCookie, setCookie } from "../cookie";

function Login() {
  let navigate = useNavigate();

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
  });
  const onSubmit = (data) => {
    setInitialValues({
      username: "",
      password: "",
      name: "",
    });
    axios
      .post("https://api-ngoc.onrender.com/user/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.errCode === 0) {
          setCookie("token", response.data.token, 1);
          window.location = "/profile";
        }
        if (response.data.errCode === 1) {
          setStatus(true);
        }
      });
  };
  return (
    <div className="body_register">
      <div className="createPostPage marginTop130px">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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

            <button className="submit_register" type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </div>

      <ReactJsAlert
        status={status} // true or false
        type="info" // success, warning, error, info
        title="Sai thông tin , vui lòng kiểm tra lại"
        Close={() => setStatus(false)}
      />
    </div>
  );
}

export default Login;
