import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    // EventSource is the native browser API used to open a persistent connection to our SSE endpoint
    const eventSource = new EventSource(BASE_URL + "/notifications/events", {
      withCredentials: true,
    });

    // This listener fires every time the backend pushes data down using the "data: " format
    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.text) {
        setNotifications((prevVal) => [parsedData, ...prevVal]);
      }
    };

    eventSource.onerror = (error) => {
      console.log("SSE connection failed", error);
    };

    // Clean up function. If the user leaves this page, close the connection to save device resources.
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-10">
      <ul className="list bg-base-300 rounded-box shadow-md w-3/4 p-5">
        <li className="p-4 pb-2 text-lg opacity-75 tracking-wide">
          Notifications
        </li>

        {notifications &&
          notifications.map((notification) => {
            return (
              <li className="list-row bg-base-100 my-1" key={notification.id}>
                <div>
                  <div>{notification.text}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {notification?.timestamp}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Notifications;
