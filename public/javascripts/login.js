$(document).ready(function() {
    const container = $('#container');
    const registerBtn = $('#register');
    const loginBtn = $('#login');

    registerBtn.on('click', function() {
        container.addClass('active');
    });

    loginBtn.on('click', function() {
        container.removeClass('active');
    });
});


$(document).ready(function() {
    $('#email').on('input', function() {
        var email = $(this).val();
        $.ajax({
            url: '/checkEmail',
            data: { email: email },
            success: function(data) {
                if (data.exists) {
                    $('#register-button').prop('disabled', true).css({
                        'background-color': '#ff7f6e',
                        'color': 'black'
                    });
                    $('#email').css('background-color', '#ffc0b8');
                    $('#email-error').text('Email already registered!').css('color', 'red');
                } else {
                    $('#register-button').prop('disabled', false);
                    $('#email').css('background-color', '#d7ffb8');
                    $('#register-button').css({
                        'background-color': '',
                        'color': ''
                    });
                    $('#email-error').text('Email is available!').css('color', 'green');
                }
            }
        });
    });
});