function onload() {
  console.log("Oh hi!");
}
//listen to shake event
// function shakes() {
  var shakeEvent = new Shake({threshold: 15});
  shakeEvent.start();
  window.addEventListener('shake', function() {
    // $("#result").html(`<p><img width="24" src="img/loading.svg"/>Loading...</p>`)

    // var city = document.getElementById('result').value;

    $.ajax({
      url: "https://icanhazdadjoke.com/",
      dataType: 'json'
    }).done(function(res) {
      renderResults(res);
    }).fail(function(jq, status, err) {
      showError(jq.status);
    })

  }, false);
// }

function renderResults(res) {
  // $("p.heading").css("display", "none");
  // $("#result").text(res.joke);
  $(".heading").html(`<div class="heading row">
      <div class="col-xs-12">
        <p class="joke-text">${res.joke}</p>
      </div>
    </div>`);
  $("#phone").html("");
  $("#instruct").html(`<p>Do you like it?<br> Keep it shakin'</p>`)
}

function showError(status) {
  alert("Error")
}

// stop listening
function stopShake(){
    shakeEvent.stop();
}

//check if shake is supported or not.
if (!("ondevicemotion" in window)) {
  alert("Not Supported");
}
