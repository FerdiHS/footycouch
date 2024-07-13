CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT NOT NULL,
    post INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    replies_count INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post) REFERENCES posts(id) ON DELETE CASCADE
);