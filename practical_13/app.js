const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
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

app.delete("/friend/:id",async (req,res)=>{
  let { id } = req.params;
  let deletefri = await Data.findByIdAndDelete(id);
  // console.log(deletefri);
  let names = await Data.find().limit(10);
  res.render("index.ejs" , {names});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
