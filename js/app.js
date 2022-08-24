const usernameEl = document.querySelector('#username');
var lastnameEL = document.querySelector('#lastname');
const emailEl = document.querySelector('#email');
var xhr = new XMLHttpRequest();
const url="google.com";

const form = document.querySelector('#signup');


const checkUsername = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    }else if(!isUsernameValid(username)){
        showError(usernameEl, 'Name can only containe alphabets')
    }else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () =>{
    let valid = false;
    const min = 3,
        max = 25;
    const lastname = lastnameEL.value.trim();
    if (!isRequired(lastname)) {
        showError(lastnameEL, 'Last name cannot be blank.');
    }else if(!isLastnameValid(lastname)){
        showError(lastnameEL, 'Name can only containe alphabets')
    }else if (!isBetween(lastname.length, min, max)) {
        showError(lastnameEL, `Last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastnameEL);
        valid = true;
    }
    return valid;
}


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const isUsernameValid = (fname) => {
    let regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(fname);
}

const isLastnameValid =(lname)=>{
    let regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(lname);
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),isLastnameValid = checkLastName();
    
    let isFormValid = isUsernameValid && isEmailValid &&
    isLastnameValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        let name = usernameEl.value;
        let lname = lastnameEL.value;
        let email = emailEl.value;
        
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
        value: {name, lname, email}
        }))
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'lastname':
            checkLastName();
            break;
    }
}));