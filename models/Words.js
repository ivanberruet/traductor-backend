const mongoose = require('mongoose')
const WordSchema = new mongoose.Schema({
	spanishValue: {type:String},
	italianValue: {type:String}
})

const WordModel = mongoose.model("words", WordSchema)
module.exports = WordModel