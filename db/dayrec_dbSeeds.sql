USE dayrec_db;

-- seed users first then everything else

INSERT INTO users (studentName, email, password, isAdmin)
VALUES 
       ("Jody Brzovski", "email4@email.com", "blah", true), --blah--
       ("Jarell Boone", "email@email.com", "blah1", true), --blah1--
       ("Carly Peyton", "email1@email.com", "blah2", true), --blah2--
       ("Dave Jeffers", "email2@email.com", "blah3", true), --blah3--
       ("Javier Cardenas", "email3@email.com", "blah4", true), --blah4--
       ("Jane Doe", "email5@email.com", "blah5", false),
       ("Mike Smith", "email6@email.com", "blah6", true),
       ("John Doe", "email7@email.com", "blah7", true),
       ("Raven Dogg", "email8@email.com", "blah8", true),

INSERT INTO bets (guessRecord, guessShare, awardedCoins, userId)
 VALUES 
       (3, 1, 50, 1),
       (1, 1, 10, 4),
       (2, 0, 90, 5),
       (0, 10, 150, 6),
       (0, 0, 1000, 7),
       (1, 3, 0, 7),
       (7, 4, 1001, 6),
       (0, 0, 5, 8),
       (0, 1, 10, 9),
       (2, 0, 7, 10),
       (1, 1, 50, 11),
       (2, 2, 80, 8),
       (3, 1, 75, 9),
       (1, 3, 20, 10),
       (4, 4, 55, 11),

INSERT INTO recordlogs (actualRecord, actualShare)
VALUES 
       (1, 1),
       (2, 0),
       (8, 10),
