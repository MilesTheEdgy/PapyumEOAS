SELECT transactions.transaction_id, applications.id, applications.product_name,
		transactions.seller, applications.goal, applications.poster_pledge,
		transactions.date, transactions.seller_balance_after, transactions.buyers,
		applications.joiners, applications.joiner_pledges, transactions.buyers_balance_after
FROM applications
INNER JOIN transactions ON applications.transaction_id = transactions.transaction_id
WHERE transactions.seller = 'Başak Eczanesi'
OR transactions.buyers && ARRAY ['Başak Eczanesi']::VARCHAR[]
;



-------------------------------------------------------------------







-- RESETTING BALANCE TO 0
UPDATE users SET balance = 0;

-- DELETTING ALL TRANSACTIONS
DELETE FROM transactions;

-- DELETTING ALL APPLICATIONS
DELETE FROM applications;



-- Adding And Joining applications

-- TEST 1
INSERT INTO applications(product_name, goal, condition, price, poster_pledge, description, final_date, status, date, submitter)
VALUES (
    'PIASCLEDINE 300 MG KAPSUL (30 KAPSUL)--8682162000016',
    115,
    '10+5',
    8.31,
    35,
    'Merhaba Beyler Acil Alım Lütfen',
    '2021-07-29',
    'ON_HOLD', 
    CURRENT_TIMESTAMP, 
    'Hayat Eczanesi'
    )

UPDATE applications SET joiners = array_append(joiners, 'Gül Eczanesi'), joiner_pledges = array_append(joiner_pledges, 15) WHERE submitter = 'Hayat Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'İstanbul Eczanesi'), joiner_pledges = array_append(joiner_pledges, 73) WHERE submitter = 'Hayat Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Başak Eczanesi'), joiner_pledges = array_append(joiner_pledges, 43) WHERE submitter = 'Hayat Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Adem Eczanesi'), joiner_pledges = array_append(joiner_pledges, 36) WHERE submitter = 'Hayat Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Samsun Eczanesi'), joiner_pledges = array_append(joiner_pledges, 22) WHERE submitter = 'Hayat Eczanesi' AND id =;

-- TEST 2
INSERT INTO applications(product_name, goal, condition, price, poster_pledge, description, final_date, status, date, submitter)
VALUES (
    'PIASCLEDINE 300 MG KAPSUL (30 KAPSUL)--8682162000016',
    115,
    '10+5',
    8.31,
    35,
    'Merhaba Beyler Acil Alım Lütfen',
    '2021-07-29',
    'ON_HOLD', 
    CURRENT_TIMESTAMP, 
    'Başak Eczanesi'
    )

UPDATE applications SET joiners = array_append(joiners, 'Gül Eczanesi'), joiner_pledges = array_append(joiner_pledges, 15) WHERE submitter = 'Başak Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'İstanbul Eczanesi'), joiner_pledges = array_append(joiner_pledges, 73) WHERE submitter = 'Başak Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Hayat Eczanesi'), joiner_pledges = array_append(joiner_pledges, 43) WHERE submitter = 'Başak Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Adem Eczanesi'), joiner_pledges = array_append(joiner_pledges, 36) WHERE submitter = 'Başak Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Samsun Eczanesi'), joiner_pledges = array_append(joiner_pledges, 22) WHERE submitter = 'Başak Eczanesi' AND id =;

-- TEST 3
INSERT INTO applications(product_name, goal, condition, price, poster_pledge, description, final_date, status, date, submitter)
VALUES (
    'PIASCLEDINE 300 MG KAPSUL (30 KAPSUL)--8682162000016',
    270,
    '10+5',
    8.31,
    60,
    'Merhaba Beyler Acil Alım Lütfen',
    '2021-07-29',
    'ON_HOLD', 
    CURRENT_TIMESTAMP, 
    'Gül Eczanesi'
    )

UPDATE applications SET joiners = array_append(joiners, 'Samsun Eczanesi'), joiner_pledges = array_append(joiner_pledges, 135) WHERE submitter = 'Gül Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'İstanbul Eczanesi'), joiner_pledges = array_append(joiner_pledges, 24) WHERE submitter = 'Gül Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Adem Eczanesi'), joiner_pledges = array_append(joiner_pledges, 36) WHERE submitter = 'Gül Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Başak Eczanesi'), joiner_pledges = array_append(joiner_pledges, 75) WHERE submitter = 'Gül Eczanesi' AND id =;
UPDATE applications SET joiners = array_append(joiners, 'Hayat Eczanesi'), joiner_pledges = array_append(joiner_pledges, 43) WHERE submitter = 'Gül Eczanesi' AND id =;

-- TEST 4
INSERT INTO applications(product_name, goal, condition, price, poster_pledge, description, final_date, status, date, submitter)
VALUES (
    'PIASCLEDINE 300 MG KAPSUL (30 KAPSUL)--8682162000016',
    130,
    '10+5',
    4.78,
    60,
    'Merhaba Beyler Acil Alım Lütfen',
    '2021-07-29',
    'ON_HOLD', 
    CURRENT_TIMESTAMP, 
    'Başak Eczanesi'
    )

UPDATE applications SET joiners = array_append(joiners, 'Hayat Eczanesi'), joiner_pledges = array_append(joiner_pledges, 43) WHERE submitter = 'Başak Eczanesi' AND id = ;
UPDATE applications SET joiners = array_append(joiners, 'İstanbul Eczanesi'), joiner_pledges = array_append(joiner_pledges, 24) WHERE submitter = 'Başak Eczanesi' id = ;
UPDATE applications SET joiners = array_append(joiners, 'Gül Eczanesi'), joiner_pledges = array_append(joiner_pledges, 75) WHERE submitter = 'Başak Eczanesi' AND id = ;
UPDATE applications SET joiners = array_append(joiners, 'Samsun Eczanesi'), joiner_pledges = array_append(joiner_pledges, 41) WHERE submitter = 'Başak Eczanesi' AND id = ;
UPDATE applications SET joiners = array_append(joiners, 'Adem Eczanesi'), joiner_pledges = array_append(joiner_pledges, 29) WHERE submitter = 'Başak Eczanesi' AND id = ;