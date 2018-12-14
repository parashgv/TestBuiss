$(function() {
	$('#btnVerify').click(function(e){
		if ($('#btnVerify').text() == 'Sent OPT') {
			console.log('Sent OPT')
		var moNo = $('#txtMobileNo').val();
		if (moNo.length != 10) {
			$('#txtErr').text('Please enter a valied mobile number');
			return;
		}
		$('#txtErr').text('');
	 	e.preventDefault();
	 	var l = Ladda.create(this);
	 	l.start();
	 	$.post("/verifyMobile", 
	 	    { data : moNo },
	 	  function(response){
	 	    console.log(response);
	 	    if (response.status == 'err') {
	 	    	$('#txtErr').text(response.msg)
	 	    }else if (response.status == 'verified') {
	 	    	$('#txtErr').text(response.msg);
	 	    	$('#txtCode').val('');
	 	    	$('#txtErr').removeClass('txtErr')
				$('#txtErr').addClass('txtSucc')
	 	    	$('#btnVerify').text('Verify Email')

	 	    	$('#divPhn').slideDown("slow", function() {
			    });
			    $('#divCode').slideUp("slow", function() { 
			    });
			    $('#divEmail').slideDown("slow", function() { 
			    });
	 	    	$('#txtMobileNo').prop('disabled', true);
	 	    }else{
	 	    	$('#btnVerify').text('Verify OTP')
	 	    	$('#divPhn').slideUp("slow", function() { 
			    });

			    $('#divCode').slideDown("slow", function() { 
			    });
	 	    }
	 	  }, "json")
	 	.always(function() { l.stop(); });
	 	return false;
	 }else if($('#btnVerify').text() == 'Verify OTP'){
	 	console.log('Verify OTP')
		var otp = $('#txtCode').val();
		if (otp.length != 6) {
			$('#txtErr').text('Please enter 6 digit OTP number');
			return;
		}
		$('#txtErr').text('');
		e.preventDefault();
	 	var l = Ladda.create(this);
	 	l.start();
	 	$.post("/verifyOTP", 
	 	    { data : otp },
	 	  function(response){
	 	    console.log(response);
	 	    if (response.status == 'err') {
	 	    	$('#txtErr').text(response.msg)
	 	    }else{
	 	    	$('#txtErr').text('');
	 	    	$('#txtCode').val('');
	 	    	$('#btnVerify').text('Verify Email')

	 	    	$('#divPhn').slideDown("slow", function() {
			    });
			    $('#divCode').slideUp("slow", function() { 
			    });
			    $('#divEmail').slideDown("slow", function() { 
			    });
	 	    	$('#txtMobileNo').prop('disabled', true);
	 	    }
	 	  }, "json")
	 	.always(function() { l.stop(); });
	 	return false;
	 }else if($('#btnVerify').text() == 'Verify Email'){
	 	console.log('Verify Email')
		var txtEmail = $('#txtEmail').val();
		if (!validateEmail(txtEmail) || txtEmail.length < 1 ) {
			$('#txtErrEmail').text('Please enter valied Email');
	 	    $('#txtErrEmail').removeClass('txtSucc')
			$('#txtErrEmail').addClass('txtErr')
			return;
		}
		$('#txtErr').text('');
		e.preventDefault();
	 	var l = Ladda.create(this);
	 	l.start();
	 	$.post("/verifyEmail", 
	 	    { data : txtEmail },
	 	  function(response){
	 	    console.log(response);
	 	    if (response.status == 'err') {
	 	    	$('#txtErrEmail').text(response.msg)
	 	    }else if (response.status == 'verified') {
	 	    	$('#txtErrPass').text(response.msg);
	 	    	$('#txtErrPass').addClass('txtSucc')
	 	    	$('#txtCode').val('');
	 	    	$('#divMobile').slideUp("slow", function() { 
			    });

			    $('#divPass').slideDown("slow", function() { 
			    });
	 	    }else{
	 	    	$('#btnVerify').text('Verify Email OTP')
	 	    	$('#txtErrEmail').text(response.msg);
	 	    	$('#txtErrEmail').removeClass('txtErr')
	 	    	$('#txtErrEmail').addClass('txtSucc')
	 	    	$('#divEmail').slideUp("slow", function() { 
			    });

			    $('#divCode').slideDown("slow", function() { 
			    });
	 	    	
	 	    }
	 	  }, "json")
	 	.always(function() { l.stop(); });
	 	return false;
	 }
	 else if($('#btnVerify').text() == 'Verify Email OTP'){
	 	console.log('Verify Email OTP')
		var otp = $('#txtCode').val();
		if (otp.length != 6) {
			$('#txtErrEmail').text('Please enter 6 digit OTP number');
	 	    $('#txtErrEmail').removeClass('txtSucc')
			$('#txtErrEmail').addClass('txtErr')
			return;
		}
		$('#txtErrEmail').text('');
		e.preventDefault();
	 	var l = Ladda.create(this);
	 	l.start();
	 	$.post("/verifyEmailOTP", 
	 	    { data : otp },
	 	  function(response){
	 	    console.log(response);
	 	    if (response.status == 'err') {
	 	    	$('#txtErrEmail').text(response.msg)
	 	    	$('#txtErrEmail').removeClass('txtSucc')
				$('#txtErrEmail').addClass('txtErr')
	 	    }else{
	 	    	$('#txtErrEmail').text('');
	 	    	$('#txtErrPass').text(response.msg);
	 	    	$('#txtErrPass').addClass('txtSucc')
	 	    	$('#txtCode').val('');
	 	    	$('#divMobile').slideUp("slow", function() { 
			    });

			    $('#divPass').slideDown("slow", function() { 
			    });
	 	    }
	 	  }, "json")
	 	.always(function() { l.stop(); });
	 	return false;
	 }
	});

	function validateEmail($email) {
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  return emailReg.test( $email );
	}



	$('#btnPass').click(function(e){
		var pass = $('#txtPass').val();
		var repass = $('#txtRePass').val();
		$('#txtErrPass').text('')
		if ( pass != repass ) {
			$('#txtErrPass').text('Please enter currect password!');
			 $('#txtErrPass').removeClass('txtSucc')
			$('#txtErrPass').addClass('txtErr')
			return;
		}

		e.preventDefault();
	 	var l = Ladda.create(this);
	 	l.start();
	 	$.post("/createPassword", 
	 	    { data : pass },
	 	  function(response){
	 	    console.log(response);
	 	    if (response.status == 'err') {
	 	    	$('#txtErrPass').text(response.msg)
	 	    	$('#txtErrPass').removeClass('txtSucc')
				$('#txtErrPass').addClass('txtErr')
	 	    }else{
	 	    	$('#txtErrPass').text(response.msg)
	 	    	$('#txtErrPass').removeClass('txtErr')
				$('#txtErrPass').addClass('txtSucc')
	 	    }
	 	  }, "json")
	 	.always(function() { l.stop(); });

	});
});