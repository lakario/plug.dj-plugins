// ==UserScript==
// @name           plug.dj: DJ Leave Alert
// @include        *plug.dj/*/*
// @version        0.5.1
// @grant          none
// ==/UserScript==

var fireLazers=function() {
	var gitPath = 'https://raw.github.com/lakario/plug.dj-plugins/master/';
	var state = localStorage.getItem('DJLeaveAlertFlag');
	var initArray = ['OFF', 'ON'];

	unsafeWindow = window;

	if(window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		unsafeWindow = div.onclick();
	};
	
	if(!unsafeWindow.$) {
		return;
	}

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
			
			try {
				unsafeWindow.API.removeEventListener(unsafeWindow.API.DJ_UPDATE, unsafeWindow.DJLeaveAlert);
			}
			catch (e) {}
			
			unsafeWindow.$('#djla-state').text('OFF').parent().css('color', 'white');
		}
		else {
			console.log('Turning DJ Leave Alert on');
			
			try {
				unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, unsafeWindow.DJLeaveAlert);	
			}
			catch (e) {}
			
			unsafeWindow.$('#djla-state').text('ON').parent().css('color', 'red');
		}

		localStorage.setItem('DJLeaveAlertFlag', state);
		state = (state + 1) % 2;
		
		return false;
	}
	
	if (state == null){
		state = 0;
		localStorage.setItem('DJLeaveAlertFlag', '0');
	}
	else{
		state = parseInt(state);
	}

	unsafeWindow.$('#user-container')
		.append('<div class="leave-alert-wrp" style="position:absolute;bottom:-18px;right:0;"></div>');
	unsafeWindow.$('.leave-alert-wrp')
		.append('<a href="#" id="toggleDJLeaveAlert" style="font-size:11px;font-weight:bold;display:none;">DJ Leave Alert: <span id="djla-state">' + initArray[state] + '</span></a>')
		.click(toggleDJLeaveAlert);
	unsafeWindow.$('.leave-alert-wrp')
		.append('<audio id="loud-beep"><source src="' + gitPath + 'assets/loudbeep.wav" type="audio/wav"><source src="' + gitPath + 'assets/loudbeep.mp3" type="audio/mp3"></audio');
		
	toggleDJLeaveAlert();
	
	unsafeWindow.$('#toggleDJLeaveAlert').show();
};
setTimeout(function() { 
	fireLazers();
}, 2000);