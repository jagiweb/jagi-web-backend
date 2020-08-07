CREATE DATABASE jagiweb;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);