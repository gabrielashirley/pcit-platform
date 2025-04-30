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
  ('JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', 'Dr. Sarah Johnson', 'sarah.johnson@pcit.com', true, null, NOW() - INTERVAL '30 days', NOW(), 'clinician', false);

-- Create account with password (password is 'testtest')
INSERT INTO accounts (id, account_id, provider_id, user_id, password, created_at, updated_at)
VALUES 
  ('Bu76L8mIMu7yeXZWyxdGIKOE1aefG3hr', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', 'credential', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz', '125fbf9fc0f50953ed992ac096e56df6:dbf3d6247189858d6eccf35c7f39695ea55e0642bb25a2885e1ef8dfba95bd46eed5ef207aa1ebca6e3c67b1b068807f80f1e6e9ad9d3b8ae567df3107f80329', NOW() - INTERVAL '30 days', NOW());

-- Create caregivers
INSERT INTO caregivers (id, name, user_id)
VALUES 
  -- Main caregiver with many sessions
  ('7ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Emily Davis', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz'),
  -- Additional caregivers
  ('8ba7b810-9dad-11d1-80b4-00c04fd430c8', 'James Wilson', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz'),
  ('9ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Lisa Thompson', 'JxSvU5p2VNobbcuEVJDxmuuqNkMFTEOz');

-- Create special times (focusing on Emily Davis with many sessions)
INSERT INTO specialtimes (id, completed, created_at, updated_at, toys, praise, reflect, describe, question, command, criticism, negative_talk, duration, caregiversid)
VALUES 
  -- Emily Davis's sessions (many sessions with varying metrics)
  ('1ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days', 'blocks, cars, dolls', 5, 3, 4, 2, 1, 0, 0, 15.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('2ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days', 'puzzles, books, crayons', 6, 4, 5, 1, 0, 0, 0, 18.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('3ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days', 'playdough, animals', 7, 5, 6, 2, 1, 0, 0, 20.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('4ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '19 days', NOW() - INTERVAL '19 days', 'lego, action figures', 8, 6, 7, 1, 0, 0, 0, 22.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('5ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days', 'board games, cards', 7, 5, 6, 2, 1, 0, 0, 19.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days', 'art supplies, musical instruments', 9, 7, 8, 1, 0, 0, 0, 24.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('7ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', 'dress-up clothes, puppets', 8, 6, 7, 2, 1, 0, 0, 21.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('8ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', 'blocks, cars, dolls', 9, 7, 8, 1, 0, 0, 0, 23.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('9ba7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', 'puzzles, books', 10, 8, 9, 2, 1, 0, 0, 25.0, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('0ca7b810-9dad-11d1-80b4-00c04fd430c8', false, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', 'playdough, animals', 8, 6, 7, 1, 0, 0, 0, 20.5, '7ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  
  -- James Wilson's sessions (fewer sessions)
  ('1ca7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', 'lego, action figures', 6, 4, 5, 2, 1, 0, 0, 16.0, '8ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('2ca7b810-9dad-11d1-80b4-00c04fd430c8', false, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', 'board games, cards', 5, 3, 4, 1, 0, 0, 0, 14.0, '8ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  
  -- Lisa Thompson's sessions (fewer sessions)
  ('3ca7b810-9dad-11d1-80b4-00c04fd430c8', true, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days', 'art supplies, musical instruments', 7, 5, 6, 2, 1, 0, 0, 18.0, '9ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  ('4ca7b810-9dad-11d1-80b4-00c04fd430c8', false, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'dress-up clothes, puppets', 6, 4, 5, 1, 0, 0, 0, 15.5, '9ba7b810-9dad-11d1-80b4-00c04fd430c8');

-- Create utterances (focusing on Emily Davis's sessions)
INSERT INTO utterances (id, session_id, child_utterance, parent_utterance, skillcode, timestamp)
VALUES 
  -- Emily Davis's utterances (many utterances across sessions)
  ('1da7b810-9dad-11d1-80b4-00c04fd430c8', '1ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Look at my tower!', 'That''s a great tower you built!', 'LP', NOW() - INTERVAL '28 days'),
  ('2da7b810-9dad-11d1-80b4-00c04fd430c8', '1ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I want the red one', 'I see you''re using the red block', 'R', NOW() - INTERVAL '28 days'),
  ('3da7b810-9dad-11d1-80b4-00c04fd430c8', '2ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Can we play with the blocks?', 'Yes, let''s play with the blocks together', 'BD', NOW() - INTERVAL '25 days'),
  ('4da7b810-9dad-11d1-80b4-00c04fd430c8', '2ba7b810-9dad-11d1-80b4-00c04fd430c8', 'This is fun!', 'You''re doing a great job!', 'LP', NOW() - INTERVAL '25 days'),
  ('5da7b810-9dad-11d1-80b4-00c04fd430c8', '3ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I made a house', 'Tell me about what you''re building', 'Q', NOW() - INTERVAL '22 days'),
  ('6da7b810-9dad-11d1-80b4-00c04fd430c8', '3ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Where''s the blue car?', 'I like how you''re playing with the cars', 'R', NOW() - INTERVAL '22 days'),
  ('7da7b810-9dad-11d1-80b4-00c04fd430c8', '4ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I like this game', 'You''re being very creative', 'LP', NOW() - INTERVAL '19 days'),
  ('8da7b810-9dad-11d1-80b4-00c04fd430c8', '4ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Can you help me?', 'I''m here to help you', 'BD', NOW() - INTERVAL '19 days'),
  ('9da7b810-9dad-11d1-80b4-00c04fd430c8', '5ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I''m building a castle', 'Your castle looks amazing', 'LP', NOW() - INTERVAL '16 days'),
  ('0ea7b810-9dad-11d1-80b4-00c04fd430c8', '5ba7b810-9dad-11d1-80b4-00c04fd430c8', 'This is my favorite toy', 'I love playing with you', 'LP', NOW() - INTERVAL '16 days'),
  ('1ea7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Look at my painting!', 'You''re very artistic', 'LP', NOW() - INTERVAL '13 days'),
  ('2ea7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Can I use the red paint?', 'I see you want to use the red paint', 'R', NOW() - INTERVAL '13 days'),
  ('3ea7b810-9dad-11d1-80b4-00c04fd430c8', '7ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I want to be a princess', 'You make a beautiful princess', 'LP', NOW() - INTERVAL '10 days'),
  ('4ea7b810-9dad-11d1-80b4-00c04fd430c8', '7ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Can you help me with the crown?', 'I''ll help you put on the crown', 'BD', NOW() - INTERVAL '10 days'),
  ('5ea7b810-9dad-11d1-80b4-00c04fd430c8', '8ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I made a big tower', 'That''s a very tall tower!', 'LP', NOW() - INTERVAL '7 days'),
  ('6ea7b810-9dad-11d1-80b4-00c04fd430c8', '8ba7b810-9dad-11d1-80b4-00c04fd430c8', 'The car goes fast', 'You''re making the car go very fast', 'R', NOW() - INTERVAL '7 days'),
  ('7ea7b810-9dad-11d1-80b4-00c04fd430c8', '9ba7b810-9dad-11d1-80b4-00c04fd430c8', 'This puzzle is hard', 'You''re working hard on that puzzle', 'R', NOW() - INTERVAL '4 days'),
  ('8ea7b810-9dad-11d1-80b4-00c04fd430c8', '9ba7b810-9dad-11d1-80b4-00c04fd430c8', 'I need help', 'I''ll help you with the puzzle', 'BD', NOW() - INTERVAL '4 days'),
  ('9ea7b810-9dad-11d1-80b4-00c04fd430c8', '0ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I made a snake', 'That''s a long snake you made', 'LP', NOW() - INTERVAL '1 day'),
  ('0fa7b810-9dad-11d1-80b4-00c04fd430c8', '0ca7b810-9dad-11d1-80b4-00c04fd430c8', 'The animals are friends', 'You''re making the animals play together', 'R', NOW() - INTERVAL '1 day'),
  
  -- James Wilson's utterances
  ('1fa7b810-9dad-11d1-80b4-00c04fd430c8', '1ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I built a house', 'You built a nice house with the blocks', 'LP', NOW() - INTERVAL '20 days'),
  ('2fa7b810-9dad-11d1-80b4-00c04fd430c8', '1ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Can we make it bigger?', 'Yes, let''s make the house bigger', 'BD', NOW() - INTERVAL '20 days'),
  ('3fa7b810-9dad-11d1-80b4-00c04fd430c8', '2ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I won the game!', 'You played the game very well', 'LP', NOW() - INTERVAL '5 days'),
  ('4fa7b810-9dad-11d1-80b4-00c04fd430c8', '2ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Can we play again?', 'Yes, we can play another game', 'BD', NOW() - INTERVAL '5 days'),
  
  -- Lisa Thompson's utterances
  ('5fa7b810-9dad-11d1-80b4-00c04fd430c8', '3ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I like the drums', 'You''re making great music', 'LP', NOW() - INTERVAL '15 days'),
  ('6fa7b810-9dad-11d1-80b4-00c04fd430c8', '3ca7b810-9dad-11d1-80b4-00c04fd430c8', 'Can you play with me?', 'I''d love to play music with you', 'BD', NOW() - INTERVAL '15 days'),
  ('7fa7b810-9dad-11d1-80b4-00c04fd430c8', '4ca7b810-9dad-11d1-80b4-00c04fd430c8', 'I''m a princess', 'You make a beautiful princess', 'LP', NOW() - INTERVAL '3 days'),
  ('8fa7b810-9dad-11d1-80b4-00c04fd430c8', '4ca7b810-9dad-11d1-80b4-00c04fd430c8', 'The crown is pretty', 'You look lovely in that crown', 'R', NOW() - INTERVAL '3 days'); 