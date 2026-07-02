import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

function EditProfile({ user }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ ...user });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/user", userData, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-20">
        <div className="card w-96 bg-base-300 card-lg shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <label className="input my-2">
              <input
                type="text"
                placeholder="Name"
                value={userData?.name}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, name: e.target.value }))
                }
              />
            </label>

            <label className="input my-2">
              <input
                type="text"
                placeholder="Gender"
                value={userData?.gender}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, gender: e.target.value }))
                }
              />
            </label>

            <label className="input my-2">
              <input
                type="text"
                placeholder="About"
                value={userData?.about}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, about: e.target.value }))
                }
              />
            </label>
            <p className="text-red-700 text-xs">{error}</p>
            <div className="justify-center card-actions m-2">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
