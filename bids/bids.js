const pool = require("../db")

async function createNewBid(body, user) {
    try {
      const { productName, goal, pledge, unitPrice, conditionBonus, conditionOnTotal, conditionGiveTotal, description, finalDate} = body;
      if (conditionBonus) {
        const condition = `${conditionOnTotal}+${conditionGiveTotal}`
        const query = await pool.query("INSERT INTO applications(product_name, goal, condition, price, poster_pledge, description, final_date, status, date, submitter) VALUES ($1, $2, $3, $4, $5, $6, $7, 'ON_HOLD', CURRENT_TIMESTAMP, $8)",
        [productName, goal, condition, unitPrice, pledge, description, finalDate, user.eczaneName])
        console.log("Query was successfull, :", query.rows);
      } else if (!conditionBonus) {
        const condition = "NONE"
        const query = await pool.query("INSERT INTO applications(product_name, goal, condition, price, poster_pledge, description, final_date, status, date, submitter) VALUES ($1, $2, $3, $4, $5, $6, $7, 'ON_HOLD', CURRENT_TIMESTAMP, $8)",
        [productName, goal, condition, unitPrice, pledge, description, finalDate, user.eczaneName])
        console.log("Query was successfull, :", query.rows);
      }
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }
  
  async function verifyNewBid(req, res, next) {
    try {
      const { productName, goal, pledge, unitPrice, totalPrice, conditionBonus, conditionOnTotal, conditionGiveTotal, description, finalDate} = req.body;
      let strQuery = productName.split("--");
      const medBarcodeQuery = await pool.query("SELECT medicine, barcode FROM products WHERE barcode = $1", [strQuery[1]]);
      // console.log("your query, based on barcode search, is: \n", medBarcodeQuery.rows, "and it's type is \n", typeof medBarcodeQuery.rows, "it's length is also: \n", medBarcodeQuery.rows.length );
      if (medBarcodeQuery.rows.length === 0) {
        console.error("search query returned undefined, non matching parameters.")
        return res.status(400).json("failed to pass form vertification checks")
      }
      if (medBarcodeQuery.rows[0].medicine !== strQuery[0]) {
        console.log(`${medBarcodeQuery.rows[0].medicine} is NOT equal to ${strQuery[0]}, non matching parameter and query data`);
        return res.status(400).json("failed to pass form vertification checks")
      }
  
      if (typeof goal !== "number" || typeof pledge !== "number" || typeof unitPrice !== "number" || typeof totalPrice !== "number") {
        console.log('expected number but got not number on one of the below types')
        console.log(typeof goal, typeof pledge, typeof unitPrice, typeof totalPrice);
        return res.status(400).json("failed to pass form vertification checks")
      }
  
      if (pledge > goal) {
        console.log("pledge is bigger than goal");
        return res.status(400).json("failed to pass form vertification checks")
      }
  
      if (conditionBonus) {
        if (typeof conditionOnTotal !== "number" || typeof conditionGiveTotal !== "number") {
          console.log('expected number but got not number on one of the below types')
          console.log(typeof conditionOnTotal, typeof conditionGiveTotal);
          return res.status(400).json("failed to pass form vertification checks")
        }
      }
  
      if (description === "") {
        console.log('description field is empty');
        return res.status(400).json("failed to pass form vertification checks")
      }
  
      const inputDate = new Date(finalDate);
      const todayDate = new Date();
      if (inputDate.setHours(0, 0, 0, 0) <= todayDate.setHours(0, 0, 0, 0)) {
          console.log("final date is older than today's date")
          return res.status(400).json("failed to pass form vertification checks")
        };
  
      console.log('PASSED ALL TESTS')
      next()
    } catch (error) {
      console.log(error)
      return res.status(500).json("server error")
    }
  }
  
  module.exports = {
      createNewBid,
      verifyNewBid
  }