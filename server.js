const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const User = require('./models/User');
const port=8000;
const app= express();

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  // User.create()
	const {name, email, password} = req.body;
	const user = new User({name, email,password})
	user.save().then(result => {
	return res.status(201).json(result)
	}).catch(err => {
	res.status(500).json(err)
	})
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  // User.findById()
})
// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})
