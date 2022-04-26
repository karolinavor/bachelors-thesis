const express = require('express')
const db = require('./config/db')
const cors = require('cors')

const app = express()
const PORT = 3001;
app.use(cors());
app.use(express.json())

// Route to get all years
app.get('/api/get', (req,res)=>{
  db.query('SELECT * FROM years', (err,result)=>{
      if(err) {
        console.log(err)
      } 
  res.send(result)
  });
});


// Route for creating a year
app.post('/api/create', (req,res)=> {

  const year = req.body.year;
  
  db.query('INSERT INTO years (year) VALUES (?)',[year], (err,result)=>{
     if(err) {
      console.log(err)
     } 
    console.log(result)
  });
})
  

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})