CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    likes_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user) REFERENCES users(id)
);