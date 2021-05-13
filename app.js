const express = require('express');
const app = express();
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/newDB';
//establish data base connection
mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, (err) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Databse Connected");
    }
});
//declare the schema
const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String
});

//create data model
const Data = mongoose.model('Data' , dataSchema);

// creates a new data
app.get('/', (req, res) => {
    Data.create({
        name: "Adejumo Adeniyi",
        email: "niyiade97@gamil.com",
        country: "Nigeria"
    },
    {
        name: "Adesola Adeniyi",
        email: "niyi97@gamil.com",
        country: "Niger"
    },
     (err , result) => {
        if(err){
            return res.status(500).json({message: "request not successfu: " + err});
        }
        else{
            return res.status(200).json({message: "request successful" , data: result});
        }
    } )
})


//gets the created
app.get('/getData', (req, res) => {
    Data.find({}, (err, data) => {
        if(err){
            return res.status(500).json({message:  "request not successfu: " + err});
        }
        else{
            return res.status(200).json({message: "request successful" , data: data});
        }
    } )
});

// updates the data
app.post('/updateData', (req, res) => {
    Data.findOneAndUpdate({country : "Nigeria"},{email: "ade@gmail.com"}, (err, data) => {
        if(err){
            return res.status(500).json({ message: "request not successfu: " + err});
        }
        else{
            Data.save((err1, done) => {
                if(err1){
                    return res.status(500).json({ message: "request not successfu: " + err1});
                }
                else{
                    return res.status(200).json({message: "request successful" , data: data});
                }
            });
            
        }
    } )
});

// deletes the data
app.delete('/deleteData', (req, res) => {
    Data.findOneAndDelete({name : "Adesola Adeniyi"},{country: "Togo"}, (err, data) => {
        if(err){
            return res.status(500).json({message: "request not successfu: " + err});
        }
        else{
            Data.save((err1, done) => {
                if(err1){
                    return res.status(500).json({ message: "request not successfu: " + err1});
                }
                else{
                    return res.status(200).json({message: "request successful" , data: data});
                }
            });
        }
    } )
});
app.listen(5000, () => console.log('app connected'));

