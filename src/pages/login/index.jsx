import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login, googleSignIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError(null); // Clear any previous errors
      navigate("/home");
    } catch (error) {
      console.error(error);
    }

    // Inside the catch block
    if (error.code === "auth/user-not-found") {
      setError("User not found. Please check your email and try again.");
    } else if (error.code === "auth/wrong-password") {
      setError("Incorrect password. Please check your password and try again.");
    } else {
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div>
          <button type="submit">login</button>
          <p>
            Dont have an account ? <Link to="/signup">Signup now</Link>
          </p>
        </div>
        <div>
          {/* Display error message if one exists */}
          {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
        </div>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
