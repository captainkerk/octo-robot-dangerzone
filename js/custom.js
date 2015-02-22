$("#updateSubmit").click(function(event){
            // abort any pending request
            if (request) {
                request.abort();
            }
            
            $("#submitBtn").prop("disabled",true);

            var requestType = "update";

            if($("#deleteModelCheckbox").is(":checked")) {
                requestType = "delete";
            }

            request = $.ajax({
                url: "/updateUser",
                type: "post",
                dataType: 'script',
                contentType: false,
                processData: false,
                data: jsonData
            });


            // callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR){
                // log a message to the console
                $("#notificationCenter").append('<div class="alert alert-success">Success! Model updated!</div>');
                $(".form-control").val("");
            });

            // callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown){
                alert("errrr");
                $("#notificationCenter").append('<div class="alert alert-danger">Model update failed.</div>');
            });

            // callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // reenable the inputs
                $("#submitBtn").prop("disabled",false);
            });

            // prevent default posting of form
            event.preventDefault();
        });
