DELIMITER $$

CREATE TRIGGER increment_comments_count
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
    UPDATE posts
    SET comments_count = comments_count + 1
    WHERE id = NEW.post;
END$$

CREATE TRIGGER decrement_comments_count
AFTER DELETE ON comments
FOR EACH ROW
BEGIN
    UPDATE posts
    SET comments_count = comments_count - 1
    WHERE id = OLD.post;
END$$

DELIMITER ;