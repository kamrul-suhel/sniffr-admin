<script type="text/javascript">
    $(document).ready(function(){
        $('#sniffr-create-contact').validate({
            rules: {
                full_name: {
                    required: true
                },
                email: {
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
                        var contact = response.contact_email ? response.contact_email : response.contact_name;
                        $('#js-autocomplete-contact').val(contact);
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