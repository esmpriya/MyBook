"use strict";

function login() {

	var username = document.signInForm.username;
	var password = document.signInForm.password;

	if (username.value == '' || username.value == 'User name') {
		alert("Error: Username cannot be blank!");
		username.focus(); //TODO: directly call focusUsername();
		return false;
	}

	if (username.value.length < 4 || username.value.length > 8) {
		alert("Error: Username must contain atleast 4 characters and should not exceeds 8 characters!");
		username.focus();
		return false;
	}

	if (password.value == '' || password.value == 'Password') {
		alert("Error: Password cannot be blank!");
		password.focus();
		return false;
	}

	if (password.value.length < 6) {
		alert("Error: Password must contain at least six characters!");
		password.focus();
		return false;
	}

	if (username.value === 'priya' && password.value === 'selvam') {
		return true;
	}

	alert("Please enter expected credentials...!");
	return false;


	// alert("Successfully logged in");

	// similar behavior as an HTTP redirect
	// window.location.replace("main.html");
}
