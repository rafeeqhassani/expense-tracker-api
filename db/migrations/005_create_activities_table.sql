CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  type TEXT NOT NULL,

  message TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);