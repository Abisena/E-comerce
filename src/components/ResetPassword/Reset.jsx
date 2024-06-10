import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/reset-password/request",
        { email }
      );

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setShowOtpForm(true);
      } else {
        console.error("Failed to send email:", response.data.msg);
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send email. Please try again later.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/reset-password/verify",
        {
          email,
          otp,
          newPassword,
          confirmPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        console.error("Password reset failed:", response.data.msg);
        toast.error("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Password reset failed. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      {!showOtpForm ? (
        <form onSubmit={handleSendEmail}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send Email</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={newPassword}
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
