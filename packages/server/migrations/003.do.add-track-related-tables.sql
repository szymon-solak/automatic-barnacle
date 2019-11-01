BEGIN;

  CREATE TABLE IF NOT EXISTS score (
    score_id SERIAL PRIMARY KEY,
    value INTEGER NOT NULL,
    label VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS track (
    track_id SERIAL PRIMARY KEY,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    score_id INTEGER REFERENCES score(score_id)
  );

  CREATE TABLE IF NOT EXISTS note (
    note_id SERIAL PRIMARY KEY,
    text VARCHAR(800),
    track_id INTEGER REFERENCES track(track_id) ON DELETE CASCADE
  );

  INSERT INTO score (value, label) VALUES (1, 'Bad');
  INSERT INTO score (value, label) VALUES (2, 'Mediocre');
  INSERT INTO score (value, label) VALUES (3, 'Good');

COMMIT;
