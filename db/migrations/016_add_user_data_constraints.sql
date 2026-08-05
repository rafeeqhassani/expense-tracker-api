ALTER TABLE users
ADD CONSTRAINT users_name_not_empty
CHECK (length(trim(name)) > 0);


ALTER TABLE users
ADD CONSTRAINT users_email_not_empty
CHECK (length(trim(email)) > 0);


ALTER TABLE users
ADD CONSTRAINT users_password_hash_not_empty
CHECK (length(trim(password_hash)) > 0);