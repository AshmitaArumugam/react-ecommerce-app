import { useEffect, useState } from "react";
import "./NotificationPage.css";

function NotificationPage({ setUnreadCount }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // 1️⃣ GET notifications
        const res = await fetch(
          "https://v0icht67ec.execute-api.us-east-2.amazonaws.com/notification",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setNotifications(data.notifications || []);

        // 2️⃣ MARK ALL AS READ (PATCH SAME API)
        await fetch(
          "https://v0icht67ec.execute-api.us-east-2.amazonaws.com/notification",
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 3️⃣ RESET BELL COUNT
        setUnreadCount(0);

      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [setUnreadCount]);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notification-page">
      <h2>My Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications available 🔕</p>
      ) : (
        notifications.map((note) => (
          <div className="notification-card" key={note.notificationId}>
            🔔 {note.message}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationPage;
