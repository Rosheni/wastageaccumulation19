var mongoose = require('mongoose');
var regiforms = mongoose.model("regiform", {
	"UserName": String,
	"Password": String,
	"MailId": String,
	"MobileNumber": String,
	"VehicleNumber": String,
	})
var userforms = mongoose.model("userform",{
	"Username" : String,
	"Password" : String,
	"Email" : String,
	"Mobile" : String,
	"vehicle" : String,
	"Role" : String,
	"available" : String	

})

var assigned = mongoose.model("assign",{
	"driveremail" : String,
	"drivernumber":String,
	"image":String,
	"loc":String,
	"usermail":String
})

var tranforms = mongoose.model("tranform",{
	"Username" : String,
	"Password" : String,
	"Email" : String,
	"Mobile" : String,
	"Vehicle" : String
})
var complaints = mongoose.model("complaint",{
	"for" : String,
	"Email" : String,
	"image": String,
	"location":String
})
var completed = mongoose.model("completed",{
	"driveremail" : String,
	"drivernumber":String,
	"image":String,
	"loc":String,
	"usermail":String
})

var pushcameras = mongoose.model("pushcamera",{ 
	"img" : String,
	"lat" : String,
	"long" : String
	
})

module.exports = {
	regiform : regiforms,
	userform : userforms,
	tranform :  tranforms,
	pushcamera : pushcameras,
	complaint : complaints,
	assign:assigned,
	complete:completed
}


