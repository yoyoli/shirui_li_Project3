import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatusCard from "../components/StatusCard";
import StatusForm from "../components/StatusForm";
import { AuthContext } from "../context/AuthContext";
import { fetchStatuses } from "../api/statusApi";

const HomePage = ({ user }) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStatuses = async () => {
      try {
        const data = await fetchStatuses();
        setStatuses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadStatuses();
  }, []);

  if (loading) return <p>Loading statuses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <main className="home-container">
        <h1>Home Page</h1>
        {user ? (
          <div className="logged-in-user">
            <p>Welcome, {user.username}!</p>
            <StatusForm user={user} setStatuses={setStatuses} />
          </div>
        ) : (
          <p>Please log in to create a status update.</p>
        )}
        <section className="status-list">
          {statuses.length > 0 ? (
            statuses.map((status) => (
              <StatusCard
                key={status._id}
                username={status.user?.username || "Unknown"}
                content={status.content}
                createdAt={status.createdAt}
                statusId={status._id}
                setStatuses={setStatuses}
                userID={status.user?._id || ""}
              />
            ))
          ) : (
            <p>No statuses available.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default HomePage;
