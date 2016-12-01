$(document).ready(function() {
    $.ajax({
      type: "GET",
      url: "/user",
      dataType: "json",
      data: " ",
      success: function(data) {
        $.getJSON('/user', function(data) {
          var name = data.username;
          console.log(name);
          document.getElementById("userInfo").innerHTML = "Welcome " + name + "!";
      })
    }
  });
});
