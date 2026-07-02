import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

function Profile() {
  const user = useSelector((store) => store.user);

  return user && <EditProfile user={user} />;
}

export default Profile;
