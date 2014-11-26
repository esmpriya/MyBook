function displayImage(fileInput) {

    var reader = new FileReader();
    reader.onloadend = function() {
        var output = document.getElementById('profile-img');
        output.src = reader.result;
    };

    reader.readAsDataURL(fileInput.files[0]);
}

function onNameChange() {

    var name = document.getElementById('name').value;
    if (name === undefined || name === '') {
        return alert("Please fill valid name...!");
    }

    if (name.length > 50) {
        return alert("Error: Name should not exceeds 50 character...!");
    }

    enableSave();
}

function onAgeChange() {

    var age = document.getElementById('age').value;
    if (age === undefined || age === '') {
        return alert("Please fill valid Age...!");
    }

    // if (!(typeof age === 'number' && !isNaN(age))) {
    if (isNaN(age)) {
        return alert("Error: Age should be in numeric...!");
    }

    if (age < 0 || age > 100) {
        return alert("Error: Age limitation is 0 to 100...!");
    }

    enableSave();
}

function onPhoneChange() {

    var phone = document.getElementById('phone').value;
    if (phone === undefined || phone === '') {
        return alert("Please fill valid Phone number...!");
    }

    if (isNaN(phone)) {
        return alert("Error: Phone number should be in numeric...!");
    }

    if (phone.length < 5 || phone.length > 12) {
        return alert("Phone numbers required atlest 5 characters and not more than 12 ...!");
    }

    enableSave();
}

function onEmailChange() {
    enableSave();
}

function enableSave() {
    if (!document.getElementById('name').value  ||
        !document.getElementById('age').value   ||
        !document.getElementById('phone').value ||
        !document.getElementById('email').value) {
        return;
    }

    document.getElementById('save').disabled = false;
}
