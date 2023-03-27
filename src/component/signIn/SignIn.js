import React, { useState } from "react";
import {
  FormControl,
  FormGroup,
  TextField,
  styled,
  Button,
} from "@mui/material";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services";
import { validEmail } from "../../helper";

const Container = styled(FormGroup)(`
    width:30%;
    border-radius:10px;
    margin: 0 auto 0 auto;
    & > div {
        margin-top:20px
    }
`);

const Signin = () => {
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  const [errorObj, setErrorObj] = useState({});

  const onHandleValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errorList = {};

    if (!user.email) {
      errorList.email = "Please Provide email Id.";
    }
    if (user.email) {
      if (!validEmail(user.email)) {
        errorList.email = "Please Provide a valid email Id";
      }
    }

    if (!user.password) {
      errorList.password = "Please provide a password.";
    }
    if (user.password) {
      if (user.password.length > 10) {
        errorList.password =
          "Please provide a password less than 10 characters.";
      }
    }

    if (!user.password) {
      errorList.password = "Please provide a password.";
    }

    if (Object.keys(errorList).length == 0) {
      setErrorObj({});
      return true;
    } else {
      setErrorObj(errorList);
      errorList = {};
      return false;
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    let obj = {
      ...user,
      strategy: "local",
    };
    let response = await loginUser(obj);
    if (response.data.error) {
      alert(response.data.error);
    } else {
      const { user, accessToken } = response.data;
      if (user && accessToken) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(accessToken));
        navigate("/task");
      }
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/a3/d8/8e/a3d88e30cd966d4c4d1eb2beb3556665.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "gray",
          height: 400,
          width: 600,
          borderRadius: 40,
          marginLeft: 70,
        }}
      >
        <Container style={{ marginLeft: 150 }}>
          <FormControl>
            <h1> Login</h1>
            <TextField
              error={errorObj.email}
              helperText={errorObj.email}
              placeholder="Email"
              onChange={(e) => onHandleValueChange(e)}
              name="email"
              type="text"
            />
          </FormControl>
          <FormControl>
            <TextField
              error={errorObj.password}
              helperText={errorObj.password}
              placeholder="Password"
              onChange={(e) => onHandleValueChange(e)}
              name="password"
              type="password"
            />
          </FormControl>
          <FormControl>
            <Button
              style={{
                borderRadius: 10,
                width: 300,
                alignSelf: "center",
                backgroundColor: "gray",
              }}
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
            <div style={{ margin: 10 }}></div>
            <p style={{ textAlign: "center" }}>
              Not a member ? <Link to="/signup">Register now</Link>
            </p>
          </FormControl>
        </Container>
      </div>
    </div>
  );
};

export default Signin;
