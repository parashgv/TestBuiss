/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  login: function(req, res){

	
  	return res.view('pages/homepage',{layout: null})
  },

  verifyMobile: function(req, res){
  	var phn = req.param('data')
  	console.log(phn)
  	var db = sails.getDatastore().manager;
	db.collection('COL_USER_MASTER').findOne({ phone: phn }, function(err, result) {
	    if (err) throw err;
	    else{
	    	req.session.phn = phn;
	    	console.log(result);
	    	if (result != null) {
	    		if (result.verifyPhone) 
		  			return res.json({status: 'verified', msg: 'This mobile number verified'})
		  		else
		  			return res.json({status: 'err', msg: 'This mobile number is already exist'})
		  	}else{
		  		// otp sent code here
		  		return res.json({status: 'success',msg:'OTP sent successfully'})
		  	}
	    }
	    db.close();
	  });
  },


	verifyOTP: function(req, res){
	  	var otp = req.param('data')
	  	console.log(otp)
	  	if (otp == '123456') {
	  		var data = { 
	  			phone: req.session.phn, 
	  			verifyPhone: true 
	  		}
	  		var db = sails.getDatastore().manager;
	  		db.collection('COL_USER_MASTER').insertOne(data, function(err, result) {
	  			if (err) throw err;
			    else{
	  				return res.json({status: 'success', msg: 'OTP verify success'})
			    }
	  			db.close();
	  		});
	  	}else{
	  		return res.json({status: 'err', msg: 'OTP Not Matched'})
	  	}
  	},
  	
	verifyEmailOTP: function(req, res){
	  	var otp = req.param('data')
	  	console.log(otp)
	  	if (otp == '123456') {
	  		var data = { $set : { email : req.session.email, verifyEmail: true } }
	  		var db = sails.getDatastore().manager;
	  		console.log(req.session.phn)
	  		db.collection('COL_USER_MASTER').updateOne({phone: req.session.phn}, data, function(err, result) {
	  			if (err) throw err;
			    else{
			    	console.log(result)
	  				return res.json({status: 'success', msg: 'Mobile number and email id is verified'})
			    }
	  			db.close();
	  		});
	  	}else{
	  		return res.json({status: 'err', msg: 'OTP Not Matched'})
	  	}
  	},

	verifyEmail: function(req, res){
	  	var email = req.param('data')
	  	console.log(email)
	  	var data = { 
	  			email: email
	  		}
  		var db = sails.getDatastore().manager;
	  	db.collection('COL_USER_MASTER').findOne(data, function(err, result) {
	    if (err) throw err;
	    else{
	    	console.log(result);
	    	if (result != null) {
	    		console.log(req.session.phn)
	    		if (result.phone == req.session.phn) {
	    			if (result.verifyEmail){
	    				return res.json({status: 'verified', msg: 'Mobile number and email id is verified'})
	    			}else{
	    				req.session.email = email;
		  				return res.json({status: 'success',msg:'OTP sent successfully to '+ email })
	    			}
	    		}else{
	    			return res.json({status: 'err', msg: 'This email id is already exist'})
	    		}
		  	}else{
		  		// otp sent code here
		  		req.session.email = email;
		  		return res.json({status: 'success',msg:'OTP sent successfully to '+ email })
		  	}
	    }
	    db.close();
	  });
  	},

  	createPassword: function(req, res){
	  	var pass = req.param('data')
	  	console.log(pass)
  		var data = { $set : { passwd : pass, status: true } }
  		var db = sails.getDatastore().manager;
  		console.log(req.session.phn)
  		db.collection('COL_USER_MASTER').updateOne({phone: req.session.phn}, data, function(err, result) {
  			if (err){
  				return res.json({status: 'err', msg: err})
  			}
		    else{
		    	console.log(result)
  				return res.json({status: 'success', msg: 'Password successfully created!'})
		    }
		    db.close();
  		});
  		
  	},

};

