const express = require('express');
const app = express();
const port = 1100
const ejs = require('ejs');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const studentsArray = []
let URI = "mongodb+srv://olawoledotun85:<db_fish2003>@cluster0.ljcys.mongodb.net/student_db?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URI).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log(err);
})

const studentSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    creationDate: {type: Date, default: Date.now}
})

// Create A Model
const studentModel = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/result', (req,res) => {
    studentsArray.push(req.body);
    res.render('result', {studentsArray: studentsArray});
    console.log(req.body);
    let form = new studentModel(req.body);
    form.save().then(() => {
        console.log("Data saved to database");
    }).catch((err) => {
        console.log("error dey in code ogbeni");
        console.log(err);
        
    })
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index
    studentsArray.splice(index, 1)
    res.render("result", { studentsArray: studentsArray })
})

app.get('/result', (req, res) => {
    res.render('result', {studentsArray: studentsArray});
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
