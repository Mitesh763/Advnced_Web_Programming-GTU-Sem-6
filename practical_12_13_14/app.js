const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path')
const app = express();
const PORT = 3000;

main().then(()=>{ console.log("Connection Successfull") }).catch((err) =>{ console.log(err) });
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/AWP");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

const Schema = mongoose.Schema;
const DataSchema = new Schema({
  name: String,
  email: String,
  password: String,
});
const Data = mongoose.model('Data', DataSchema);

app.get("/",(req,res)=>{
  res.send("root")
})

app.get("/friend", async (req,res)=>{
  let names = await Data.find().limit(10);
  res.render("index.ejs",{names});
});

app.post('/friend/new',async (req, res) => {
  let { name,email,password } = req.body;
  let add1 =  new Data({ name : name ,email:email,password:password});
  await add1.save()
  let names = await Data.find().limit(10);
  res.render("index.ejs" , {names});
});

// delete
app.delete("/friend/:id",async (req,res)=>{
  let { id } = req.params;
  let deletefri = await Data.findByIdAndDelete(id);
  // console.log(deletefri);
  let names = await Data.find().limit(10);
  res.render("index.ejs" , {names});
});

// edit
app.get("/friend/:id",async (req,res)=>{
  let {id} = req.params;
  let frd = await Data.findById(id);
  res.render("edit.ejs",{frd});
});

app.put("/friend/:id",async  (req,res)=>{
  let {id} = req.params;
  let {name,email,password} = req.body;
  console.log(name);
  await Data.findByIdAndUpdate(id,{name : name , email :email, password:password});
  let names = await Data.find().limit(10);
  res.render("index.ejs",{names});
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
