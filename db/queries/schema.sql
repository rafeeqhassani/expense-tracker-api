CREATE TABLE expenses (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  recurring TEXT DEFAULT 'none',
  last_generated_date TEXT DEFAULT '',
  recurring_id UUID,
 deleted BOOLEAN DEFAULT false
);

CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id UUID NOT NULL UNIQUE,
 monthly_limit NUMERIC(10,2) NOT NULL DEFAULT 0,
 category_limits JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);