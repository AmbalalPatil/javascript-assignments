function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', (registerData) => {
			socket.username = registerData.username;
			let arr = (registerData.channels + '').split(',');

			for (let i = 0; i < arr.length; i = i + 1) {
				socket.join(arr[i]);
				const channelJson = `{"channel":"${arr[i]}"}`;
				socket.emit('addedToChannel', JSON.parse(channelJson));
			}

			if (registerData.channels !== '' && registerData.channels !== 'undefined') {
				let welcomeMessage = 'Welcome ' + registerData.username + ' !!';
				socket.emit('welcomeMessage', welcomeMessage);
			}
			socket.on('message', (data) => {
				socket.to(data.channel).emit('newMessage', data);
			});
			socket.on('joinChannel', (data) => {
				socket.join(data.channel);
				socket.emit('addedToChannel', data);
			});
			socket.on('leaveChannel', (data) => {
				socket.leave(data.channel);
				socket.emit('removedFromChannel', data);
			});
		});
	});
}

module.exports = bootstrapSocketServer;
