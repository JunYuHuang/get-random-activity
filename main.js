loadActivity();

document.getElementById('button-get-new-word').addEventListener('click', loadActivity);

function setBackgroundImage(elementId, imageURL) {
    document.getElementById(elementId).style.backgroundImage = 'url(' + imageURL + ')';
}

var APIKeyString = '';
fetch('./unsplashAPIKey.txt')
.then(response => response.text())
.then((data) => {
    APIKeyString = data;
});

function loadActivity() {
    // get random activity text phrase from bored api first
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.boredapi.com/api/activity/');
    xhr.onload = function() {
        if(this.status == 200) {
            var activityText = JSON.parse(this.responseText);
            var activityTextOutput = '';
            activityTextOutput += activityText.activity + '.';
            // display the activity text phrase
            document.getElementById('activity-phrase').innerHTML = activityTextOutput;

            // get random photo related to text phrase from unsplash api
            var xhr2 = new XMLHttpRequest();
            xhr2.open('GET', 'https://api.unsplash.com/photos/random?client_id=' + APIKeyString + '&query=' + activityText.activity);
            xhr2.onload = function() {
                if(this.status == 200) {
                    var activityImageURL = JSON.parse(this.responseText);
                    setBackgroundImage('activity-image', activityImageURL.urls.regular);
                }
            }
            xhr2.send();
        }
    }
    xhr.send();
}