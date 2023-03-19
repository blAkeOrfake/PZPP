-- CREATE DATABASE pzpp;
-- CREATE USER root WITH PASSWORD 'root';
-- GRANT ALL PRIVILEGES ON DATABASE pzpp TO root;

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     username VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );
-- CREATE TABLE transactions (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER NOT NULL,
--     amount NUMERIC(10,2) NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );
-- INSERT INTO users (name, email, password) VALUES ('John Doe', 'john', 'john.doe@gmail.com', 'john');


