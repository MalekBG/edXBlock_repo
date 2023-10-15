console.log("App is alive");

let selectedChannel;
let channels = [];
let messages = [];

function switchChannel(selectedChannelID){
    console.log("selected channel with id: " + selectedChannelID);
    if (!!selectedChannel) {
        document.getElementById(selectedChannel.id).classList.remove("selected");
      }
    document.getElementById(selectedChannelID).classList.add("selected");
    channels.forEach((channel) => {
        if (channel.id === selectedChannelID) {
          selectedChannel = channel;
        }
      });
    showHeader();
    showMessages();
}

function showHeader(){
    document.getElementById('channelName').innerHTML = selectedChannel.name;
    if(selectedChannel.favorite == false){
        document.getElementById('favorite-button').innerHTML = "favorite_border";
    } else {
        document.getElementById('favorite-button').innerHTML = "favorite";
    }
}

function sendMessage(){
    const text = document.getElementById("message-input").value;
    if (!!text) {
      const myUserName = "Basti";
      const own = true;
      const channelID = selectedChannel.id;
      const message = new Message(myUserName, own, text, channelID);
      console.log("New message: ", message);
      selectedChannel.messages.push(message);
      document.getElementById("message-input").value = "";
      showMessages();
      sortChannels();
      displayChannels();
    } else {
      return;
    }
}

function init(){
    console.log("App is initialized");
    getChannels();
    getMessages();
    loadMessagesIntoChannel();
    displayChannels();
    //loadEmojis();
    document.getElementById("send-button").addEventListener("click", sendMessage);
    //document.getElementById("emoticon-button").addEventListener("click", toggleEmojiArea);
    //document.getElementById("close-emoticon-button").addEventListener("click", toggleEmojiArea);
}

function getChannels(){
    channels = mockChannels;
}

function getMessages(){
    messages = mockMessages;
}

function displayChannels(){
    const favoriteList = document.getElementById('favorite-channels');
    const regularList = document.getElementById('regular-channels');
    favoriteList.innerHTML = "";
    regularList.innerHTML = "";
    channels.forEach((channel) => {
        const currentChannelHtmlString =
          `  <li id="` +
          channel.id +
          `"onclick="switchChannel(this.id)">
                                                  <i class="material-icons">group</i>
                                                  <span class="channel-name">` +
          channel.name +
          `</span>
                                                  <span class="timestamp">` +
          channel.latestMessage +
          `</span>
                                                  </li>`;
        if (channel.favorite) {
          favoriteList.innerHTML += currentChannelHtmlString;
        } else {
          regularList.innerHTML += currentChannelHtmlString;
        }
      });
}

function loadMessagesIntoChannel(){
    channels.forEach(channel => {
        messages.forEach (message => {
            if (message.channel == channel.id) {
                channel.messages.push(message);
            }
        })
    });
}

function showHeader(){
    document.getElementById("message-area-header").getElementsByTagName('h1')[0].innerHTML = selectedChannel.name;
    document.getElementById('favorite-button').innerHTML = (selectedChannel.favorite)? "favorite" : "favorite_border";
}

function Message(user, own, text, channelID) {
    this.createdBy = user;
    this.createdOn = new Date (Date.now());
    this.own = own;
    this.text = text;
    this.channel = channelID;
}

function showMessages(){
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = ""
    selectedChannel.messages.forEach(message => {
        const messageTime = message.createdOn.toLocaleTimeString([], {hour: "numeric", minute: "numeric"});
        let messageText;
        if (message.own){
            messageText =   `  <div class="message outgoing-message">
                                                <div class="message-wrapper">
                                                    <div class="message-content">
                                                        <p>` + message.text + `</p>
                                                    </div>
                                                    <i class="material-icons">account_circle</i>
                                                </div>
                                                <span class="timestamp">`+ messageTime + `</span>
                                            </div>`;
        } else {
            messageText =   `  <div class="message incoming-message">
                                                <div class="message-wrapper">
                                                    <i class="material-icons">account_circle</i>
                                                    <div class="message-content">
                                                        <h3>` + message.createdBy + `</h3>
                                                        <p>` + message.text + `</p>
                                                    </div>
                                                </div>
                                                <span class="timestamp">`+ messageTime + `</span>
                                            </div>`;
        }
        chatArea.innerHTML += messageText;
    })
    chatArea.scrollTop = chatArea.scrollHeight;
}

function sortChannels() {
    //remove first
    channels = channels.filter(channel => channel.id !== selectedChannel.id);
    //insert
    channels.unshift(selectedChannel);
}

function favoriteChannel(){
    selectedChannel.favorite = (selectedChannel.favorite) ? false : true;
    channels.forEach(channel => {
        if(channel.id === selectedChannel.id){
            channel = selectedChannel;
        }
    })
    displayChannels();
    switchChannel(selectedChannel.id)
}

    
        
    
