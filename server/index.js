const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendModel = require('./models/Friend');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db =
  process.env.MONGODB_URI ||
  'mongodb+srv://yeasir17:yeasir17@cluster0.hfqbh.mongodb.net/mernstack?retryWrites=true&w=majority';
  

// ==========database connection========
mongoose
  .connect(db,{})
  .then(() => {
    console.log('database connection established');
  })

  .catch((err) => {
    console.log('no connection');
  });

// ========data sent to database===========

app.post('/addfriend', async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  res.send(friend);
});

// ============read data to database============
app.get('/read', async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// ===========data update============

app.put('/update', async (req, res) => {
  const newName = req.body.newName;
  const newAge = req.body.newAge;
  const id = req.body.id;

  try {
    await FriendModel.findById(id, (error, friendToUpdate) => {
      friendToUpdate.name = String(newName);
      friendToUpdate.age = Number(newAge);
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send('updated');
});

// =========data delete from database==========
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await FriendModel.findByIdAndRemove(id).exec();
  res.send('deleted');
});


// ======== port=======

app.listen(process.env.PORT || 5000, () => {
  console.log('you are connected');
});
