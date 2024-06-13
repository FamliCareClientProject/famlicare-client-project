CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    loved_one_id INTEGER REFERENCES loved_ones(id),
    user_id INTEGER REFERENCES users(id),
    message_text TEXT
);