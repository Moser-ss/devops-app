const mongoose = require('mongoose');

const Gist = mongoose.model('Gist', {
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		index:true
	},
	html_url: {
		type: String,
		required: true,
	},
	viewed: {
		type: Boolean,
		default: false
	},
	github_ID :{
		type: String,
		required: true,
		unique:true
	}
})

module.exports = {
	Gist

}