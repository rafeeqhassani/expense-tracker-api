ALTER TABLE expenses
ADD COLUMN user_id UUID;

ALTER TABLE expenses
ADD CONSTRAINT expenses_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES users(id);