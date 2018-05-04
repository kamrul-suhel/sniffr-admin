<script>
    $ = jQuery;
    $(document).ready(function () {
        $('.delete').click(function (e) {
            e.preventDefault();
            if (confirm("Are you sure you want to delete this contact?")) {
                window.location = $(this).attr('href');
            }
            return false;
        });
    });
</script>