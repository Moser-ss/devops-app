const mongoose = require('mongoose');

const User = mongoose.model('User',{
    username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique:true
	}
})

module.exports = {
    User
}