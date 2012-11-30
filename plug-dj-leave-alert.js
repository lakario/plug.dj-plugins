// ==UserScript==
// @name           plug.dj: DJ Leave Alert
// @include        *plug.dj/*/*
// ==/UserScript==
var gitPath = 'https://raw.github.com/lakario/plug.dj-plugins/master/';

unsafeWindow = window;

if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
};

unsafeWindow.DJLeaveAlert = function(users) {
    var len = users.length;
    
    if(len < 5) {
        console.log('[Leave Alert] DJ slot open.');
		document.getElementById('loud-beep').play();
		unsafeWindow.flashBg(5);
    }
    else {
        console.log('[Leave Alert] All slots taken.');
    }
};

unsafeWindow.flashBg = function(flashCount) {
    flashCount = flashCount || 5;
    var count = 0;
	
    var blinkInt = setInterval(function() {
        var body = unsafeWindow.$('body');
        var bg = body.css('background');
        
        body.css('background', 'none');
        setTimeout(function() {
            body.css('background', bg);
        }, 250);
        
        if(++count == flashCount) {
            clearInterval(blinkInt);
        }
    }, 500);    
}

function toggleDJLeaveAlert(ev) {
    if(ev && ev.preventDefault) {
        ev.preventDefault();
    }
    if (state){
        console.log('Turning DJ Leave Alert off');
        unsafeWindow.API.removeEventListener(unsafeWindow.API.DJ_UPDATE, unsafeWindow.DJLeaveAlert);
        unsafeWindow.$('#djla-state').html('OFF');
    }
    else {
        console.log('Turning DJ Leave Alert on');
        unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, unsafeWindow.DJLeaveAlert);
        unsafeWindow.$('#djla-state').html('ON');
    }
    localStorage.setItem('DJLeaveAlertFlag', state);
    state = (state + 1) % 2;
    return false;
}

state = localStorage.getItem('DJLeaveAlertFlag');

if (state == null){
    state = 0;
    localStorage.setItem('DJLeaveAlertFlag', '0');
}
else{
    state = parseInt(state);
}

initArray = ['OFF', 'ON'];
toggleDJLeaveAlert();

unsafeWindow.$('#user-container')
	.append('<div class="leave-alert-wrp" style="position:absolute;bottom:-20px;right:0;"></div>');
unsafeWindow.$('.leave-alert-wrp')
	.append('<a href="#" id="toggleDJLeaveAlert" style="font-weight:bold;color:red">DJ Leave Alert: <span id="djla-state">' + initArray[state] + '</span></a>')
	.click(toggleDJLeaveAlert);
unsafeWindow.$('.leave-alert-wrp')
	.append('<audio id="loud-beep"><source src="' + gitPath + 'assets/loudbeep.wav" type="audio/wav"><source src="' + gitPath + 'assets/loudbeep.mp3" type="audio/mp3"></audio');