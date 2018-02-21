
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function() {
    $('#upload-form').submit(function(){

        var formData = new FormData($(this)[0]);

        $.ajax({
            url: '/videocheck',
            type: 'POST',
            data: formData,
            async: false,
            headers: {
                "x-amz-sns-message-type":"SubscriptionConfirmation"
            },
            success: function (data) {
                console.log(data);
                // console.log(data.jobId);
                // console.log(data.input);
                // console.log(data.output);
            },
            cache: false,
            contentType: false,
            processData: false
        });

        return false;
    });
});
</script>

<form id="upload-form">
<!-- <textarea class="form-control" id="description" name="description"></textarea> -->
<input type="file" name="fileToUpload" id="fileToUpload">
<input type="submit" class="btn btn-primary" value="Submit">
</form>
