//require('dotenv').config()
var express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer=require('nodemailer');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var schema = require('./schemas')
var regiforms = schema.regiform;
var clientLogins = schema.userform;
var clientcomplaints = schema.complaint;
var completed =schema.complete;
var assign=schema.assign;
var clientCameras = schema.pushcamera;
var clientSignup = schema.tranform;

app.use(cors())
mongoose.connect('mongodb://roshenikosanam:rosheni123@ds159204.mlab.com:59204/wastageaccumulation', { useNewUrlParser: true });
var port = process.env.PORT || 3000;
app.post("/register", function (req, res) {

    var form = req.body;
    console.log(req.body)

clientLogins.create(form,function(err,data){
   
     if(err)
         console.log(err);
         else
         {
		 console.log("Data successfully inserted");
         return res.json({ "inserted": true });
         }
        })
    })
    app.post("/complaint", function (req, res) {

        var form = req.body;
        console.log(req.body)
    
    clientcomplaints.create(form,function(err,data){
       
         if(err)
             console.log(err);
             else
             {
             console.log("Data successfully inserted");
             return res.json({ "inserted": true });
             }
            })
        })

        app.get("/getvehicle", function (req, res) {
            console.log(req.query)
            clientLogins.find({'Role':req.query.Role, 'available':req.query.available}, function (err, data) {
                if (err)
                    throw err;
                
                console.log(JSON.stringify(data))
                console.log(data.length)
                if(data.length == 0)
                return res.json({"isVerified":false})
                else
                return res.json(data)
        })
        })

        app.get("/getdrivertask", function (req, res) {
            console.log(req.query)
            assign.find({'driveremail':req.query.driveremail}, function (err, data) {
                if (err)
                    throw err;                
                console.log(JSON.stringify(data))
                console.log(data.length)
                if(data.length == 0)
                return res.json({"isVerified":false})
                else
                return res.json(data)
        })
        clientcomplaints.deleteOne({"image":req.body.image},function(err,res){
            if(err)
            console.log(err);
            else{
                console.log("data deleted");
            }
        });
        })

        app.get("/getcomplaint", function (req, res) {
            console.log(req.query)
            clientcomplaints.find({'for':req.query.for}, function (err, data) {
                if (err)
                    throw err;
                
                console.log(JSON.stringify(data))
                console.log(data.length)
                if(data.length == 0)
                return res.json({"isVerified":false})
                else
                return res.send(data);
        })
        })
        app.get("/sendemail", function (req, res) {
            console.log(req.query)
            if(req.query.status=='s')
            {
                console.log('ss')
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'theultimatedevloper@gmail.com',
                        pass: 'shyamv1234'
                    }
                });
        
                var mailOptions = {
                    from: 'theultimatedevloper@gmail.com',
                    to: req.query.email,
                    subject: 'Subscription Mail',
                    text: 'Thank you for being so patient. we are happy to inform you that your complaint is being filed ans soon a liable action will be taken '
                };
        
                transporter.sendMail(mailOptions, function (error, data) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + data.response);
                        //res.send('Hey ' + obj.email + ' U are registered Successfully..!!');
                        res.send('')
                        res.end();
                    }
                });
            }
                if(req.query.status=='d')
                {
                    console.log('ss')
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'theultimatedevloper@gmail.com',
                            pass: 'shyamv1234'
                        }
                    });
            
                    var mailOptions = {
                        from: 'theultimatedevloper@gmail.com',
                        to: req.query.email,
                        subject: 'Subscription Mail',
                        text: 'Sorry for inconvenience. We are still Processing your complaint.Please stay tuned with us! '
                    };
            
                    transporter.sendMail(mailOptions, function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + data.response);
                            //res.send('Hey ' + obj.email + ' U are registered Successfully..!!');
                            res.send('')
                            res.end();
                        } 
                    });
                }
                    if(req.query.status=='dec')
                {
                    console.log('ss')
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'theultimatedevloper@gmail.com',
                            pass: 'shyamv1234'
                        }
                    });
            
                    var mailOptions = {
                        from: 'theultimatedevloper@gmail.com',
                        to: req.query.umail,
                        subject: 'Subscription Mail',
                        text: 'Sorry !!! This image is inappropriate . Your issue is not considered '
                    };
            
                    transporter.sendMail(mailOptions, function (error, data) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + data.response);
                            //res.send('Hey ' + obj.email + ' U are registered Successfully..!!');
                            res.send('')
                            res.end();
                        }
                    });
                    clientcomplaints.deleteOne({"Email":req.query.umail},function(err,res){
                        if(err)
                        console.log(err);
                        else{
                            console.log("data deleted");
                        }
                    });
                     //return res.json({"deleted":true});
                  
                
                }
            
            
        })
    


    app.get("/getRole", function (req, res) {
        console.log(req.query)
        clientLogins.find({'Email':req.query.Email, 'Password':req.query.Password}, function (err, data) {
            if (err)
                throw err;
            
            console.log(JSON.stringify(data))
            console.log(data.length)
            if(data.length == 0)
            return res.json({"isVerified":false})
            return res.json(data)
    })
    })
   app.get("/updatedriver",function(req,res){
       clientLogins.update({'Email':req.query.Email},{"avail":req.query.avail},function(err,data){
           if(err)
           console.log(err);
           else{
               console.log(data);
               return res.json({"updated":true});
           }
       })
       })
    
    app.get("/getlist", function (req, res) {
        console.log(req.query)
        clientLogins.find({"Role":"d"}, function (err, data) {
            if (err)
                throw err;
            
            console.log(JSON.stringify(data))
            console.log(data.length)
            if(data.length == 0)
            return res.json({"isVerified":false})
            return res.json(data)
    })
    })

    app.get("/getinfo", function (req, res) {
        console.log(req.query)
        clientLogins.find({"Role":"d"}, function (err, data) {
            if (err)
                throw err;
            
            console.log(JSON.stringify(data))
            console.log(data.length)
            if(data.length == 0)
            return res.json({"isVerified":false})
            return res.json(data)
    })
    })

    app.get("/getpro", function (req, res) {
        console.log(req.query)
        clientLogins.find({"Email":req.query.demail}, function (err, data) {
            if (err)
                throw err;
            else{
            console.log(JSON.stringify(data))
            console.log(data.length)
            if(data.length == 0)
            return res.json({"isVerified":false})
            return res.json(data)
            }
    })
    })

    app.post("/pushcamera", function (req, res) {

        var form = req.body;
        console.log(req.body);
    clientCameras.create(form,function(err,data){
   
        if(err)
            console.log(err);
            else
            {
            console.log("Data successfully inserted");
            return res.json({ "inserted": true });
            }
           })
       })

       app.post("/tranform", function (req, res) {

        var form = req.body;
        console.log(req.body)
    
    clientSignup.create(form,function(err,data){
       
         if(err)
             console.log(err);
             else
             {
             console.log("Data successfully inserted");
             return res.json({ "inserted": true });
             }
            })
        })

  //     var form = req.body;)
// app.get("/register", function (req, res) {
//     var form = req.body;
//     console.log(req.body)
//     regiforms.create(form,function(err,data){
  
//      if(err)
// 		 console.log(err);
// 	 else
// 		 console.log("Data successfully inserted");
// })
// return true;
// })
app.post("/drivertask", function (req, res) {

    var form = req.body;
    console.log(req.body)

    assign.create(form,function(err,data){
   
     if(err)
         console.log(err);
         else
         {
		 console.log("Data successfully inserted");
         return res.json({ "inserted": true });
         }
        })
    })

    // app.post("/successful", function (req, res) {

    //     var form = req.body;
    //     console.log(req.body)
    
    //     assign.create(form,function(err,data){
       
    //      if(err)
    //          console.log(err);
    //          else
    //          {
    //          console.log("Data successfully inserted");
    //          return res.json({ "inserted": true });
    //          }
    //         })
    //     })


    
    app.post("/complete",function(req,res){
        var form =req.body;
        completed.create(form,function(err,data){
            if(err)
         console.log(err);
         else
         {
		 console.log("Data successfully inserted");
         
         }
        })
        clientcomplaints.deleteOne({"image":req.body.image},function(err,res){
            if(err)
            console.log(err);
            else{
                console.log("data deleted");
            }
        });
         return res.json({"deleted":true});
        })
    


app.listen(process.env.PORT ||3000, () => {
    console.log("server running on 3000")
});
