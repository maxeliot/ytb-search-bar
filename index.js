document.querySelector('#search-bar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      search()
    }
});

var textBox = document.getElementById("uinput");

function search() {
    let txt=textBox.value;
    window.open('https://www.youtube.com/results?search_query='+txt);
}