-- Clean up existing data
DELETE FROM utterances;
DELETE FROM specialtimes;
DELETE FROM caregivers;
DELETE FROM sessions;
DELETE FROM accounts;
DELETE FROM verifications;
DELETE FROM users;

-- Create test clinician
INSERT INTO users (id, name, email, email_verified, image, created_at, updated_at, role, banned)
VALUES 
  ('JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', 'Dr. Sarah Johnson', 'sarah.johnson@pcit.com', true, null, NOW() - INTERVAL '30 days', NOW(), 'clinician', false),
  ('KxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', 'Dr. Michael Brown', 'michael.brown@pcit.com', true, null, NOW() - INTERVAL '30 days', NOW(), 'clinician', false);

-- Create account with password (password is 'testtest')
INSERT INTO accounts (id, account_id, provider_id, user_id, password, created_at, updated_at)
VALUES 
  ('Bu76L8mIMu7yeXZWyxdGIKOE1aefG3hr', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', 'credential', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', '125fbf9fc0f50953ed992ac096e56df6:dbf3d6247189858d6eccf35c7f39695ea55e0642bb25a2885e1ef8dfba95bd46eed5ef207aa1ebca6e3c67b1b068807f80f1e6e9ad9d3b8ae567df3107f80329', NOW() - INTERVAL '30 days', NOW()),
  ('Cu76L8mIMu7yeXZWyxdGIKOE1aefG3hr', 'KxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', 'credential', 'KxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', '125fbf9fc0f50953ed992ac096e56df6:dbf3d6247189858d6eccf35c7f39695ea55e0642bb25a2885e1ef8dfba95bd46eed5ef207aa1ebca6e3c67b1b068807f80f1e6e9ad9d3b8ae567df3107f80329', NOW() - INTERVAL '30 days', NOW());

-- Create caregivers
INSERT INTO caregivers (id, name, user_id)
VALUES 
  -- Main caregiver with many sessions
  ('7ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Emily Davis', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz'),
  -- Additional caregivers
  ('8ba7b810-9dad-11d1-80b4-00c04fd430c8', 'James Wilson', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz'),
  ('9ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Lisa Thompson', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz'),
  -- Dr. Brown's caregivers
  ('1ca7b810-9dad-11d1-80b4-00c04fd430c8', 'David Miller', 'KxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz'),
  ('2ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Jennifer Lee', 'KxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz');

-- Create special times (focusing on Emily Davis with many sessions)
INSERT INTO specialtimes (id, completed, created_at, updated_at, toys, praise, reflect, describe, question, command, criticism, negative_talk, duration, caregiversid)
VALUES 
  -- Emily Davis's sessions (many sessions with varying metrics)
  ('1ba7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-01 10:00:00', '2025-05-01 10:15:00', 'blocks, cars, dolls', 5, 3, 4, 2, 1, 0, 0, 15.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('2ba7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-02 14:00:00', '2025-05-02 14:18:00', 'puzzles, books, crayons', 6, 4, 5, 1, 0, 0, 0, 18.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('3ba7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-03 11:00:00', '2025-05-03 11:20:00', 'playdough, animals', 7, 5, 6, 2, 1, 0, 0, 20.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('4ba7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-04 15:00:00', '2025-05-04 15:22:00', 'lego, action figures', 8, 6, 7, 1, 0, 0, 0, 22.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('5ba7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-05 09:00:00', '2025-05-05 09:19:30', 'board games, cards', 7, 5, 6, 2, 1, 0, 0, 19.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', false, '2025-05-06 13:00:00', '2025-05-06 13:24:00', 'art supplies, musical instruments', 9, 7, 8, 1, 0, 0, 0, 24.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('7ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', 'dress-up clothes, puppets', 8, 6, 7, 2, 1, 0, 0, 21.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('8ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', 'blocks, cars, dolls', 9, 7, 8, 1, 0, 0, 0, 23.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('9ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', 'puzzles, books', 10, 8, 9, 2, 1, 0, 0, 25.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('0ca7b810-9dad-11d1-80b4-00c04fd430c8', false, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', 'playdough, animals', 8, 6, 7, 1, 0, 0, 0, 20.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  
  -- James Wilson's sessions (fewer sessions)
  ('1ca7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-02 10:00:00', '2025-05-02 10:16:00', 'lego, action figures', 6, 4, 5, 2, 1, 0, 0, 16.0, '8ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('2ca7b810-9dad-11d1-80b4-00c04fd430c8', false, '2025-05-06 14:00:00', '2025-05-06 14:14:00', 'board games, cards', 5, 3, 4, 1, 0, 0, 0, 14.0, '8ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  
  -- Lisa Thompson's sessions (fewer sessions)
  ('3ca7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-03 15:00:00', '2025-05-03 15:18:00', 'art supplies, musical instruments', 7, 5, 6, 2, 1, 0, 0, 18.0, '9ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('4ca7b810-9dad-11d1-80b4-00c04fd430c8', false, '2025-05-06 11:00:00', '2025-05-06 11:15:30', 'dress-up clothes, puppets', 6, 4, 5, 1, 0, 0, 0, 15.5, '9ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  
  -- Dr. Brown's caregivers sessions
  ('5ca7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-01 14:00:00', '2025-05-01 14:18:00', 'blocks, cars', 7, 5, 6, 2, 1, 0, 0, 18.0, '1ca7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('6ca7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-03 10:00:00', '2025-05-03 10:20:00', 'puzzles, books', 8, 6, 7, 1, 0, 0, 0, 20.0, '1ca7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('7ca7b810-9dad-11d1-80b4-00c04fd430c8', true, '2025-05-05 13:00:00', '2025-05-05 13:16:00', 'playdough, animals', 6, 4, 5, 2, 1, 0, 0, 16.0, '2ca7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('8ca7b810-9dad-11d1-80b4-00c04fd430c8', false, '2025-05-06 15:00:00', '2025-05-06 15:19:00', 'lego, action figures', 7, 5, 6, 1, 0, 0, 0, 19.0, '2ca7b810-9dad-11d1-80b4-00c04fd430c8');

-- Create utterances (focusing on Emily Davis's sessions)
INSERT INTO utterances (id, specialtimesid, child_utterance, parent_utterance, utterance_type, created_at)
VALUES 
  -- Emily Davis's utterances
  ('1da7b810-9dad-11d1-80b4-00c04fd430c8', '1ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I built a tower', 'That''s a tall tower you built', 'LP', '2025-05-01 10:00:00'),
  ('2da7b810-9dad-11d1-80b4-00c04fd430c8', '1ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Can we play with cars?', 'Yes, let''s play with the cars', 'BD', '2025-05-01 10:05:00'),
  ('3da7b810-9dad-11d1-80b4-00c04fd430c8', '2ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I like puzzles', 'You''re good at solving puzzles', 'LP', '2025-05-02 14:00:00'),
  ('4da7b810-9dad-11d1-80b4-00c04fd430c8', '2ba7b810-9dad-11d1-80b4-00c04fd430c8', 'This piece fits here', 'You found the right place for that piece', 'R', '2025-05-02 14:10:00'),
  ('5da7b810-9dad-11d1-80b4-00c04fd430c8', '3ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I made a snake', 'That''s a long snake you made', 'LP', '2025-05-03 11:00:00'),
  ('6da7b810-9dad-11d1-80b4-00c04fd430c8', '3ba7b810-9dad-11d1-80b4-00c04fd430c8', 'The animals are friends', 'You''re making the animals play together', 'R', '2025-05-03 11:10:00'),
  ('7da7b810-9dad-11d1-80b4-00c04fd430c8', '4ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I built a house', 'You built a nice house with the blocks', 'LP', '2025-05-04 15:00:00'),
  ('8da7b810-9dad-11d1-80b4-00c04fd430c8', '4ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Can we make it bigger?', 'Yes, let''s make the house bigger', 'BD', '2025-05-04 15:15:00'),
  ('9da7b810-9dad-11d1-80b4-00c04fd430c8', '5ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I won the game', 'You played that game really well', 'LP', '2025-05-05 09:00:00'),
  ('ada7b810-9dad-11d1-80b4-00c04fd430c8', '5ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Let''s play again', 'Sure, let''s play another round', 'BD', '2025-05-05 09:10:00'),
  ('bda7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I painted a rainbow', 'That''s a beautiful rainbow you painted', 'LP', '2025-05-06 13:00:00'),
  ('cda7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Can I play the drum?', 'Yes, you can play the drum', 'BD', '2025-05-06 13:15:00'),
  
  -- James Wilson's utterances
  ('dda7b810-9dad-11d1-80b4-00c04fd430c8', '1ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I built a spaceship', 'That''s an amazing spaceship', 'LP', '2025-05-02 10:00:00'),
  ('eda7b810-9dad-11d1-80b4-00c04fd430c8', '1ca7b810-9dad-11d1-80b4-00c04fd430c8', 'It can fly to the moon', 'Your spaceship can fly very high', 'R', '2025-05-02 10:08:00'),
  ('fda7b810-9dad-11d1-80b4-00c04fd430c8', '2ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I want to play cards', 'Let''s play a card game together', 'BD', '2025-05-06 14:00:00'),
  ('0ea7b810-9dad-11d1-80b4-00c04fd430c8', '2ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I won the game', 'You played that game really well', 'LP', '2025-05-06 14:07:00'),
  
  -- Lisa Thompson's utterances
  ('1ea7b810-9dad-11d1-80b4-00c04fd430c8', '3ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I made a picture', 'That''s a beautiful picture you made', 'LP', '2025-05-03 15:00:00'),
  ('2ea7b810-9dad-11d1-80b4-00c04fd430c8', '3ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Can I use more colors?', 'Yes, you can use all the colors you want', 'BD', '2025-05-03 15:10:00'),
  ('3ea7b810-9dad-11d1-80b4-00c04fd430c8', '4ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I''m a princess', 'You look beautiful in your princess dress', 'LP', '2025-05-06 11:00:00'),
  ('4ea7b810-9dad-11d1-80b4-00c04fd430c8', '4ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Let''s have a tea party', 'That''s a great idea for a tea party', 'R', '2025-05-06 11:08:00'),
  
  -- Dr. Brown's caregivers utterances
  ('5ea7b810-9dad-11d1-80b4-00c04fd430c8', '5ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I built a tower', 'That''s a tall tower you built', 'LP', '2025-05-01 14:00:00'),
  ('6ea7b810-9dad-11d1-80b4-00c04fd430c8', '5ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Can we play with cars?', 'Yes, let''s play with the cars', 'BD', '2025-05-01 14:10:00'),
  ('7ea7b810-9dad-11d1-80b4-00c04fd430c8', '6ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I like puzzles', 'You''re good at solving puzzles', 'LP', '2025-05-03 10:00:00'),
  ('8ea7b810-9dad-11d1-80b4-00c04fd430c8', '6ca7b810-9dad-11d1-80b4-00c04fd430c8', 'This piece fits here', 'You found the right place for that piece', 'R', '2025-05-03 10:12:00'),
  ('9ea7b810-9dad-11d1-80b4-00c04fd430c8', '7ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I made a snake', 'That''s a long snake you made', 'LP', '2025-05-05 13:00:00'),
  ('afa7b810-9dad-11d1-80b4-00c04fd430c8', '7ca7b810-9dad-11d1-80b4-00c04fd430c8', 'The animals are friends', 'You''re making the animals play together', 'R', '2025-05-05 13:08:00'),
  ('bfa7b810-9dad-11d1-80b4-00c04fd430c8', '8ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I built a house', 'You built a nice house with the blocks', 'LP', '2025-05-06 15:00:00'),
  ('cfa7b810-9dad-11d1-80b4-00c04fd430c8', '8ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Can we make it bigger?', 'Yes, let''s make the house bigger', 'BD', '2025-05-06 15:12:00');