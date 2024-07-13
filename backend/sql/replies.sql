CREATE TABLE replies (
    user INT NOT NULL,
    comment INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user, comment),
    FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (comment) REFERENCES comments(id) ON DELETE CASCADE
);