-- Expenses
ALTER TABLE expenses
DROP CONSTRAINT expenses_user_id_fkey;

ALTER TABLE expenses
ADD CONSTRAINT expenses_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;


-- Activities
ALTER TABLE activities
DROP CONSTRAINT activities_user_id_fkey;

ALTER TABLE activities
ADD CONSTRAINT activities_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;