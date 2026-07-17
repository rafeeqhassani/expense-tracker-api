CREATE TABLE expenses (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  recurring TEXT DEFAULT 'none',
  last_generated_date TEXT DEFAULT '',
  deleted BOOLEAN DEFAULT false
);