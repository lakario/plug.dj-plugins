var chat = function (a) {
	var that = Models.chat;
	if (!that.chatCommand(a)) {
		var c = {
			message: Utils.cleanTypedString(a)
			, type: a.indexOf("/em") == 0 || a.indexOf("/me") == 0 ? 'emote' : 'message'
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