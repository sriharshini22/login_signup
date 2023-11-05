import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="center">
      <div className="auth">
        <h1>Log In</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your Email"
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

          <button class="button-30" role="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? &nbsp;
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
