-- RESETTING BALANCE TO 0
UPDATE users SET balance = 0;

-- DELETTING ALL TRANSACTIONS
DELETE FROM transactions;

-- DELETTING ALL APPLICATIONS
DELETE FROM applications;



-- Adding applications
INSERT INTO applications(product_name, goal, condition, price, poster_pledge, description, final_date, status, date, submitter)
VALUES (
    'PIASCLEDINE 300 MG KAPSUL (30 KAPSUL)--8682162000016',
    115,
    10+5,
    13.71,
    35,
    'Merhaba Beyler Acil Alım Lütfen',
    '2021-07-29',
    'ON_HOLD', 
    CURRENT_TIMESTAMP, 
    'Hayat Eczanesi'
    )

--JOINING APPLICATION

UPDATE applications SET joiners = array_append(joiners, 'Gül Eczanesi'), joiner_pledges = array_append(joiner_pledges, 45) WHERE submitter = 'Hayat Eczanesi';
UPDATE applications SET joiners = array_append(joiners, 'İstanbul Eczanesi'), joiner_pledges = array_append(joiner_pledges, 72) WHERE submitter = 'Hayat Eczanesi';
UPDATE applications SET joiners = array_append(joiners, 'Başak Eczanesi'), joiner_pledges = array_append(joiner_pledges, 20) WHERE submitter = 'Hayat Eczanesi';
UPDATE applications SET joiners = array_append(joiners, 'Adem Eczanesi'), joiner_pledges = array_append(joiner_pledges, 36) WHERE submitter = 'Hayat Eczanesi';
UPDATE applications SET joiners = array_append(joiners, 'Samsun Eczanesi'), joiner_pledges = array_append(joiner_pledges, 104) WHERE submitter = 'Hayat Eczanesi';