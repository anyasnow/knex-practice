BEGIN;

    INSERT INTO blogful_articles
        (title, date_published, content)
    VALUES
        ('google', '2016-01-16 12:00:00', 'g'),
        ('thinkful', '2017-01-16 12:00:00', 't'),
        ('facebook', '2018-01-16 12:00:00', 'f'),
        ('pinterest', '2019-01-16 12:00:00', 'p'),
        ('instagram', '2019-03-16 12:00:00', 'i')
    ; 

    COMMIT;