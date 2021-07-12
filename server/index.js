const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const dotenv = require('dotenv');
const pool = require("./db")
const { verifyNewBid, createNewBid } = require("./bids/bids")
const { generateAccessToken, authenticateToken } = require("./token/token")

dotenv.config();
process.env.TOKEN_SECRET;

app.use(express.json());
    
const eczData = [
  {
      id: 0,
      eczane: "Hayat Eczanesi",
      İlaç: "PARACETOL",
      pledge: 10,
      hedef: 25,
      kampanya: "15 + 4",
      birimFiyat: 29,
      sonTarih: "2018/01/09",
      durum: "beklemede",
      description: "Birşeyler yapalım arkadaşlar xDDD",
      katılanlar: [
        {
          name: "Miles Eczanesi",
          pledged: 4
        },
        {
          name: "Phoenix Eczanesi",
          pledged: 9
        },
        {
          name: "Emily Eczanesi",
          pledged: 6
        }
      ]
  },
  {
      id: 1,
      eczane: "Birgül Eczanesi",
      İlaç: "STEROIDS",
      pledge: 15,
      hedef: 55,
      kampanya: "15 + 4",
      birimFiyat: 29,
      sonTarih: "2018/01/01",
      durum: "beklemede",
      katılanlar: [
        {
          name: "Hayat Eczanesi",
          pledged: 15
        },
        {
          name: "Başka Eczanesi",
          pledged: 5
        },
        {
          name: "Samsun Eczanesi",
          pledged: 4
        }
      ]
  },
  {
      id: 2,
      eczane: "Dolmuş Eczanesi",
      İlaç: "FAKE JUICE",
      pledge: 15,
      hedef: 55,
      kampanya: "15 + 4",
      birimFiyat: 32,
      sonTarih: "2018/04/25",
      durum: "beklemede",
      katılanlar: [
        {
          name: "Hayat Eczanesi",
          pledged: 15
        },
        {
          name: "Başka Eczanesi",
          pledged: 5
        },
        {
          name: "Samsun Eczanesi",
          pledged: 4
        }
      ]
  },
  {
      id: 3,
      eczane: "Başka Eczanesi",
      İlaç: "BAŞKAMAMOL",
      pledge: 15,
      hedef: 55,
      kampanya: "15 + 4",
      birimFiyat: 73,
      sonTarih: "2018/08/01",
      durum: "beklemede",
      katılanlar: [
        {
          name: "Hayat Eczanesi",
          pledged: 15
        },
        {
          name: "Başka Eczanesi",
          pledged: 5
        },
        {
          name: "Samsun Eczanesi",
          pledged: 4
        }
      ]
  },
  {
    id: 4,
    eczane: "Hayat Eczanesi",
    İlaç: "PARACETOL",
    pledge: 15,
    hedef: 88,
    kampanya: "15 + 4",
    birimFiyat: 59,
    sonTarih: "2018/01/09",
    durum: "beklemede",
    katılanlar: [
      {
        name: "Hayat Eczanesi",
        pledged: 15
      },
      {
        name: "Başka Eczanesi",
        pledged: 5
      },
      {
        name: "Samsun Eczanesi",
        pledged: 4
      }
    ]
},
{
    id: 5,
    eczane: "Birgül Eczanesi",
    İlaç: "STEROIDS",
    pledge: 15,
    hedef: 55,
    kampanya: "15 + 4",
    birimFiyat: 53,
    sonTarih: "2018/01/01",
    durum: "beklemede",
    katılanlar: [
      {
        name: "Hayat Eczanesi",
        pledged: 15
      },
      {
        name: "Başka Eczanesi",
        pledged: 5
      },
      {
        name: "Samsun Eczanesi",
        pledged: 4
      }
    ]
},
{
    id: 6,
    eczane: "Dolmuş Eczanesi",
    İlaç: "FAKE JUICE",
    pledge: 15,
    hedef: 55,
    kampanya: "15 + 4",
    birimFiyat: 13,
    sonTarih: "2018/04/25",
    durum: "beklemede",
    katılanlar: [
      {
        name: "Hayat Eczanesi",
        pledged: 15
      },
      {
        name: "Başka Eczanesi",
        pledged: 5
      },
      {
        name: "Samsun Eczanesi",
        pledged: 4
      }
    ]
},
{
    id: 7,
    eczane: "Başka Eczanesi",
    İlaç: "BAŞKAMAMOL",
    pledge: 15,
    hedef: 55,
    kampanya: "15 + 4",
    birimFiyat: 17,
    sonTarih: "2018/08/01",
    durum: "beklemede",
    katılanlar: [
      {
        name: "Hayat Eczanesi",
        pledged: 15
      },
      {
        name: "Başka Eczanesi",
        pledged: 5
      },
      {
        name: "Samsun Eczanesi",
        pledged: 4
      }
    ]
}
]

const eczDataBekleyen = [
  {
      id: 0,
      eczane: "Hayat Eczanesi",
      İlaç: "PARACETOL",
      hedef: "20/50",
      kampanya: "15 + 4",
      birimFiyat: "39 TL",
      sonTarih: "2018/01/09",
      durum: "beklemede"
  },
  {
      id: 1,
      eczane: "Birgül Eczanesi",
      İlaç: "STEROIDS",
      hedef: "15/25",
      kampanya: "15 + 4",
      birimFiyat: "16 TL",
      sonTarih: "2018/01/01",
      durum: "beklemede"
  },
  {
      id: 2,
      eczane: "Dolmuş Eczanesi",
      İlaç: "FAKE JUICE",
      hedef: "69/100",
      kampanya: "15 + 4",
      birimFiyat: "99 TL",
      sonTarih: "2018/04/25",
      durum: "beklemede"
  },
  {
      id: 3,
      eczane: "Başka Eczanesi",
      İlaç: "BAŞKAMAMOL",
      hedef: "13/46",
      kampanya: "15 + 4",
      birimFiyat: "498 TL",
      sonTarih: "2018/08/01",
      durum: "beklemede"
  },
  {
    id: 4,
    eczane: "Hayat Eczanesi",
    İlaç: "PARACETOL",
    hedef: "20/50",
    kampanya: "15 + 4",
    birimFiyat: "39 TL",
    sonTarih: "2018/01/09",
    durum: "beklemede"
}
]

const eczDataBakiyehrkt = [
  {
    ID: 0,
    İlaç: "PARACETOL",
    eczane: "Hayat Eczanesi",
    tür: "Satış",
    tarih: "2018/01/09",
    bakiye: "500"
  },
  {
    ID: 1,
    İlaç: "DEPRECAMOL",
    eczane: "Başka Eczanesi",
    tür: "Alış",
    tarih: "2018/01/09",
    bakiye: "150"
  },
]





////////////////////////////////////////
// ******** LOGIN AND AUTH ********** //
////////////////////////////////////////
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "hayat" && password === "boss") {
    const token = generateAccessToken({ username: req.body.username, eczaneName: "Hayat Eczanesi", ID: 1, role : "eczane" });
    res.status(200).json({username, eczaneName: "Hayat Eczanesi", ID: 1, bakiye: 500, token});
  } else {
    res.status(401).json("not authorized")
  }
})

app.post('/api', authenticateToken, (req, res) => {
  const { username, eczaneName , ID } = req.user
  res.status(200).json({username, eczaneName, ID, bakiye: 500});
})

////////////////////////////////////////
// ************ TABLES ************** //
////////////////////////////////////////
app.get('/api/data/table/tum', authenticateToken, async (req, res) => {
  // tum teklifler
  try {
    const query = await pool.query("SELECT * FROM applications")
    // console.log(query.rows);
    let arr = query.rows
    let joinerArr = []
    console.log('original unmodifed array is: ', arr)
    for (let i = 0; i < arr.length; i++) {
      console.log('I loop number: ', i )
      if (arr[i].joiners && arr[i].joiner_pledges) {
        console.log('arr[i].joiners is true, exectuing J loop...')
        for (let j = 0; j < arr[i].joiners.length; j++) {
          console.log("taking these values: ", arr[i].joiners[j], "and storing them in an obj in an arr joinerArr");
          joinerArr = [
            ...joinerArr,
              {
                name: arr[i].joiners[j],
                pledge: arr[i].joiner_pledges[j]
              }
          ]
        }
        console.log('assiging the joinerArr to the original arr accoring to I loop', i, "index")
        Object.assign(arr[i], {joiners: joinerArr})
      }
      joinerArr = []
      console.log('modifed arr index is: ', arr[i]);
      console.log('finished I loop number: ', i)
    }
    console.log('arr1 is: ', arr[1])
    console.log('arr2 is: ', arr[2])
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

app.get('/api/data/table/bekleyen', authenticateToken, (req, res) => {
  res.status(200).json(eczDataBekleyen)
})

app.get('/api/data/table/hareket', authenticateToken, (req, res) => {
  res.status(200).json(eczDataBakiyehrkt)
})


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
      console.log('fetching according to medicine name')
      query = await pool.query("SELECT medicine, barcode FROM products WHERE medicine LIKE '%' || $1 || '%';", [input.toUpperCase()])
    } else if (!Number.isNaN(result)) {
      console.log('fetching according to barcode number')
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
  try {
    const { body, user } = req
    const { selectedRows, id} = body
    const query = await pool.query("UPDATE applications SET status = 'APPROVED' WHERE id = $1 AND submitter = $2", [id, user.eczaneName])
    console.log(query);
    if (query.rowCount !== 0) {
      res.status(200).json("your application was updated successfully")
    } else {
      res.status(400).json("failed to update application, client error.")
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error")
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});