CREATE OR REPLACE FUNCTION generate_hash(input TEXT, salt TEXT) 
RETURNS TEXT AS $$
BEGIN
    RETURN encode(digest(input || salt, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;
