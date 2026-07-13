import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeuser } from "../store/userSlice";
import notificationBell from "../images/notificationBell.svg";

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeuser());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const getToUserIdName = (user) => {
    if (user?._id == "6a3d1c8fabf1bd25de4b217a") {
      return {
        id: "6a3e7c371f931b0637cfb473",
        name: "Rohit",
      };
    } else {
      return {
        id: "6a3d1c8fabf1bd25de4b217a",
        name: "Kohli",
      };
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex items-center">
          <Link className="w-5 mx-3" to={"/notifications"}>
            <img src={notificationBell} alt="notification" />
          </Link>
          <p>Welcome, {user?.name}</p>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={`/chat/${getToUserIdName(user).id}`}
                  className="justify-between"
                >
                  Chat with {getToUserIdName(user).name}
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
