let window = require("browser-env")({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
let fetch = require("node-fetch");
const CometChat = require('@cometchat-pro/chat').CometChat;
window.fetch = fetch;
global.fetch = fetch;


var appID = "273950884b0bd70";
var region = "us";
var authKey = "3cf428b26111e4d4795cfd4f9d303a20d2a7587c";
var UID = "echo_bot";
var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(
    () => {
        console.log("Initialization completed successfully");
        CometChat.login(UID, authKey).then(
            user => {
                console.log("Login Successful:", {
                    user
                });

                var listenerID = "UNIQUE_LISTENER_ID";

                CometChat.addMessageListener(
                    listenerID,
                    new CometChat.MessageListener({
                        onTextMessageReceived: message => {

                            var receiverID = "";


                            if (message.getReceiverType() === "group") {
                                receiverID = message.getReceiver().getGuid();
                            } else {
                                receiverID = message.getSender().getUid();
                            }

                            var messageText = message.getText();
                            var receiverType = message.getReceiverType();

                            var textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);
                            console.log({ textMessage })
                            CometChat.sendMessage(textMessage).then(
                                message => {
                                    console.log("Message sent successfully:", message);
                                    // Do something with message
                                },
                                error => {
                                    console.log("Message sending failed with error:", error);
                                    // Handle any error
                                }
                            );
                            // Handle text message
                        }
                    })
                );

            },
            error => {
                console.log("Login failed with exception:", {
                    error
                });
            }
        );
    },
    error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
    }
);