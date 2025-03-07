"use client";

import { css } from "@emotion/css";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type usersTypes = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

const page = () => {
  const [users, setUsers] = useState<usersTypes[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      console.error("Missing fields");
      return;
    }
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        alert("Error creating user");
        return;
      }
      const data = await response.json();
      setUsers([...users, data]);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Hello</h1>
      <Link href={"/auth"}>Auth</Link>
    </main>
  );
};

export default page;
