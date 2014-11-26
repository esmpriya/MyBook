(function onload() {
    // disabled profile inrder to display feed page by default
    onFeedClick();
})();

function onFeedClick() {
    document.getElementById("feed").style.display ='block';
    document.getElementById("profile").style.display = 'none';
}

function onProfileClick() {
    document.getElementById("profile").style.display = 'block';
    document.getElementById("feed").style.display = 'none';
}
