import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailId, setEmailId] = useState("vaibhav@gmail.com");
  const [password, setPassword] = useState("password@123");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(user?.data));
      navigate("/");
    } catch (error) {
      console.error("error ", error);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card w-96 bg-base-300 card-lg shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">LogIn</h2>
          {/* email */}
          <label className="input my-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          {/* Password */}
          <label className="input my-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {/* login button */}
          <div className="justify-center card-actions m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              LogIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
