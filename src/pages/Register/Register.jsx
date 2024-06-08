import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
      });

      console.log(response.data);
      // Set state redirect menjadi true jika registrasi berhasil
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate("/login"); // Navigate to /login
      }
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      toast.error("Registration failed. Please try again.");
      // Handle registration failure
    }
  };

  const handleSocialRegister = (platform) => {
    // Handle social registration logic
    console.log(`Register with ${platform}`);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleEmailRegister}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="social-buttons">
        <button onClick={() => handleSocialRegister("GitHub")}>
          <FontAwesomeIcon icon={faGithub} style={{ marginRight: "5px" }} />
          Register with GitHub
        </button>
      </div>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
