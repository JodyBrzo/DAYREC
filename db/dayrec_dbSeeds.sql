USE dayrec_db;

-- seed users first then everything else

INSERT INTO users (studentName, email, password, isAdmin)
VALUES 
       ("Jody Brzovski", "email4@email.com", "$2a$10$rrCvSWi9EjdzJBGrG28RgeNIne3kMNCwoLEbcE5zbRcGyW7AFfiEy", true), --blah--
       ("Jarell Boone", "email@email.com", "$2a$10$yQ2QFHt3LJKMkP1mmIxZOe4XQ1IOz.PnOG3NaD3f9mHx5JKY6lTOq", true), --blah1--
       ("Carly Peyton", "email1@email.com", "$2a$10$I.z7vHr4vmVEWVvrrcNA...G3YpMt/I4Rd/s5RgZXzhbuJ8Hno7.S", true), --blah2--
       ("Dave Jeffers", "email2@email.com", "$2a$10$peFNzT/UZvNG.9oB5q2dBuc1WJ9oKHxsD13G281IWTtjoyRYgRAvi", true), --blah3--
       ("Javier Cardenas", "email3@email.com", "$2a$10$onAFnTLqaRdUsSJbgborle6oplJbsmSIrvQAZ6k9VCU9UWLdcB9p.", true), --blah4--
       ("Jane Doe", "email5@email.com", "$2a$10$B.jpz83ZD1yThs3LvkKjBurzN00uuCIl5JpxpEtr8m9EEwwpUGB0u", false),  --blah5
       ("Mike Smith", "email6@email.com", "$2a$10$GwDfyldmhQsMdexc0D7d2OWBijoxTLRHEgUtUb/xWK.DmX.SKWTzO", true),--blah6
       ("John Doe", "email7@email.com", "$2a$10$q5fgPSnyeHbgEpjxGofeduYVqdZR6cLsMTf2N6NVHLz0NA0rNsEFO", true),--blah7
       ("Raven Dogg", "email8@email.com", "$2a$10$MmQ8/OhbdH3XnWqwhQz/vuxcO/gRbwDC3UndNjde91OKH0wNpbTVS", true),--blah8

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
