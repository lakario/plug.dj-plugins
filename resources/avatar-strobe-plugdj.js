var avatarStrobe = {
	on: true
	, speed: 700
	, interval: null
	, avatars: []
	, stop: function() {
		clearInterval(avatarStrobe.interval);
	}
	, start: function(speed) {
		avatarStrobe.stop();

		for(var i = 1; i <= 12; i++) {
			avatarStrobe.avatars.push('halloween' + (i <= 9 ? '0' : '') + i);
		}
		
		$('#avatar-panel img').each(function() { 
			var src = $(this).attr('src');
			var srcParts = src.split('/');
			var fileName = srcParts[srcParts.length-1];
			var nameParts = fileName.split('.');
			var avatarName = nameParts[0];
			
			avatarStrobe.avatars.push(avatarName); 
		});

		avatarStrobe.interval = setInterval(function() {
			if(!avatarStrobe.on) return;
			
			if(avatarStrobe.avatars.length == 0) {
				console.log('unable to load avatars. stopping.');
				avatarStrobe.stop();
			}
			
			var index = Math.floor(Math.random() * avatarStrobe.avatars.length);
			var avatar = avatarStrobe.avatars[index];

			if(avatar) {
				Models.user.changeAvatar(avatar);
			}
			else {
				console.log('derp! index=' + index)
			}
		}, speed || avatarStrobe.speed);
	}
};
avatarStrobe.start();
