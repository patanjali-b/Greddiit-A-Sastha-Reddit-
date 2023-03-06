const mongoose = require('mongoose');
const express = require("express");
const router = express.Router()
const cors = require('cors');
mongoose.set("strictQuery", false);
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://admin:admin@cluster0.sqmsghm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('connected'))
  .catch(e => console.log(e));
const app = express()
const jwt = require('jsonwebtoken')
const User = require('./models/usermodel.js')
const SubGreddit = require('./models/subgreddit.model')
const Post = require('./models/post.model')

app.use(express.json())
app.use(cors());
const saltRounds = 10;

app.post('/api/register', (req, res) => {
  console.log("ikxc")
  let hashed
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    }
    hashed = hash;
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      contact: req.body.contact,
      age: req.body.age,
      password: hashed,
      followers: [],
      following: []
    });

    newUser.save()
      // throw an error if the email is already in the database
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });

});

app.get('/api/profile/:id', async (req, res) => {
  const email = req.params.id;
  console.log("Email is ", email)
  const user = await User.find({ email: email })
  console.log("User is ", user)
  res.send(user)

});

app.post('/api/login', async (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  console.log(password)
  console.log("checkpoint 1 ")
  // write mongo query to find user with email
  const user = await User.find({ email: email })
  // If the user is found check for his password
  console.log(user[0])
  console.log("user length", user.length)
  console.log("passwrd", password)
  console.log("user password", user[0].password)
  // let hashedpassword = await bcrypt.hash(password, saltRounds);
  if (user.length > 0) {
    // if(hashedpassword === user[0].password) {
    //   console.log("Yes the password matches")
    //   return res.json("Success");
    // }
    // console.log(password, user[0].password,hashedpassword);
    if ((await bcrypt.compare(password, user[0].password)) === true) {
      console.log("Yes the password matches")
      console.log("user id", user[0]._id)
      return res.json({ id: user[0]._id });
    }
    else {
      console.log("Wrong Credentials!");
    }
  }

  res.json({ email: email, password: password })
})

app.put('/api/users/:id', async (req, res) => {
  console.log("Inside update user")
  const { id } = req.params;
  const { firstName, email, username, contact, age } = req.body;

  try {
    console.log("Inside try", id);
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstName,
      email,
      username,
      contact,
      age,
    });

    res.status(200).json(await User.findById(id));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post("/api/allsubgreddits", async (req, res) => {
  const {
    name, description, tags, banned,ID,
  } = req.body
  console.log("body", req.body)
  const tagsArray = tags.split(',').map(tag => tag.trim());
  const bannedArray = banned.split(',').map(ban => ban.trim());

  const savedsubgreddit = new SubGreddit({
    Name: name,
    Description: description,
    Tags: tagsArray,
    Banned: bannedArray,
    ID: ID,
  })
    await savedsubgreddit.save()
    return res.status(200).json(await SubGreddit.findOne(savedsubgreddit))
})

  app.get("/api/allsubgreddits", async (req, res) => {
    const subgreddits = await SubGreddit.find({})
    res.status(200).json(subgreddits)
  })
  
  app.get("/api/mysubgreddits/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id", id)
    const subgreddits = await SubGreddit.find({ ID: id})
    console.log("subgreddits", subgreddits)
    res.status(200).json(subgreddits)
  })

  app.delete("/api/mysubgreddits/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id", id)
    const subgreddit = await SubGreddit.findByIdAndDelete(id)
    res.status(200).end()
  })
  app.post("/api/mysubgreddits/:id", async (req, res) => {
    console.log("Inside post")
    const { id } = req.params;
    console.log("id", id)
    const {
      name, description,ID,postid,
    } = req.body
    console.log("body", req.body)

  
    const post = new Post({
      Name: name,
      Description: description,
      Author: ID,
      PostID: postid,

    })
      await post.save()
      return res.status(200).json(await Post.findOne(post))
  })
  app.get("/api/mysubgreddits/postid/:postid", async (req, res) => {
    const { postid } = req.params;
    console.log("postid", postid)
    const posts = await Post.find({PostID : postid })
    res.status(200).json(posts)
  })




  // app.get(`/api/mysubgreddits/:postid` , async (req, res) => {




  app.listen(5000)
  // /patu


  module.exports = app;


  // mongodb+srv://admin:admin@cluster0.sqmsghm.mongodb.net/?retryWrites=true&w=majority

  // mongodb+srv://admin:admin@cluster0.sqmsghm.mongodb.net/?retryWrites=true&w=majority