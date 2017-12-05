function onload() {
  console.log("Oh hi!");
}
//listen to shake event
// function shakes() {
var shakeEvent = new Shake({
  threshold: 15
});
shakeEvent.start();
window.addEventListener('shake', function() {
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
  var colors = ['#5D4037', '#BF360C', '#1B5E20', '#01579B', '#283593', '#4A148C', '#880E4F', '#004D40'];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  $(".heading").html(`
      <div class="col-xs-12">
        <p class="joke-text">${res.joke}</p>
      </div>`);
  $('.joke-text').css('color', random_color);
  $("#phone").html("");
  $("#instruct").html(`<p>Do you like it?<br> Keep it shakin'</p>`)
}

function showError(status) {
  alert("Error")
}

// stop listening
function stopShake() {
  shakeEvent.stop();
}

//check if shake is supported or not.
if (!("ondevicemotion" in window)) {
  alert("Not Supported");
}
