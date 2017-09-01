$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $('#Contact button[type=submit] .loading').css('display', 'block');
            $.ajax({
                url: "https://api.gpolek.com/v1/emails",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                headers: {
                  "X-API-Key": "a7kBeP3fK66KHGFCNmQ2D2NZlqv27qF13ZgPzwKB"
                },
                beforeSend: function(xhr){
                  xhr.setRequestHeader('X-API-Key', 'a7kBeP3fK66KHGFCNmQ2D2NZlqv27qF13ZgPzwKB');
                },
                dataType: 'json',
                data: JSON.stringify({
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                }),
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    // hide loader
                    $('#Contact button[type=submit] .loading').css('display', 'none');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');

                    // hide loader
                    $('#Contact button[type=submit] .loading').css('display', 'none');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
