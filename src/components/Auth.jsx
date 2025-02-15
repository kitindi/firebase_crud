import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const Auth = () => {
  const { googleSignIn, signUp } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setError(null); // Clear any previous errors
      navigate("/home");
    } catch (error) {
      console.error(error);
      const getFriendlyMessage = (code) => {
        switch (code) {
          case "auth/email-already-in-use":
            return "The email address is already in use.";
          case "auth/weak-password":
            return "Password should be at least 6 characters.";
          case "auth/invalid-email":
            return "The email address is not valid.";
          default:
            return "An unknown error occurred.";
        }
      };

      // Inside the catch block
      setError(getFriendlyMessage(error.code));
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
          <h1>Create Account</h1>
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
          <button type="submit">Create Account</button>
          <p>
            Already have an account ? <Link to="/">Login</Link>
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

export default Auth;
