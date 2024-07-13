CREATE TABLE follows (
    followed_id INT NOT NULL,
    follower_id INT NOT NULL,
    FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (followed_id, follower_id)
);