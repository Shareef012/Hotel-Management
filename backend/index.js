const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());

console.log("The server is running successfully...");
mongoose.connect("mongodb+srv://shareefshaik086:gktmTDNKoiGBhJpC@hotel.nhpdo.mongodb.net/",{
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected",()=>{
    console.log("Connected to the database");
})

mongoose.connection.off("err",(err)=>{
    console.log("the connection is error ",err);
})

const userSchema = new mongoose.Schema({
    name : {type: String,required : true},
    email : {type:String,required : true, unique:true},
    password : {type : String, required:true},
    gender : {type : String,required : true},
    dob : {type : Date, required : true}
});

const User = mongoose.model('User',userSchema); 

const bookingSchema = new mongoose.Schema({
    email : {type:String, required: true},
    checkInDate : {type:Date, required : true},  
    checkOutDate : {type:Date, required : true},
    roomType : {type : String, required : true},
    numGuests : {type: Number, required : true}
})

const Bookings = mongoose.model('Bookings',bookingSchema);

console.log("New schema created....");

app.use(cors());


const fun = (req,res,next) =>{
    console.log("This is a middleware function");
    next();
}

app.get("/", (req, res) => {
    console.log("Root route was hit.");
    res.send("<h1>Hello from the server!</h1>");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(400).send({ message: 'Invalid password' });
        }
        
        res.status(200).send({
            email: user.email,
            name: user.name,
            gender: user.gender,
            dob: user.dob
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.post("/registration", async (req, res) => {
    const { name, email, password, gender, dob } = req.body;
    try {
        const newUser = new User({name,email,password,gender,dob});
        await newUser.save();
        res.status(200).send({message : "data saved successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).send({message : 'Error occured'});
    }
});

app.post("/bookings",async (req, res) => {
    const {checkInDate,checkOutDate,roomType,numGuests,email} = req.body;
    console.log(req.body);
    
    try {
        const newBooking = new Bookings({email,checkInDate,checkOutDate,roomType,numGuests});
        await newBooking.save();
        res.status(200).send({message:'booking added successfully'});
    } catch (error) {
        console.log(error);
        
    }
});

app.post("/history", async (req, res) => {
    const {email} = req.body;
    try {
        const bookings = await Bookings.find({email : email});
        console.log(bookings);
        res.status(200).send(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch bookings. Please try again later." });
        
    }
});

app.post("/profile", async (req, res) => {
    const {name , email , gender, dob} = req.body;
    try {
        const result = await User.updateOne({email : email},{
            $set : { name : name,gender : gender, dob : dob}
        });

        if(result.modifiedCount>0){
            res.status(200).send({message : "data updated successfully"})
        }
        else{
            res.status(400).send({message : "user not found"})
        }
    } catch (error) {
        console.log(error);
        
    }
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000...");
});
