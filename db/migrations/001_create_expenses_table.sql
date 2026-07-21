CREATE TABLE IF NOT EXISTS expenses (
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