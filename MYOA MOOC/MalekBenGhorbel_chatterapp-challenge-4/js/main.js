console.log("App is alive");

let selectedChannel = channel1;

function switchChannel(channel){
    console.log("selected channel with name: " + channel.name);
    document.getElementById(selectedChannel.id).classList.remove("selected");
    document.getElementById(channel.id).classList.add("selected");
    selectedChannel= channel;
    showHeader();
}

function showHeader(){
    document.getElementById('channelName').innerHTML = selectedChannel.name;
    if(selectedChannel.favorite == false){
        document.getElementById('favorite-button').innerHTML = "favorite_border";
    } else {
        document.getElementById('favorite-button').innerHTML = "favorite";
    }
}

function toggleFavorite(){
    if(selectedChannel.favorite == true){
        console.log(selectedChannel.name + " was removed from favorites.");
        selectedChannel.favorite = false;
        document.getElementById('favorite-button').innerHTML = "favorite_border";
    } else {
        console.log(selectedChannel.name + " was added to favorites.");
        selectedChannel.favorite = true;
        document.getElementById('favorite-button').innerHTML = "favorite";
    }
}

function sendMessage(){
    var messageText = document.getElementById('message-input').value;
    console.log("The following message was sent: " + messageText);
    let messageString;
    messageString = '<div class="message outgoing-message"> <div class="message-wrapper"> <div class="message-content"><p>' + messageText + '</p></div><i class="material-icons">account_circle</i></div><span class="timestamp">11:45</span></div>';
    document.getElementById('chat-area').innerHTML= messageString;
    document.getElementById('message-input').value= '';
}