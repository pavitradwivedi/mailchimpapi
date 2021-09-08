const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");
const request=require("request");

const app=express();
app.use(express.static("staticfile"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    
    const data={
         members:[
               {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                FNAME:firstname,
                LNAME:lastname,
                }
 }
]
    
    
       
    }


const jsondata= JSON.stringify(data);

const url="https://us6.api.mailchimp.com/3.0/lists/ccbb85568a";
const options={
    method:"POST",
    auth:"pavitra6:00e8348f02fb18b593200d945ff72bd8-us6",
     }

const request=https.request(url,options,function(response){ 

        if(response.statusCode===200){
        res.sendFile(__dirname + "/succes.html");}
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){console.log(JSON.parse(data))});
    
    
   });

request.write(jsondata);
request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
    console.log("server is up");
});





