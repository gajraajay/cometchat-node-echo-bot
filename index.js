const Window = require('window');

const window = new Window();

global.window = window;

global.localStorage = require('localStorage')
global.document = window.document;
global.navigator = window.navigator;
global.atob = window.atob;
global.btoa = window.btoa;
global.fetch = require("node-fetch");
global.WebSocket = window.WebSocket;
const CometChat = require('./CometChat').CometChat;

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
                console.log("Login Successful:", { user });
            },
            error => {
                console.log("Login failed with exception:", { error });
            }
        );
    },
    error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
    }
);