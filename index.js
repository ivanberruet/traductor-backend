const express = require('express')
const app = express()
const password = 'Paq20231'
const mongoose = require('mongoose')
const WordModel = require('./models/Words')
require("dotenv").config()

const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://ivanberruet95:${password}@cluster0.vi4sk3x.mongodb.net/traductor-angie?retryWrites=true&w=majority`)


//==== GET ALL WORDS
app.get("/getWords", async (req,res)=>{
	try {
		const words = await WordModel.find({})
		res.json(words)
	} catch (error) {
		console.log(error);
	}
})
//==== ADD WORD
app.post("/addWord", async (req,res)=>{
	try {
		const data = req.body 
		const newData = new WordModel(data)
		await newData.save()
		res.json(newData)
	} catch (error) {
		console.log(error);	
	}
})
//==== DELETE WORD
app.delete("/delete/:id", async (req,res)=>{
	try {
		const result = await WordModel.deleteOne({_id:req.params.id})
		res.json(result)
	} catch (error) {
		console.log(error);	
	}
})
//==== EDIT WORD
app.put("/edit/:id", async (req,res)=>{
	try {
		const result = await WordModel.updateOne(
			{_id:req.params.id},
			{
				spanishValue: req.body.spanishValue,
				italianValue: req.body.italianValue
			})
		res.json(result)
	} catch (error) {
		console.log(error);	
	}
})



app.listen(process.env.PORT || 3001, ()=>{	
	console.log("Server running")
})