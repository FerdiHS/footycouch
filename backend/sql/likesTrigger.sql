DELIMITER $$

CREATE TRIGGER increment_likes_count
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
    UPDATE posts
    SET likes_count = likes_count + 1
    WHERE id = NEW.post;
END$$

CREATE TRIGGER decrement_likes_count
AFTER DELETE ON likes
FOR EACH ROW
BEGIN
    UPDATE posts
    SET likes_count = likes_count - 1
    WHERE id = OLD.post;
END$$

DELIMITER ;