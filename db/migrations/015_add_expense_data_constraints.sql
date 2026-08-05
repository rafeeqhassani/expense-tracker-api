ALTER TABLE expenses
ADD CONSTRAINT expenses_amount_positive
CHECK (amount > 0);


ALTER TABLE expenses
ADD CONSTRAINT expenses_title_not_empty
CHECK (length(trim(title)) > 0);


ALTER TABLE expenses
ADD CONSTRAINT expenses_category_not_empty
CHECK (length(trim(category)) > 0);