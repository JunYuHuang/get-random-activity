loadActivity();

document.getElementById('button-get-new-word').addEventListener('click', loadActivity);

function loadActivity() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.boredapi.com/api/activity/');
    xhr.onload = function() {
        if(this.status == 200) {
            var retrievedActivity = JSON.parse(this.responseText);
            var output = '';
            output += retrievedActivity.activity + '.';
            document.getElementById('activity-phrase').innerHTML = output;
        }
    }
    xhr.send();
}