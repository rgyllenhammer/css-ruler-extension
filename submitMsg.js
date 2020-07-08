document.getElementById('tickDist').onkeypress = getInputData;
document.getElementById('disable').onmousedown = disableExtension;
document.getElementById('enable').onmousedown = enableExtension;

function submitMessage(type, message) {

    let params = {
        active: true,
        currentWindow: true,
    }
    chrome.tabs.query(params, gotTabs);
    function gotTabs(tabs){

        let msg = {
            type: type,
            data: message
        }
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }

}

function getInputData(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
        submitMessage("sizing", e.target.value);
        return false;
    }
}

function disableExtension(){
    submitMessage("disable" ,"disable");
}

function enableExtension(){
    submitMessage("enable", "enable");
}
