const express = require("express");
const dotenv = require('dotenv');
const pool = require("./db")
const bcrypt = require("bcrypt")
const app = express();
const PORT = process.env.PORT || 3001;
const { verifyNewBid, createNewBid } = require("./bids/bids")
const { generateAccessToken, authenticateToken } = require("./token/token")

dotenv.config();
process.env.TOKEN_SECRET;

app.use(express.json());

////////////////////////////////////////
// ******** LOGIN AND AUTH ********** //
////////////////////////////////////////

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = await pool.query('SELECT id, username, hash, balance, pharmacy_name FROM users WHERE username = $1;', [username])
    if (username === query.rows[0].username) {
      bcrypt.compare(password, query.rows[0].hash, function(err, result) {
        if (err) {
          return res.status(401).json("not authorized")
        } else if (result) {
          const token = generateAccessToken({
            username: req.body.username,
            eczaneName: query.rows[0].pharmacy_name,
            ID: query.rows[0].id,
            role : "eczane"
          });
          res.status(200).json({
            username,
            eczaneName: `${query.rows[0].pharmacy_name} Eczanesi`,
            ID: 1,
            bakiye: query.rows[0].balance,
            token
          });
        }
      });  
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json("server error when logging in...")
  }
})

app.post('/api', authenticateToken, async (req, res) => {
  try {
    const { username, eczaneName , ID } = req.user
    const query = await pool.query("SELECT balance FROM users WHERE pharmacy_name = $1;", [eczaneName])
    res.status(200).json({username, eczaneName, ID, bakiye: query.rows[0].balance});
  } catch (error) {
    console.log(error);
    res.status(500).json("server error occurred when fetching data from api")
  }
})

////////////////////////////////////////
// ************ TABLES ************** //
////////////////////////////////////////
app.get('/api/data/table/tum', authenticateToken, async (req, res) => {
  // tum teklifler
  try {
    const query = await pool.query("SELECT * FROM applications;")
    // console.log(query.rows);
    let arr = query.rows
    let joinerArr = []
    // console.log('original unmodifed array is: ', arr)
    for (let i = 0; i < arr.length; i++) {
      // console.log('I loop number: ', i )
      if (arr[i].joiners && arr[i].joiner_pledges) {
        // console.log('arr[i].joiners is true, exectuing J loop...')
        for (let j = 0; j < arr[i].joiners.length; j++) {
          // console.log("taking these values: ", arr[i].joiners[j], "and storing them in an obj in an arr joinerArr");
          joinerArr = [
            ...joinerArr,
              {
                name: arr[i].joiners[j],
                pledge: arr[i].joiner_pledges[j]
              }
          ]
        }
        // console.log('assiging the joinerArr to the original arr accoring to I loop', i, "index")
        Object.assign(arr[i], {joiners: joinerArr})
      }
      joinerArr = []
      // console.log('modifed arr index is: ', arr[i]);
      // console.log('finished I loop number: ', i)
    }
    // console.log('arr1 is: ', arr[1])
    // console.log('arr2 is: ', arr[2])
    let arr2 = arr.map(obj => {
      if (obj.joiners) {
        return {
          id: obj.id,
          product_name: obj.product_name,
          goal: obj.goal,
          condition: obj.condition,
          price: obj.price,
          poster_pledge: obj.poster_pledge,
          description: obj.description,
          status: obj.status,
          date: obj.date,
          submitter: obj.submitter,
          final_date: obj.final_date,
          joiners: obj.joiners,
        }
      } else {
        return {
          id: obj.id,
          product_name: obj.product_name,
          goal: obj.goal,
          condition: obj.condition,
          price: obj.price,
          poster_pledge: obj.poster_pledge,
          description: obj.description,
          status: obj.status,
          date: obj.date,
          submitter: obj.submitter,
          final_date: obj.final_date,
          joiners: obj.joiners,
          joiner_pledges: obj.joiner_pledges
        }
      }
    })
    res.status(200).json(arr)
    
  } catch (error) {
    console.log(error);  
    res.status(500).json("server error")
  }
})

app.get('/api/data/table/bekleyen', authenticateToken, async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM applications WHERE status = 'ON_HOLD';")
    // console.log(query.rows);
    let arr = query.rows
    let joinerArr = []
    // console.log('original unmodifed array is: ', arr)
    for (let i = 0; i < arr.length; i++) {
      // console.log('I loop number: ', i )
      if (arr[i].joiners && arr[i].joiner_pledges) {
        // console.log('arr[i].joiners is true, exectuing J loop...')
        for (let j = 0; j < arr[i].joiners.length; j++) {
          // console.log("taking these values: ", arr[i].joiners[j], "and storing them in an obj in an arr joinerArr");
          joinerArr = [
            ...joinerArr,
              {
                name: arr[i].joiners[j],
                pledge: arr[i].joiner_pledges[j]
              }
          ]
        }
        // console.log('assiging the joinerArr to the original arr accoring to I loop', i, "index")
        Object.assign(arr[i], {joiners: joinerArr})
      }
      joinerArr = []
      // console.log('modifed arr index is: ', arr[i]);
      // console.log('finished I loop number: ', i)
    }
    // console.log('arr1 is: ', arr[1])
    // console.log('arr2 is: ', arr[2])
    let arr2 = arr.map(obj => {
      if (obj.joiners) {
        return {
          id: obj.id,
          product_name: obj.product_name,
          goal: obj.goal,
          condition: obj.condition,
          price: obj.price,
          poster_pledge: obj.poster_pledge,
          description: obj.description,
          status: obj.status,
          date: obj.date,
          submitter: obj.submitter,
          final_date: obj.final_date,
          joiners: obj.joiners,
        }
      } else {
        return {
          id: obj.id,
          product_name: obj.product_name,
          goal: obj.goal,
          condition: obj.condition,
          price: obj.price,
          poster_pledge: obj.poster_pledge,
          description: obj.description,
          status: obj.status,
          date: obj.date,
          submitter: obj.submitter,
          final_date: obj.final_date,
          joiners: obj.joiners,
          joiner_pledges: obj.joiner_pledges
        }
      }
    })
    res.status(200).json(arr)
    
  } catch (error) {
    console.log(error);  
    res.status(500).json("server error")
  }})

  app.get('/api/data/table/sizin', authenticateToken, async (req, res) => {
    try {
      const query = await pool.query("SELECT * FROM applications WHERE submitter = $1;", [req.user.eczaneName])
      // console.log(query.rows);
      let arr = query.rows
      let joinerArr = []
      // console.log('original unmodifed array is: ', arr)
      for (let i = 0; i < arr.length; i++) {
        // console.log('I loop number: ', i )
        if (arr[i].joiners && arr[i].joiner_pledges) {
          // console.log('arr[i].joiners is true, exectuing J loop...')
          for (let j = 0; j < arr[i].joiners.length; j++) {
            // console.log("taking these values: ", arr[i].joiners[j], "and storing them in an obj in an arr joinerArr");
            joinerArr = [
              ...joinerArr,
                {
                  name: arr[i].joiners[j],
                  pledge: arr[i].joiner_pledges[j]
                }
            ]
          }
          // console.log('assiging the joinerArr to the original arr accoring to I loop', i, "index")
          Object.assign(arr[i], {joiners: joinerArr})
        }
        joinerArr = []
        // console.log('modifed arr index is: ', arr[i]);
        // console.log('finished I loop number: ', i)
      }
      // console.log('arr1 is: ', arr[1])
      // console.log('arr2 is: ', arr[2])
      let arr2 = arr.map(obj => {
        if (obj.joiners) {
          return {
            id: obj.id,
            product_name: obj.product_name,
            goal: obj.goal,
            condition: obj.condition,
            price: obj.price,
            poster_pledge: obj.poster_pledge,
            description: obj.description,
            status: obj.status,
            date: obj.date,
            submitter: obj.submitter,
            final_date: obj.final_date,
            joiners: obj.joiners,
          }
        } else {
          return {
            id: obj.id,
            product_name: obj.product_name,
            goal: obj.goal,
            condition: obj.condition,
            price: obj.price,
            poster_pledge: obj.poster_pledge,
            description: obj.description,
            status: obj.status,
            date: obj.date,
            submitter: obj.submitter,
            final_date: obj.final_date,
            joiners: obj.joiners,
            joiner_pledges: obj.joiner_pledges
          }
        }
      })
      res.status(200).json(arr)
      
    } catch (error) {
      console.log(error);  
      res.status(500).json("server error")
    }})

////////////////////////////////////////
// ************ PRODUCTS ************** //
////////////////////////////////////////

//-- get ALL products for medicine search route
app.get('/api/data/products', async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM products")
    // for (const element of query.rows) {
    //   const d = new Date(element.date)
    //   element.date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    // }
    res.status(200).json(query.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json("server errror")
  }
})

//-- get specific products for new application route
app.post('/api/data/products', authenticateToken, async (req, res) => {
  try {
    const { input } = req.body
    const result = Number(input)
    let query
    if (Number.isNaN(result)) {
      // console.log('fetching according to medicine name')
      query = await pool.query("SELECT medicine, barcode FROM products WHERE medicine LIKE '%' || $1 || '%';", [input.toUpperCase()])
    } else if (!Number.isNaN(result)) {
      // console.log('fetching according to barcode number')
      query = await pool.query("SELECT medicine, barcode FROM products WHERE barcode::text LIKE '%' || $1 || '%';", [input])
    }
    if (query.rows.length == 0) {
      res.status(404).json("your search inquiry was not found")
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json("server errror")
  }
})


app.post('/api/bid/new', authenticateToken, verifyNewBid, async (req, res) => {
  try {
    const { body, user } = req
    const insertNewBid = await createNewBid(body, user)
    if (insertNewBid) {
      res.status(200).json("Application was sent successfully")
    } else {
      res.status(500).json("Server error")
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error")
  }
})

app.post('/api/bid/approve', authenticateToken, async (req, res) => {

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    function setBuyerSellerValues(selectedUsers, joiners, joiner_pledges, price) {
      let joinersArray = [];
      let pledgesArray = [];
      let pledgesTotal = 0
      // console.log("verifying array: ", selectedUsers, " against: ", joiners)
      for (let i = 0; i < joiners.length; i++) {
        // console.log("A loop: ", i)
        for (let j = 0; j < selectedUsers.length; j++) {
          // console.log("------ B loop: ", j)
          if (selectedUsers[j] === joiners[i]) {
            // console.log('------ MATCH: ', selectedUsers[j], " is equal to: ", joiners[i])
            // console.log("pushing the values", selectedUsers[j], " and ", joiner_pledges[i])
            // joinersArray.push([selectedUsers[j], joiner_pledges[i]])
            joinersArray.push(selectedUsers[j])
            pledgesArray.push(joiner_pledges[i] * price)
            pledgesTotal = pledgesTotal + joiner_pledges[i]
          } // else {
            // console.log('------ NO MATCH: ', selectedUsers[j], " is NOT equal to: ", joiners[i])
          // }
          // console.log("------ Looping B")
        }
        // console.log("Looping A")
      }
      return [joinersArray, pledgesArray, pledgesTotal]
    }
    function setBuyerBalance(users, verifiedUsers, totalOfPurchase) {
      let arr = []
      // console.log(users);
      console.log(verifiedUsers)
      console.log(totalOfPurchase);
      for (let i = 0; i < verifiedUsers.length; i++) {
        console.log('A loop ', i, verifiedUsers[i])
        for (let j = 0; j < users.length; j++) {
          console.log('---- B loop', j, users[j])
          if (verifiedUsers[i] === users[j].pharmacy_name) {
            console.log('---- MATCH: ', users[j].pharmacy_name)
            console.log('---- totalOfPurchase:  ', totalOfPurchase[i], 'user balance: ', users[j].balance)
            arr.push(Number(users[j].balance) - Number(totalOfPurchase[i]) )
          }          
        }
      }
      return arr
    }
    function sellerBalance(usersArray, reqBodyUser) {
      let balance = 1
      for (let i = 0; i < usersArray.length; i++) {
        if (reqBodyUser === usersArray[i].pharmacy_name) {
          balance = usersArray[i].balance
          return balance
        }
      }
    }

    console.log(req.body)
    const query = await client.query("SELECT id, goal, price, poster_pledge, joiners, joiner_pledges, status, submitter, transaction_id FROM applications WHERE id = $1 and submitter = $2;", [req.body.id, req.user.eczaneName]);
    console.log(query.rows)
    const { id, goal, price, poster_pledge, joiners, joiner_pledges, status, submitter } = query.rows[0];
    if (status !== 'ON_HOLD') {
      return res.status(400).json("client error failed to pass bid approval verification")
    }
    
    const usersQuery = await client.query("SELECT * FROM users;")
  
    // the balance the submitter (seller) currently has
    const submitterBalance = sellerBalance(usersQuery.rows, req.user.eczaneName)  
    // array of arrays which has [list of buyers, total for each buyer, the amount of items the seller with purchase]
    const transactionArray = setBuyerSellerValues(req.body.selectedUsers, joiners, joiner_pledges, price)
    // verifies the balance the buyers currently have then sets the new balance, returns array of each newly set balance
    const buyersNewBalance = setBuyerBalance(usersQuery.rows, req.body.selectedUsers, transactionArray[1])
    console.log(buyersNewBalance)
    // total for seller (+)
    const sellerTotal = transactionArray[2] * price
    // the newly set balance after purchase, current balance + sold items total
    const sellerBalanceAfter = Number(submitterBalance) + Number(sellerTotal)

    const transaction_id = query.rows[0].transaction_id

    ///////////////*******///////////////DEBUG SESSION////////********////////////////////////////
    
    // console.log(id)
    // console.log(submitter)
    // console.log(sellerTotal)
    // console.log(sellerBalanceAfter)
    // console.log(transactionArray[0])
    // console.log(transactionArray[1])
    // // console.log(buyersNewBalance)
    // console.log(`INSERT INTO transactions (application_id, seller, seller_amount, seller_balance_after, buyers, buyers_amount, buyers_balance_after, date) \n
    //  VALUES (${id}, ${submitter}, ${sellerTotal}, ${sellerBalanceAfter}, [${transactionArray[0]}], [${transactionArray[1]}], [${buyersNewBalance}], current_timestamp)`);
  
    // for (let i = 0; i < transactionArray[0].length; i++) {
    //   console.log(`UPDATE users SET balance = ${buyersNewBalance[i]} WHERE pharmacy_name = ${transactionArray[0][i]}`)
    // }
    // console.log(`UPDATE users SET balance = ${sellerBalanceAfter} WHERE pharmacy_name = ${submitter}`, [sellerBalanceAfter, submitter])

    ///////////////*******///////////////DEBUG SESSION////////********////////////////////////////

    const transactionQueryText = "INSERT INTO transactions (transaction_id, seller, seller_amount, seller_balance_after, buyers, buyers_amount, buyers_balance_after, date) VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp);"
    const transactionQueryArgs = [transaction_id, submitter, sellerTotal, sellerBalanceAfter, transactionArray[0], transactionArray[1], buyersNewBalance]
    await client.query(transactionQueryText, transactionQueryArgs)
  
    //updating each individual buyer balance through a for loop
    for (let i = 0; i < transactionArray[0].length; i++) {
      await client.query("UPDATE users SET balance = $1 WHERE pharmacy_name = $2;", [ buyersNewBalance[i], transactionArray[0][i] ])
    }

    // updating submitter balance
    await client.query("UPDATE users SET balance = $1 WHERE pharmacy_name = $2;", [sellerBalanceAfter, submitter])
  
    // setting application to approved
    await client.query("UPDATE applications SET status = 'APPROVED', status_change_date = current_timestamp WHERE id = $1 AND submitter = $2;", [id, req.user.eczaneName])
  
    await client.query('COMMIT')
    
    //responding with success
    res.status(200).json(query.rows)


  } catch (e) {
    await client.query('ROLLBACK')
    console.log(e)
    return res.status(500).json("server error when approving bid")

  } finally {
    client.release()
  }
})

app.post('/api/bid/join', authenticateToken, async (req, res) => {
  try {
    const { userInputJoin, bid_id } = req.body
    const { user } = req

    if (userInputJoin === 0 || userInputJoin === null || userInputJoin === undefined) {
      return res.status(406).json("Unable to insert when value equals 0 or undefined")
    }

    const verifyQuery = await pool.query("SELECT joiners, joiner_pledges FROM applications WHERE id = $1;", [bid_id])
    if (verifyQuery.rows[0]?.joiners) {
      for (let i = 0; i < verifyQuery.rows[0].joiners.length; i++) {
        if (user.eczaneName === verifyQuery.rows[0].joiners[i]) {
          return res.status(406).json("Unable to insert when user has already inserted")
        }
      }
    }

    await pool.query("UPDATE applications SET joiners = array_append(joiners, $1), joiner_pledges = array_append(joiner_pledges, $2) WHERE id = $3;",
    [user.eczaneName, userInputJoin, bid_id])
    return res.status(200).json("your order was submitted")
  } catch (error) {
    console.log(error);
    return res.status(500).json("server error when updating/joining bid")
  }
})

app.delete('/api/bid', authenticateToken, async (req, res) => {
  try {
    const { bid_id } = req.body
    const { eczaneName } = req.user
    await pool.query("DELETE FROM applications WHERE id = $1 AND submitter = $2;", [bid_id, eczaneName])
    return res.status(200).json("bid deletion success")
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failure when deleting bid")
  }
})

app.get('/api/data/table/hareket', authenticateToken, async (req, res) => {
  try {
      function setBuyerSellerValues(queryRows) {
        console.log(queryRows)

        console.log("FUNCTION START:")
        
        for (let i = 0; i < queryRows.length; i++) {
          Object.assign(queryRows[i], {verJoiners: []})
          for (let b = 0; b < queryRows[i].buyers.length; b++) {
            // console.log("---- LOOPING B: ", b)
            
            // console.log("---- B: Values Are: ", queryRows[i].buyers[b])
            for (let c = 0; c < queryRows[i].joiners.length; c++) {
              // console.log("------ LOOPING C: ", c)

              // console.log("------ C: Values Are: ", queryRows[b].joiners[c])
              if (queryRows[i].buyers[b] === queryRows[i].joiners[c]) {
                // console.log("------ FOUND MATCH: ", queryRows[i].buyers[b], " AND ", queryRows[i].joiners[c])
                queryRows[i].verJoiners.push({
                  eczane: queryRows[i].joiners[c],
                  pledge: queryRows[i].joiner_pledges[c],
                  total: queryRows[i].buyers_amount[b],
                  bakiye: queryRows[i].buyers_balance_after[b]
                })
              }
            }
          }
          // console.log(queryRows[i].verJoiners)
        }

        return queryRows
      }
      const query = await pool.query("SELECT transactions.transaction_id, applications.id, applications.product_name, transactions.seller, transactions.seller_amount, applications.goal, applications.poster_pledge, transactions.date, transactions.seller_balance_after, transactions.buyers, applications.joiners, applications.joiner_pledges, transactions.buyers_amount, transactions.buyers_balance_after FROM applications INNER JOIN transactions ON applications.transaction_id = transactions.transaction_id WHERE transactions.seller = $1 OR transactions.buyers && ARRAY [$1]::VARCHAR[] ;", [req.user.eczaneName])
      const buyerSellerValues = setBuyerSellerValues(query.rows)

      res.status(200).json(buyerSellerValues)
  } catch (error) {
    console.log(error)
    res.status(500).json("ERROR")
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});