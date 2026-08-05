-- Convert expenses.id from text to uuid

ALTER TABLE expenses
DROP CONSTRAINT expenses_pkey;

ALTER TABLE expenses
ALTER COLUMN id TYPE UUID
USING id::uuid;

ALTER TABLE expenses
ADD CONSTRAINT expenses_pkey
PRIMARY KEY (id);


-- Add self-referencing relationship for recurring expenses

ALTER TABLE expenses
ADD CONSTRAINT expenses_recurring_id_fkey
FOREIGN KEY (recurring_id)
REFERENCES expenses(id)
ON DELETE SET NULL;