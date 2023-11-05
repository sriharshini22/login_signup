import { useState } from "react";
import "./styles.css";
import { auth } from "./Firebase";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthValue } from "./AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match!");
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => setError(err.message));
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="center">
      <div className="auth">
        <h1>Sign Up</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input
            type="email"
            value={email}
            placeholder="Enter your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="inputStyle"
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="inputStyle"
          />

          <input
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="inputStyle"
          />

          <button class="button-30" role="button" type="submit">
            SignUp
          </button>
        </form>
        <br></br>
        <span>
          Already have an account? &nbsp; <Link to="/login">Log In</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
