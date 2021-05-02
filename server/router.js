const express = require('express')
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const users = require('./users');
const messages = require('./messages')

const router = express();
router.use(cors());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', (req, res) => {
    res.send('server is up and running');
})

router.get('/check', (req, res) => {
    // console.log(req.query.long, req.query.lat,"hey");
    long= req.query.long
    lat = req.query.lat
    var found = false;
    const db = new sqlite3.Database('./locations.db');

    db.each('select * from locations', function(err, row) {
        long_dist = long - row.long;
        lat_dist = lat - row.lat;

        dist = Math.sqrt(long_dist*long_dist + lat_dist*lat_dist);
        
        // console.log(dist)
        if( dist<0.2 && !found) {
            console.log("location matched, ", row.name);
            found = true;
            payload = {
                "status": "success",
                "data": { "id":row.id, "name":row.name},
            };
        }
    }, function() {
        if (!found)
            payload = {"status":"error"};
        // console.log(payload)
        res.send(payload);
    })
})

router.post('/addDetails', (req, res) => {
  const userId = users.addUserDetails(req.body);
  // console.log(userId);
  res.send({
    "status": "success",
    "data": userId,
  });
});

router.get('/getDetails', (req, res) => {
  userId = req.query.userId;
  console.log(userId);
  const user = users.getUserDetails(userId);
  // console.log(user);
  if(user)
    res.send({
      "status": "success",
      "data": user,
    })
  else
    res.send({"status": "error"})
})

router.get('/removeUser', (req, res) => {
  console.log('heyyyy called..', userId)
  userId = req.query.userId;
  user = users.getUserDetails(userId);
  users.removeUser(userId);
  res.send({
    "status": "success",
    "namespaceId": user.namespaceId,
  })
})

router.get('/getMessages', (req, res) => {
  userId1 = req.query.userId1;
  userId2 = req.query.userId2;
  const messagesList = messages.getMessages(userId1, userId2);
  console.log(messagesList,'  -messages');
  if(messagesList)
    res.send({
      "status": "success",
      "data": messagesList,
    })
  else
    res.send({"status": "error"})
})

module.exports = router;