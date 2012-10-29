// The watch id references the current watchAcceleration
var watchID = null;
var previousReading = {
    x: null,
    y: null,
    z: null
};
//wait for PhoneGap to load
document.addEventListener("deviceready", loaded, false);
// PhoneGap is ready
function loaded() {
    startWatch();
}
// Start watching the acceleration
function startWatch() {
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 200 });
}
function stopWatch (){
    navigator.accelerometer.clearWatch(watchID);
}
function shaken(){
    console.log("Shaken");
    Finappsparty.app.getController('DirectTransferController').searchTransfer();
}
// Success
function onSuccess(acceleration) {
    var changes = {},
    bound = 15;
    if (previousReading.x !== null) {
        changes.x = Math.abs(previousReading.x - acceleration.x);
        changes.y = Math.abs(previousReading.y - acceleration.y);
        changes.z = Math.abs(previousReading.z - acceleration.z);
    }
    if (changes.x > bound) {
        navigator.notification.vibrate(500);
        stopWatch();
        shaken();
        setTimeout(function(){
           startWatch();
        },5000);
    }

    previousReading = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
    };
}
// Error
function onError() {
    //alert('onError!');
}