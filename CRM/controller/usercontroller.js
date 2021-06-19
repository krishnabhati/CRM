const jwt = require('jsonwebtoken');
const task = require('../models/taskmodel.js');
const User = require('../models/usermodel.js');


exports.create = async (req, res) => {
  try {
   
      let Email = req.body.email;
      let Mobile = req.body.mobile;
      let userName = req.body.username;

      let existdata = await User.findOne({ $or: [{ email: Email }, { mobile: Mobile }, { username: userName }] })
      if (existdata) {
        res.status(200).json({
          Status: 200,
          data: "User Already Exist"
        });
      } else {
        const newuser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
          countryCode: req.body.countryCode,
          usertype:req.body.usertype?userName.req.bodytype:2
        });
        // console.log(newuser,"NEWWWWWWWWWWWW");
        // Save Tutorial in the database
        let data = await newuser.save();
        let payload = {
          _id: data.id,
          username: data.username,
          email: data.email,
          mobile: data.mobile,
          countryCode: data.countryCode,
          usertype:data.usertype

        }
        //console.log(payload, "NEWWWWWWWWWWWW");
        let authToken = await jwt.sign(payload, "krishna", { algorithm: "HS256", expiresIn: "5m" });
        //console.log(authToken, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        //console.log(data.email, "EMAILLLLLLLLLLLL");

        //let sendOTP = await sendMessage(data.countryCode, data.mobile, data.username, OTP);
        // payload.mailAccessToken = authToken;
        let verifyemail = await sendVerificationEmail(data.email)
        res.send({
          data: data,
          accessToken: authToken

        });
      }
    }// .
  catch (err) {
    console.log(err, "ERROOOOOOOOOOOOOOOOOOOr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
}



// Retrieve and return all notes from the database.

exports.tasklist = (req, res) => {
  // const username = req.query.username;

  task.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred "
      });
    });
};



// Find a single note with a noteId
exports.login = async (req, res) => {
  let Email = req.body.email;
  let Mobile = req.body.mobile;
  let userName = req.body.username;
  let usertype = req.post.usertype

  const userdata = await User.findOne({ $or: [{ email: Email }, { mobile: Mobile }, { username: userName },{usertype:usertype}] })
    if(userdata){
      console.log("userexist")
      if(userdata.password == req.body.password){
        console.log("Login successfully")
        let payload = {
          _id: userdata._id,
          username: userdata.username,
          email: userdata.email,
          mobile: userdata.mobile,
          countryCode: userdata.countryCode,
          usertype:userdata.usertype

        }
        //console.log(payload, "NEWWWWWWWWWWWW");
        let authToken = await jwt.sign(payload, "krishna", { algorithm: "HS256", expiresIn: "180d" });
        res.send({
          msg : "Login Successfully",
          status : 200,
          accessToken : authToken
        })
      }else{
        res.send({
          msg : "Wrong Credintials",
          status : 400
        })
      }
    }else{
      res.send({
        msg : "User Not Found",
        status : 404
      })
    }



};
exports.addtask = async (req, res) => {
    const userdata = req.token;
    if(userdata.usertype==1){
    const task = new User({
        title: req.body.title,
        description:req.body.description
      });
      // console.log(newuser,"NEWWWWWWWWWWWW");
      // Save Tutorial in the database
      let data = await task.save();
     if(data) res.send(data);
      else res.status(500).send({message:err.message || "Some error occurred "});
    }else{
        res.status(500).send({message:err.message || "Some error occurred you are not authorised to perform this action"});
    }
  };


