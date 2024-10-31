import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };

        try {
            const response = await axios.post(`http://localhost:3000/api/users`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                console.log("User created:", response.data);
                setUsers([...users, response.data]);
            } else {
                console.error("Failed to create user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
            if (response.status === 200) {
                setUsers(users.filter((user) => user.id !== id));
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="App">
            <div>
                <h1>Users</h1>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.email}
                            <button onClick={() => handleDelete(user.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
