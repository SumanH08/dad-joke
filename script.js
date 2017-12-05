var colors = ['#E53935', '#AD1457', '#7B1FA2', '#3F51B5', '#00838F', '#43A047', '#FF6D00'];

function fetchJoke() {
  $.ajax({
    url: "https://icanhazdadjoke.com/",
    dataType: 'json'
  }).done(function(res) {
    renderResults(res);
  }).fail(function(jq, status, err) {
    alert("Something went wrong!", status);
  })
}

var shakedCalled = false;

window.addEventListener("devicemotion", function(event) {
  if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
    if(!shakedCalled) {
      $('#joke-button').css('display', 'none');
      $('#phone').html(`<img style="max-width:180px; max-height:180px;" src="img/shake_shake.png" />`);
      getJokeOnShake();
    }
  }
});

function getJokeOnShake(){
  shakedCalled = true;
  var shakeEvent = new Shake({ threshold: 10 });
  shakeEvent.start();
  window.addEventListener('shake', function() { fetchJoke() }, false);
}

function renderResults(res) {
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  $("#joke").html(`<p class="joke-text">${res.joke}</p>`);
  $('.joke-text').css('color', random_color);

  $("#phone").html("");

  $("#instruct").html(`<p>Do you like it?<br> Keep it shakin'</p>`)
}
