import { useState } from "react";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import secureImg from "../assets/images/secure.png";
import "../styles/login.css";  

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <img src={secureImg} alt="Cyber Illustration" />
      </div>

      <div className="login-card">
        <h2 style={{ color: "white", marginBottom: "10px" }}>Forgot Password</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "20px" }}>
          Enter your email and we will send you a reset link
        </p>

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="login-btn" onClick={handleReset}>
          Send Reset Link
        </button>

        <div className="forgot" style={{ marginTop: "15px" }}>
          <Link to="/" style={{ color: "#4fa3f7" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
