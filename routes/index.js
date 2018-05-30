const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const contentTemplate = require('../models/content-template');
const Content = require('../models/content');
const rss = require('../config/rss');
const multer = require('multer');
const upload = multer({ dest: '/assets/' });
const transporter = nodemailer.createTransport({
  // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
  auth: {
    user: 'mjinkens87@gmail.com',
    pass: '202761Mj'
  }
});

module.exports = function(passport) {

  /* GET home page. */
  router.get('/', function(req, res, next) {
    // redirect all requests to homepage
    res.redirect("/apwh");
  });

  router.get('/apwh', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/index.html"));
  });

  router.get('/apwh/syllabus', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/syllabus.html"));
  });

  router.get('/apwh/technology&environment', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/technology&environment.html"));
  });

  router.get('/apwh/organizationofsocieties', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/organizationofsocieties.html"));
  });

  router.get('/apwh/regionalinteractions', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/regionalinteractions.html"));
  });

  router.get('/apwh/globalinteractions', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/globalinteractions.html"));
  });

  router.get('/apwh/industrialization&integration', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/industrialization&integration.html"));
  });

  router.get('/apwh/acceleratingglobalchange', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/acceleratingglobalchange.html"));
  });

  router.get('/apwh/apprep', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/apprep.html"));
  });

  router.get('/apwh/socialstudiesuil', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/socialstudiesuil.html"));
  });

  router.get('/apwh/signup', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/signup.html"));
  });

  router.post('/apwh/register', (req, res) => passport.authenticate('local-signup', {
    successRedirect : '/apwh/admin/success-redirect', // redirect to the secure section
    failureRedirect : '/apwh/signup-failed', // redirect back to the signup page if there is an error
    failureFlash : false // allow flash messages
  })(req,res));

  router.post('/apwh/login', (req, res) => passport.authenticate('local-login', {
    successRedirect: '/apwh/admin/success-redirect',
    failureRedirect: '/apwh/login-failed',
    failureFlash: false
  })(req,res));

  router.get('/apwh/login-failed', function(req, res, next) {
    res.send("Invalid username/password")
  });

  router.get('/apwh/signup-failed', function(req, res, next) {
    res.send("Signup failed")
  });

  router.post('/apwh/admin/logout', function(req, res) {
    req.logout();
    res.redirect('/apwh');
  });

  router.get('/apwh/admin/user', function(req, res, next) {
    var username = req.user.local.email;
    res.send(username)
  });

  router.get('/apwh/admin/success-redirect', function(req, res, next) {
    res.redirect("/apwh/admin/index-admin")
  });

  router.get('/apwh/admin/index-admin', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/index-admin.html"));
  });

  router.get('/apwh/admin/syllabus', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/syllabus.html"));
  });

  router.get('/apwh/admin/technology&environment', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/technology&environment.html"));
  });

  router.get('/apwh/admin/organizationofsocieties', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/organizationofsocieties.html"));
  });

  router.get('/apwh/admin/regionalinteractions', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/regionalinteractions.html"));
  });

  router.get('/apwh/admin/globalinteractions', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/globalinteractions.html"));
  });

  router.get('/apwh/admin/industrialization&integration', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/industrialization&integration.html"));
  });

  router.get('/apwh/admin/acceleratingglobalchange', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/acceleratingglobalchange.html"));
  });

  router.get('/apwh/admin/apprep', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/apprep.html"));
  });

  router.get('/apwh/admin/socialstudiesuil', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/../views/admin/socialstudiesuil.html"));
  });

  router.post('/apwh/admin/add-content', function(req, res, next) {
    var templateContent = contentTemplate.newContent(req.body.contentType);
    console.log(req.body)
    var newContent = new Content({
      'content.contentType': req.body.contentType,
      'content.templateHTML': templateContent.html,
      'content.contentHTML': '',
      'content.filepath': '',
      'content.id': templateContent.id,
      'content.container': req.body.parentContainer,
      'content.file': req.body.parentFile,
      'content.day': req.body.day,
      'content.month': req.body.month,
      'content.year': req.body.year
    });
    newContent.save(function (err) {
      if (err) return console.error(err);
    }).then(() => {
      res.send({
        "content": newContent.content.templateHTML
      });
    });
  });

  router.post('/apwh/admin/add-file', upload.any(), function(req, res, next) {
    console.log(req.body, 'Body');
    console.log(req.files, 'files');
    res.end();
  });

  router.delete('/apwh/admin/remove-content', function(req, res, next) {
    // Content.remove({'content.contentType': 'file'})
      Content.remove({'content.id': req.body.id })
    .then(function(err, obj) {
      if(err)
        res.send(err);
      if(!err)
        res.send(obj);
    });
  });

  router.post('/apwh/admin/save-content', function(req, res, next) {
    var i;
    var id;
    var html;
    for(i = 0; i < Object.keys(req.body).length; ++i) {
      id = req.body[i].id;
      html = req.body[i].html
      Content.findOneAndUpdate({'content.id': id}, {'content.contentHTML': html}, {new: true}, function(err, content) {
        if (err) {
           console.error(err);
        } else {
          console.log(content);
        }
      });
    };
    res.send('Changes saved!');
  });

  router.post('/apwh/load-content', function(req, res, next) {
    Content.find(req.body, function(err, content) {
      if(err){
         console.error(err);
      } else{
        res.send(content);
      };
    });
  });

  router.post('/apwh/load-rss', function(req, res, next) {
    rss.getRSS().then((data) => {
      res.send(data)
    })
  });

  router.post('/apwh/send-message', function(req, res, next) {

    var email_obj = req.body;
    var mailOptions = {
      from: "mjinkens87@gmail.com",
      to: "djinkens@dallasisd.org",
      subject: "Message from " + email_obj.name + " on djinkens.com/apwh",
      text: email_obj.message
    };

    transporter.sendMail(mailOptions, function(err, info){
      if (error) {
         console.error(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send("message sent");
  });
  return router
};
