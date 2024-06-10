import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data); // Cek nilai response.data

      if (response.status === 200) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        console.error("Login failed:", response.data.msg);
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed. Please try again later.");
    }
  };

  const handleSocialLogin = (platform) => {
    // Handle social login logic
    console.log(`Login with ${platform}`);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="social-buttons">
        <button onClick={() => handleSocialLogin("GitHub")}>
          <FontAwesomeIcon icon={faGithub} style={{ marginRight: "5px" }} />
          Login with GitHub
        </button>
      </div>
      <p>
        <Link to="/reset/password">Forgot password?</Link>
      </p>
      <p>
        Dont have an account? <Link to="/">Register here</Link>
      </p>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
