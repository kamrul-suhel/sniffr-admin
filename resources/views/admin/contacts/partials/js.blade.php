<script type="text/javascript">
    $(document).ready(function(){
        $('#sniffr-create-contact').validate({
            rules: {
                full_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
            },

            messages: {
                full_name: 'Please enter your full named',
                email: 'Please enter a valid email'
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            },

            submitHandler: function(form) {
                $.ajax({
                    url: form.action,
                    type: form.method,
                    data: $(form).serialize(),
                    success: function(response) {
                        console.log('moo');
                        console.log(response);
                        $('#js-autocomplete-contact').val(response.contact_email);
                        $('#js-contact-id').val(response.contact_id);
                        $('#add_contact_modal').modal('hide');
                    },
                    error: function(response){
                        alert(response.responseJSON.errors.email[0]);
                    }
                });
            }
        });
    });
</script>