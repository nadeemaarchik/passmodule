const userModel =  require("../models/user");
var emailValidator = require("email-validator");
var PhoneNumberValidator = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const bcrypt = require("bcrypt");
exports.registerUser = async (req, res)=>{
    const newUser = req.body;
    const email = newUser.email;
    const mobile_number = newUser.mobile_number;
    const firstName = newUser.firstName;
    const lastName = newUser.lastName;
    const address_line_1 = newUser.address_line_1;
    const address_line_2 = newUser.address_line_2;
    const date_of_birth = newUser.date_of_birth;
    const city = newUser.city;
    const state = newUser.state;
    const pin_code =newUser.pin_code;
    const password = newUser.password;
    var emailValidation = await emailValidator.validate(email);
    if(!emailValidation)
        return res.json({
            status:false,
            message:"Please Enter Valid Email."
        });
    if(!PhoneNumberValidator.test(mobile_number))
        return res.json({
            status:false,
            message:"Please Enter Valid Mobile Number."
        });
    if(new Date() <  new Date(date_of_birth)){
        console.log("done",new Date(),"new Date(date_of_birth)",new Date(date_of_birth));
        return res.status(400).json({
            error: "Please Enter Vaild Your Date Of Birth"
        });
    }
    userModel.findOne({email},async(err,userDetails)=>{
        if (err) {
            return res.status(400).json({
                error: "USER email does not exists"
            });
        }
        else{
            if(userDetails !== null){
                return res.json({
                    status:0,
                    message:"Email Already Exist."
                });
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                var userBody = new userModel({
                    email:email,
                    firstName:firstName,
                    lastName:lastName,
                    city:city,
                    state:state,
                    pin_code:pin_code,
                    mobile_number:mobile_number,
                    date_of_birth: date_of_birth,
                    address_line_1:address_line_1,
                    address_line_2:address_line_2,
                    password: hashedPassword
                })
                userBody.save((err,userSave)=>{
                    console.log("errrr",err);
                    if (err) {
                        return res.status(400).json({
                        error: "not connect to DB"
                        });
                    }
                    else{
                        return res.status(200).json(userSave);
                    }
                }); 
            }
        }
    });
}
exports.loginUser = async (req, res)=>{
    const user = req.body;
    const email = user.email;
    const password = user.password;
    userModel.findOne({email},async(err,userData)=>{
        if(err){
            return res.status(400).json({
                error: "USER email does not exists"
            });
        }
        else{
            if(userData == null || userData == undefined){
                return res.status(400).json("User not Exist.");
            }
            else{
                const isPasswordValid = await bcrypt.compare(password, userData.password);
                console.log("isPasswordValid",isPasswordValid);
                if (!isPasswordValid)
                    return res.status(200).json("Incorrect Username or Password");    
                else{
                    return res.status(200).json("User successfully logged in")
                }
            }
        }
    })
}