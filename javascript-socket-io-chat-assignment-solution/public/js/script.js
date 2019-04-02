function sendMessage(event, socket) {
	event.preventDefault();
	let msg = document.getElementById('message').value;
	let chnl = document.getElementById('channel').value;
	let user = document.getElementById('username').value;

	if (chnl !== '' && typeof chnl !== 'undefined') {
		const messageJson = `{"username":"${user}", "message":"${msg}", "channel":"${chnl}"}`;
		socket.emit('message', JSON.parse(messageJson));
		let chatContainerElement = document.getElementById('chatContainer');
		chatContainerElement.innerHTML = `<div class="col-12">
			<div class="card sent-message">
				<div class="card-body">
					<p class="card-text">Me : ${msg}</p>
				</div>
			</div>
		</div>` + chatContainerElement.innerHTML;
	}
}

function joinChannel(event, socket) {
	event.preventDefault();
	let channelName = document.getElementById('newchannel').value;
	if (channelName !== '' && typeof channelName !== 'undefined') {
		const channelJson = `{"channel":"${channelName}"}`;
		socket.emit('joinChannel', JSON.parse(channelJson));
	}
}

function leaveChannel(event, socket) {
	event.preventDefault();
	let channelName = document.getElementById('newchannel').value;
	if (channelName !== '' && typeof channelName !== 'undefined') {
		const channelJson = `{"channel":"${channelName}"}`;
		socket.emit('leaveChannel', JSON.parse(channelJson));
	}
}

function onWelcomeMessageReceived(message) {
	let chatContainerElement = document.getElementById('chatContainer');
	let htmlContent = `<div class="col-12">
			<div class="card received-message">
				<div class="card-body">
					<p class="card-text">System : ${message} </p>
				</div>
			</div>
		</div>`;
	chatContainerElement.innerHTML = chatContainerElement.innerHTML + htmlContent;
}

function onNewMessageReceived(data) {
	let chatContainerElement = document.getElementById('chatContainer');
	chatContainerElement.innerHTML = `<div class="col-12">
			<div class="card sent-message">
				<div class="card-body">
					<p class="card-text">${data.username} : ${data.message}</p>
				</div>
			</div>
		</div>` + chatContainerElement.innerHTML;
}

function onAddedToNewChannelReceived(data) {
	let alertContainer = document.getElementById('alertContainer');
	alertContainer.innerHTML = `
		<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are added to <strong>${data.channel}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>` + alertContainer.innerHTML;

	let channelListElement = document.getElementById('channelsList');
	channelListElement.innerHTML = channelListElement.innerHTML + `<option>${data.channel}</option>`;
}

function onRemovedFromChannelReceived(data) {
	let alertContainer = document.getElementById('alertContainer');
	alertContainer.innerHTML = `
		<div class="alert alert-success alert-dismissible fade show" role="alert">
			You are removed from <strong>${data.channel}</strong> successfully!
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>` + alertContainer.innerHTML;
	let channelListElement = document.getElementById('channelsList');
	let removedChannelIndex;
	for (let i = 0; i < channelListElement.options.length; i = i + 1) {
		if (channelListElement.options[i].value === data.channel) {
			removedChannelIndex = i;
			break;
		}
	}
	document.getElementById('channelsList').options[removedChannelIndex].remove();
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

