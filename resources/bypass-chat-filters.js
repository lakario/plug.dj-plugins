var chat = function (a) {
	var that = Models.chat;
	if (!that.chatCommand(a)) {
		var type = a.indexOf("/em") == 0 || a.indexOf("/me") == 0 ? 'emote' : 'message';
		var c = {
			message: Utils.cleanTypedString(type == 'emote' ? a.substring(3) : a)
			, type: type
			, language: Models.user.data.language
			, from: Models.user.data.username
            , fromID: Models.user.data.id
		}
		socket.chat(a);
		that.onChatReceived(c);
		return true;
    }
	return false;
}