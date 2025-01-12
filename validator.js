$(document).ready(function() {
    // getting form values
    const usernameEl = $('#username');
    const emailEl = $('#email');
    const passwordEl = $('#password');
    const confirmPasswordEl = $('#confirm-password');
    const form = $('#signup');

    // validation for username
    const checkUsername = () => {
        let valid = false;
        const min = 3, max = 25;
        const username = usernameEl.val().trim();

        if (!isRequired(username)) {
            showError(usernameEl, 'Username cannot be blank.');
        } else if (!isBetween(username.length, min, max)) {
            showError(usernameEl, `Username must be between ${min} and ${max} characters.`);
        } else {
            showSuccess(usernameEl);
            valid = true;
        }
        return valid;
    };

    // validation for email
    const checkEmail = () => {
        let valid = false;
        const email = emailEl.val().trim();

        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be blank.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Email is not valid.');
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    };

    // validation for password
    const checkPassword = () => {
        let valid = false;
        const password = passwordEl.val().trim();

        if (!isRequired(password)) {
            showError(passwordEl, 'Password cannot be blank.');
        } else if (!isPasswordSecure(password)) {
            showError(passwordEl, 'At least 8 characters with at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character.');
        } else {
            showSuccess(passwordEl);
            valid = true;
        }
        return valid;
    };

    // validation for confirm password
    const checkConfirmPassword = () => {
        let valid = false;
        const confirmPassword = confirmPasswordEl.val().trim();
        const password = passwordEl.val().trim();

        if (!isRequired(confirmPassword)) {
            showError(confirmPasswordEl, 'Please enter the password again.');
        } else if (password !== confirmPassword) {
            showError(confirmPasswordEl, 'The password does not match.');
        } else {
            showSuccess(confirmPasswordEl);
            valid = true;
        }
        return valid;
    };

    // validate email with regular expression
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // validate password with regular expression
    const isPasswordSecure = (password) => {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return re.test(password);
    };

    // return false if te value is empty, else true
    const isRequired = value => value === '' ? false : true;
    // return false if the value is greather than max or less than min, else true
    const isBetween = (length, min, max) => length < min || length > max ? false : true;

    // add error class and insert error message text to small tag
    const showError = (input, message) => {
        const formField = input.parent();
        formField.removeClass('success').addClass('error');
        const messageText = formField.parent();
        const error = messageText.find('small');
        error.text(message);
    };

    // add success class and remove error message text from small tag
    const showSuccess = (input) => {
        const formField = input.parent();
        formField.removeClass('error').addClass('success');
        const messageText = formField.parent();
        const error = messageText.find('small');
        error.text('');
    };

    // event listener
    form.on('submit', function(e) {
        e.preventDefault();
        let isUsernameValid = checkUsername(),
            isEmailValid = checkEmail(),
            isPasswordValid = checkPassword(),
            isConfirmPasswordValid = checkConfirmPassword();
        // will true if all are valid
        let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
        // if the form is valid
        if (isFormValid) {
            // added modal box to display success message box to user
            let successBox = $('<div>', {
                class: 'modal fade show',
                id: 'successModal',
                tabindex: '-1',
                'data-bs-backdrop': 'static',
                'data-bs-keyboard': 'false',
                'aria-labelledby': 'successModalLabel',
                'aria-hidden': 'true'
            });

            let successDialog = $('<div>', { class: 'modal-dialog modal-dialog-centered' });
            let successContent = $('<div>', { class: 'modal-content' }).html(`
                <div class="modal-header bg-success text-white">
                    <h1 class="modal-title fs-5" id="successModalLabel">Registration Status</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-light">
                    <p>Your Account has been successfully registered to the DoBu Martial Art's.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="loginButton"> Login </button>
                </div>
            `);

            successBox.append(successDialog);
            successDialog.append(successContent);
            $('body').append(successBox);

            let modal = new bootstrap.Modal(successBox[0]);
            modal.show();
            
            // if user click close button in modal, it will hide
            let closeButton = successBox.find('.btn-close');
            closeButton.on('click', function() {
                modal.hide();
            });

            // if user click login button, it will redirect to Login page
            let loginButton = successBox.find('#loginButton');
            loginButton.on('click', function() {
                window.location.href = 'Login.html';
            });
        }
    });

    // to limits how often the validation functions are called as the user types,
    const debounce = (fn, delay = 500) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn.apply(null, args);
            }, delay);
        };
    };

    form.on('input', debounce(function(e) {
        switch (e.target.id) {
            case 'username':
                checkUsername();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
            case 'confirm-password':
                checkConfirmPassword();
                break;
        }
    }));
});



