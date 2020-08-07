const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
    console.log("server has started on port 4000")
});

// ROUTES

// CREATE USERS

app.post("/users", async(req, res) => {
    try {
        
        const {username, password} = req.body;
        const newUser = await pool.query("INSERT INTO users (username, password) VALUES($1, $2) RETURNING *",
        [username, password]
        );

        res.json(newUser.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

// GET ALL USERS

app.get("/users", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users")
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// GET ONE USER

app.get("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// UPDATE USER

app.put("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {username, password} = req.body
        const updateUser = await pool.query("UPDATE users SET username = $1, password = $2 WHERE user_id = $3",
        [username, password, id]
        );
        res.json(updateUser)
    } catch (err) {
        console.error(err.message)
    }
})

// DELETE USER

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id])
        res.json("USER DELETED")
    } catch (err) {
        console.error(err.message)
    }
})