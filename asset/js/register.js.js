const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

String.prototype.isAlphabet = function () {
    return !!this.match(/^[a-zA-Z]*$/);
}

String.prototype.isEmail = function () {
    return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
}

String.prototype.isPassword = function () {
    return !!this.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/);
}

function checkRequired(inputs) {
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            // Error
            errorInput(input, `${getName(input)} is required`)
        } else {
            // Success
            successInput(input);
        }
    });
}

function getName(input) {
    // return input.id;
    return input.getAttribute("data-name");
}
function errorInput(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const p = formGroup.querySelector("p");
    p.innerHTML = message;
}
function successInput(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
    const p = formGroup.querySelector("p");
}

function checkLength(input, min, max) {
    const data = input.value.trim().length;
    if (data < min && data > 0) {
        errorInput(input, `${getName(input)} must be atleast minimum ${min} characters`);
    } else if (data > max) {
        errorInput(input, `${getName(input)} must be less than ${max} characters`);
    }
}

function checkConfirmPassword(password, password2) {
    const pass2 = password2.value.trim().length;
    if (pass2 > 0 && password.value != password2.value) {
        errorInput(password2, `${getName(password2)} does not match`);
    } else if (!password2.value.isPassword() && pass2 > 0 || pass2 > 0 && pass2 < 8 || pass2 > 25) {
        errorInput(password2, `${getName(password2)} does match with ${getName(password)}. But ${getName(password)} does not satisfy it's condition`);
    }
}

function checkEmail(input) {
    const email = input.value.trim();
    if (!email.isEmail() && email.length > 0) {
        errorInput(input, `This is not a valid email address`);
    }
}

function checkAlphabet(input, min, max) {
    const data = input.value.trim().length;
    const alpha = input.value.trim();
    if (!alpha.isAlphabet() && alpha.length > 0) {
        errorInput(input, `${getName(input)} must be alphabet`);
    } else if (alpha.isAlphabet() && alpha.length > 0) {
        if (data < min && data > 0) {
            errorInput(input, `${getName(input)} must be atleast minimum ${min} characters`);
        } else if (data > max) {
            errorInput(input, `${getName(input)} must be less than ${max} characters`);
        }
    }
}

function checkPassword(input, min, max) {
    const data = input.value.trim().length;
    const pass = input.value.trim();
    if (data < min && data > 0) {
        errorInput(input, `${getName(input)} must be atleast minimum ${min} characters`);
    } else if (data > max) {
        errorInput(input, `${getName(input)} must be less than ${max} characters`);
    } else if (data != 0) {
        if (!pass.isPassword()) {
            errorInput(input, `${getName(input)} must be atleast one capital letter, one samll letter, one number and one symbols`);
        }
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkAlphabet(username, 3, 25);
    // checkLength(username, 3, 25);
    checkEmail(email);
    // checkLength(password, 8, 15);
    checkPassword(password, 8, 15);
    checkConfirmPassword(password, password2);
})