require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req,res)=>{
    try {
        res.sendFile(`${__dirname}/index.html`)
    } catch (err)  {
       res.send('something went wrong !') 
    }
})
app.get('/about', (req,res)=>{
    res.send('<h1>about page</h1>')
})

app.get('/register', (req,res)=>{
    res.send('<h1>register page</h1>')
})
app.get('/login', (req,res)=>{
    res.send('<h1>login page</h1>')

})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app listining on 3000`);
})