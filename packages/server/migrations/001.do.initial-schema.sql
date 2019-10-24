CREATE TABLE IF NOT EXISTS app_user (
  user_id SERIAL PRIMARY KEY,
  display_name VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255)
)

