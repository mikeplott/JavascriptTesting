$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();
        var uName = $('input[name=name]').val();
        var pass = $('input[name=pwd]').val();
      $.ajax({
          url: '/login',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            username:uName,
            password:pass}),
          success: function(data){
            var theData = data;
            console.log(theData);
            alert("You are about to be redirected");
            window.location.href="profile.html";
          },
          error: function() {
            console.log("Get fucked");
          }
      });
    });
});
