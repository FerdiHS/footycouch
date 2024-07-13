DELIMITER $$

CREATE TRIGGER increment_replies_count
AFTER INSERT ON replies
FOR EACH ROW
BEGIN
    UPDATE comments
    SET replies_count = replies_count + 1
    WHERE id = NEW.comment;
    UPDATE posts
    SET comments_count = comments_count + 1
    WHERE id = (SELECT post FROM comments WHERE id = NEW.comment);
END$$

CREATE TRIGGER decrement_replies_count
AFTER DELETE ON replies
FOR EACH ROW
BEGIN
    UPDATE comments
    SET replies_count = replies_count - 1
    WHERE id = OLD.comment;
	UPDATE posts
    SET comments_count = comments_count - 1
    WHERE id = (SELECT post FROM comments WHERE id = OLD.comment);
END$$

DELIMITER ;