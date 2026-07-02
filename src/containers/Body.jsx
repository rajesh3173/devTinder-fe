import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/user", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("userData", userData);

    if (!userData) {
      console.log("if");

      fetchUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Body;
