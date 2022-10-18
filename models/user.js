var mongoose = require("mongoose");

var userInfo = new mongoose.Schema(
{
	firstName: {
		type: String,
		optional: false,
		required: true,
        trim:true
	},
	lastName:{
		type: String,
		trim:true,
		optional: true,
        trim:true
	},
    address_line_1: {
		type: String,
		optional: true,
		required: true,
        trim:true
	},
    address_line_2:{
        type: String,
		optional: true,
		required: true,
        trim:true
    },
    date_of_birth:{
        type: Date,
        default: new Date()
    },
    mobile_number: {
		type: Number,
        default:0
	},
    email:{
        type: String,
        optional: false,
		required: true,
        trim:true
    },
    city: {
		type: String,
        optional: true,
		required: true,
        trim:true
	},
    state: {
		type: String,
        optional: true,
		required: true,
        trim:true
	},
    pin_code: {
		type: Number,
        optional: true,
		required: true,
        trim:true
	},
    password:{
        type: String,
        optional: true,
		required: true,
        trim:true
    },
	isDelete:{
		type: Boolean,
		default:false
	}
},
	{ timestamps: true }
);
module.exports = mongoose.model("UserInfo", userInfo);