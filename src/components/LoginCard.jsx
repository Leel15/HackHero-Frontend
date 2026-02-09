import { useState } from "react";
import Tabs from "./Tabs";
import InputField from "./InputField";
import SocialButton from "./SocialButton";
import { Link } from "react-router-dom";
import { FaApple, FaGoogle, FaWindows } from "react-icons/fa";
import { loginUser, registerUser } from "../api/auth";
import Swal from "sweetalert2";



function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

const handleLogin = async () => {
  try {
    if (mode === "login") {
      const res = await loginUser({ email, password });

      if (res.token) {
        localStorage.setItem("token", res.token);

        Swal.fire({
          icon: "success",
          title: "Login Successful 🎉",
          text: "Welcome back! You are now logged in.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed ❌",
          text: res.message || "Invalid email or password.",
        });
      }
    }

    if (mode === "register") {
      const res = await registerUser({
        username: email.split("@")[0],
        email,
        password,
      });

      if (res.token) {
        localStorage.setItem("token", res.token);

        Swal.fire({
          icon: "success",
          title: "Account Created 🎉",
          text: "Your account has been created successfully.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed ❌",
          text: res.message || "Unable to create account.",
        });
      }
    }
  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Server Error 🚨",
      text: "Something went wrong. Please try again later.",
    });
  }
};



  return (
    <div className="login-card">
      <Tabs mode={mode} setMode={setMode} />

      {mode === "register" && (
        <InputField
          type="text"
          placeholder="Full Name"
        />
      )}

      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === "register" && (
        <InputField
          type="password"
          placeholder="Confirm Password"
        />
      )}

     {mode === "login" && (
  <div className="forgot">
<Link to="/forgot">Forget Password?</Link>
  </div>
)}


      <button className="login-btn" onClick={handleLogin}>
        {mode === "login" ? "Log In" : "Create Account"}
      </button>


<div className="divider">
  {mode === "login" ? "Log in with" : "Sign up with"}
</div>

          <div className="socials">
            <SocialButton><FaApple /></SocialButton>
            <SocialButton><FaGoogle /></SocialButton>
            <SocialButton><FaWindows /></SocialButton>
          </div>
       
    </div>
  );
}

export default LoginCard;
