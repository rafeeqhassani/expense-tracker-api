ALTER TABLE activities
ADD COLUMN user_id UUID;

ALTER TABLE activities
ADD CONSTRAINT activities_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES users(id);

CREATE INDEX idx_activities_user_id
ON activities(user_id);