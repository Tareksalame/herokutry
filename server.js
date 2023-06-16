const express = require('express')
const app = express()
const bp = require('body-parser')
const db = require('mongoose')

app.use(express.static('pages'))
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
db.connect('mongodb+srv://tareqsalame:Ilovesimba11@tarek.tskgvib.mongodb.net/barberShop');

const costumerSchema = db.Schema({
    name:String,
    phoneNumber:Number,
})
const reservationSchema = db.Schema({
    name:String,
    phoneNumber:Number,
    date:String,
    time:String
})
const reservationModel = db.model('reservation',reservationSchema)
const costumerModel = db.model('costumer' , costumerSchema)
app.get('/', (req,res)=>
{
    res.sendFile(__dirname + '/pages/index.html')
})
app.get('/signup' ,(req,res)=>
{
    res.sendFile(__dirname + '/pages/signup.html')
})
app.get('/barber', (req,res)=>
{
    res.sendFile(__dirname + '/pages/homePage.html')
})
app.get('/myQueues' , (req,res)=>
{
    res.sendFile(__dirname + '/pages/myQueues.html')
})
app.get('/Admin' , (req,res)=>
{
    res.sendFile(__dirname + '/pages/adminPage.html')
})
app.post('/' , async(req,res)=>
{
    let name = req.body.name
    let phoneNumber = req.body.phoneNumber
    const result = await costumerModel.findOne({
        name:name,
        phoneNumber:phoneNumber
    })
    // console.log(result)
    if(result == null)
    {
        res.json(result)
    }
    else
    {
        res.json(result)
    }
})
app.post('/signup' , async(req,res)=>
{
    let name = req.body.name
    let phoneNumber = req.body.phoneNumber
    const result = await costumerModel.findOne({
        name:name,
        phoneNumber:phoneNumber
    })
    // console.log(result)
    if(result == null)
    {
        costumerModel.insertMany({
            name:name,
            phoneNumber:phoneNumber
        })
        res.json(result)
    }
    else
    {
        res.json(result)
    }
})
app.post('/deleted' , async(req,res)=>
{
    let name = req.body.name
    let phoneNumber = req.body.phoneNumber
    let date = req.body.date
    let time = req.body.time
    let result = await reservationModel.findOneAndDelete({
        name : name ,
        phoneNumber : phoneNumber,
        date : date,
        time : time
    })
    // console.log(result)
    res.json(result)
})
app.post('/done', async(req,res)=>
{
    let name = req.body.name
    let phoneNumber = req.body.phoneNumber
    let date = req.body.date
    let time = req.body.time
    const result = await reservationModel.findOne({
        date : date,
        time : time
    })
    if(result == null)
    {
        reservationModel.insertMany({
            name:name,
            phoneNumber:phoneNumber,
            date:date,
            time:time
        })
        res.json(result)
    }
    else
    {
        res.json(result);
    }
})
app.post('/times' , async(req,res)=>
{
    let date = req.body.date;
    let result = await reservationModel.find({
        date:date
    })
    res.json(result)
})
app.post('/myQueues' , async(req,res)=>
{
    let name = req.body.name
    let phoneNumber = req.body.phoneNumber;
    let result = await reservationModel.find({
        name:name,
        phoneNumber:phoneNumber
    })
    res.json(result)
})


app.listen(process.env.PORT || 2023, () => console.log('Server running on port', process.env.PORT || 2023));
