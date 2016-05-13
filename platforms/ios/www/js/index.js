/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {76
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
       
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
    },
    onPause: function (){
        app.receivedEvent('pause');

    },
    onResume: function (){
        app.receivedEvent('resume');

    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        //alert("device ready");
       
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var pushNotification = window.plugins.pushNotification;
        //alert("received event");
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);

        if (id == 'deviceready') {
            var registerID = window.localStorage.getItem('RegisterID');
            if (registerID == null || registerID == "") {

                if (device.platform == 'android' || device.platform == 'Android') {
                    pushNotification.register(app.successHandler, app.errorHandler, { "senderID": "469651125282", "ecb": "app.onNotificationGCM" });
                }
                    
              
                else if(device.platform == 'ios' || device.platform == 'IOS' ) {
                    pushNotification.register(app.tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });
                }

                else
                {
                    notification.alert("Device Type not Identified");
                }
            }
            
        }

        if (id == 'pause') {
            navigator.notification.beep(1);
            cordova.plugins.notification.badge.set("52500.50");
            //alert("pause");
        }

        if (id == 'resume') {
            //alert("resume");
            cordova.plugins.notification.badge.clear();
        }
    },
    successHandler: function (result) {
        alert('Callback Success! Result = ' + result)
    },

    errorHandler: function (error) {
        alert(error);
    },

    tokenHandler: function (result) {
        alert('device token = ' + result);
        window.localStorage.setItem('RegisterID', result);
   },

    onNotificationGCM: function (e) {
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    window.localStorage.setItem('RegisterID', e.regid);
                    //console.log("Regid " + e.regid);
                    //alert('registration id = ' + e.regid);
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
                break;

            case 'error':
                alert('GCM error = ' + e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    },

    onNotificationAPN: function(e) {
    if ( e.alert )
    {
        navigator.notification.alert(e.alert);
    }

    if ( e.sound )
    {
        var snd = new Media(e.sound);
        snd.play();
    }

    if ( e.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, e.badge);
    }
   }
};




app.initialize();