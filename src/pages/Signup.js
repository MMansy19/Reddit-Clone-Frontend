import React, { useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { TextField, Button } from "@mui/material";
import { FiLogIn } from "react-icons/fi";

function Signup() {
  const [errors, setErrors] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [captcha, setCaptcha] = React.useState(null);

  const [validUser, setValidUser] = React.useState(false);
  const [validPassword, setValidPassword] = React.useState(false);
  const [validEmail, setValidEmail] = React.useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = React.useState(false);

  useEffect(() => {
    setValidUser(username.match(/^[a-zA-Z0-9_]{3,16}$/));
    setValidEmail(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setValidPassword(password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
    setValidConfirmPassword(password === confirmPassword);
  }, [username, password, email, confirmPassword]);

  const [touchedUser, setTouchedUser] = React.useState(false);
  const [touchedPassword, setTouchedPassword] = React.useState(false);
  const [touchedEmail, setTouchedEmail] = React.useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] =
    React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <TextField
            InputProps={{
              endAdornment: <MdAlternateEmail />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Email"
            type="text"
            error={!email && touchedEmail}
            helperText={!email && touchedEmail ? "Email is required" : ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => setTouchedEmail(true)}
          />

          <TextField
            InputProps={{
              endAdornment: <FaUserAstronaut />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Username"
            type="text"
            error={!username && touchedUser}
            helperText={!username && touchedUser ? "Username is required" : ""}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={() => setTouchedUser(true)}
          />

          <TextField
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Password"
            type="password"
            error={!password && touchedPassword}
            helperText={
              !password && touchedPassword ? "Password is required" : ""
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => setTouchedPassword(true)}
          />

          <TextField
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Confirm Password"
            type="password"
            error={
              (!confirmPassword && touchedConfirmPassword) ||
              (password !== confirmPassword && touchedConfirmPassword)
            }
            helperText={
              (!confirmPassword && touchedConfirmPassword) ||
              (password !== confirmPassword && touchedConfirmPassword)
                ? "Passwords do not match"
                : ""
            }
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onBlur={() => setTouchedConfirmPassword(true)}
          />

          <div className="captcha">
            <ReCAPTCHA
              sitekey="6LfwE4opAAAAAIroaJa6YdxlNtZiD7-OpS-QOoH0"
              onChange={(value) => {
                setCaptcha(value);
                console.log(value);
              }}
            />
            {errors.captcha && <div className="error">{errors.captcha}</div>}
          </div>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#FF5700",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            startIcon={<FiLogIn />}
            disabled={
              !validUser ||
              !validPassword ||
              !validEmail ||
              !validConfirmPassword ||
              !captcha
            }
            type="submit"
          >
            Signup
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%", marginTop: "10px", padding: "10px" }}
            startIcon={<FaFacebook />}
          >
            Signup with Facebook
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "10px", padding: "10px" }}
            startIcon={<FaGoogle />}
          >
            Signup with Google
          </Button>
          <div className="register-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
