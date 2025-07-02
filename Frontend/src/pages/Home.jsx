import React, { useEffect, useState } from "react";
import { getUser } from "../api/usersApi";

const Home = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const data = await getUser();
      setUsers(data); // already parsed data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return <div>{JSON.stringify(users)}</div>;
};

export default Home;
