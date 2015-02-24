function getUsers() {
    var users = [];
    $('#monitors-users').html('');

    request=$.get( '/users', function( data ) {
        for(i = 0; i < data.length; i++) {
            var user = new Object();
            user = data.users[i];
            users.push(user);
        }
        $('#monitors-users').append('<div class="up">Database monitor is reporting ok.</div>');
    });

    request.error(function(jqXHR, textStatus, errorThrow){
        $('#monitors-users').append('<div class="down">Database monitor is down.</div>');
    });
    request.always(function () {
        drawUsers(users);
    });
}

function drawUsers(users) {
    $('#users-result').empty();
    users.forEach(function(user) {

        var keyArray = Object.keys(user.user);

        var strToPrint = '<li>';

        var username = '';
        var userdata = '';

        for(k = 0; k < keyArray.length; k++)
        {
            if(keyArray[k] != 'UserID'){
                if(keyArray[k] == 'Username') {
                    username = '<h4>' + keyArray[k] + ': ' + user.user[keyArray[k]] + '</h4>';
                }
                else {
                    userdata += keyArray[k] + ': ' + user.user[keyArray[k]];
                    userdata += '<br>';
                }
            }
        }

        strToPrint += username + userdata + '</li>';

        $('#users-result').append(strToPrint);
    });
}

function monitors() {
    hc1=$.get( '/hc1', function( data ) {
        $('#monitors-result1').append('<div class="up">Monitor #1 is reporting ok.</div>');
    });
    hc1.error(function(jqXHR, textStatus, errorThrow){
        $('#monitors-result1').append('<div class="down">Monitor #1 is down.</div>');
    });

    hc2=$.get( '/hc2', function( data ) {
        $('#monitors-result2').append('<div class="up">Monitor #2 is reporting ok.</div>');
    });
    hc2.error(function(jqXHR, textStatus, errorThrow){
        $('#monitors-result2').append('<div class="down">Monitor #2 is down.</div>');
    });
}

function initUpdateUsers() {

    updateUsersList.length = 0;

    var initializeUpdateUsers=$.get( '/users', function( data ) {
        for(i = 0; i < data.length; i++) {
            var user = new Object();
            user = data.users[i];
            user.position = i;
            updateUsersList.push(user);
        }

        $('#updateUserSelector').empty();
        $('#updateUserSelector').append('<option value=""></option>');
    });
    initializeUpdateUsers.error(function(jqXHR, textStatus, errorThrow){

    });
    initializeUpdateUsers.always(function() {
        updateUsersList.forEach(function(user) {
            $('#updateUserSelector').append('<option value="' + user.position + '">' + user.user.Username + '</option>');
        });
    });
}
