ALTER TABLE budgets
ADD CONSTRAINT budgets_user_id_unique UNIQUE(user_id);