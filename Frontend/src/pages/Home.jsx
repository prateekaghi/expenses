import React, { useEffect, useState } from "react";
import { getUser } from "../api/usersApi";

const Home = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const data = await getUser();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {users.length > 0
        ? users.map((user) => {
            return <div>{user.email}</div>;
          })
        : "No users found"}
    </div>
  );
};

export default Home;
