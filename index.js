const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        const newUser = bcrypt.hash(password, saltRounds, function(err, hash) {
            pool.query("INSERT INTO users (username, password) VALUES($1, $2) RETURNING *",
        [username, hash]
        
        );
        res.json(newUser)
        });
        
        
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


// TODO : 
// CREATE CRUD FOR PORTFOLIO

app.post("/portfolios", async(req, res) => {
    try {
        
        const {name, description, img_url, video_url} = req.body;
        const newPortfolio = await pool.query("INSERT INTO portfolios (name, description, img_url, video_url) VALUES($1, $2, $3, $4) RETURNING *",
        [name, description, img_url, video_url]
        );

        res.json(newPortfolio.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

// GET ALL PORTFOLIOS

app.get("/porfolios", async(req, res) => {
    try {
        const allPortfolios = await pool.query("SELECT * FROM portfolios")
        res.json(allPortfolios.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// GET ONE PORTFOLIO

app.get("/porfolios/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const portfolio = await pool.query("SELECT * FROM portfolios WHERE portfolio_id = $1", [id])
        res.json(portfolio.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// UPDATE PORTFOLIO

app.put("/porfolios/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, img_url, video_url} = req.body
        const updatePortfolio = await pool.query("UPDATE portfolios SET name = $1, description = $2, img_url = $3, video_url = $4 WHERE portfolio_id = $5",
        [name, description, img_url, video_url, id]
        );
        res.json("PORTFOLIO UPDATED")
    } catch (err) {
        console.error(err.message)
    }
})

// DELETE PORTFOLIO

app.delete("/porfolios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletePortfolio = await pool.query("DELETE FROM portfolios WHERE portfolio_id = $1", [id])
        res.json("PORTFOLIO DELETED")
    } catch (err) {
        console.error(err.message)
    }
})

// USE GRAPHQL FOR THE API JUST FOR TESTING AND LEARNING
