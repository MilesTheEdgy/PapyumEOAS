const express = require("express");
const jwt = require("jsonwebtoken")
const PORT = process.env.PORT || 3001;
const app = express();
const dotenv = require('dotenv');

dotenv.config();
process.env.TOKEN_SECRET;

app.use(express.json());
    
const eczData = [
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
  },
  {
      id: 5,
      eczane: "Birgül Eczanesi",
      İlaç: "STEROIDS",
      hedef: "15/25",
      kampanya: "15 + 4",
      birimFiyat: "16 TL",
      sonTarih: "2018/01/01",
      durum: "beklemede"
  },
  {
      id: 6,
      eczane: "Dolmuş Eczanesi",
      İlaç: "FAKE JUICE",
      hedef: "69/100",
      kampanya: "15 + 4",
      birimFiyat: "99 TL",
      sonTarih: "2018/04/25",
      durum: "beklemede"
  },
  {
      id: 7,
      eczane: "Başka Eczanesi",
      İlaç: "BAŞKAMAMOL",
      hedef: "13/46",
      kampanya: "15 + 4",
      birimFiyat: "498 TL",
      sonTarih: "2018/08/01",
      durum: "beklemede"
  }
]

const userData = [
  {
    username: "Hayat Eczanesi",
    password: "boss",
    bakiye: 1000
  },
  {
    username: "Başka Eczanesi",
    password: "boss",
    bakiye: 1000
  }
]

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
  console.log('verifiying')
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) {
      console.log(err);
      return res.sendStatus(403)
    }

    console.log(user);

    req.user = user

    next()
  })
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "hayat" && password === "boss") {
    const token = generateAccessToken({ username: req.body.username, ID: 1, bakiye: 1000 });
    res.status(200).json("your token is: ", token);
  } else {
    res.status(401).json("not authorized")
  }
})

app.post('/api', authenticateToken, (req, res) => {
  console.log('api posting')
  res.json("you're good!")
})

// app.get('/api', (req, res) => {
//   res.status(200).json("hello")
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});