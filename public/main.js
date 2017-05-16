var socket = io.connect('http://localhost:8080',{'forceNew' : true});

socket.on('push',function(data) {
  console.log(data);
  //render(data);
})

/*
function render(data) {
  var html = `<div>
               <strong>${data.push}</strong>:
             </div>`;

  document.getElementById('push').innerHTML = html;
  /*var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text})</em>
            </div>`);
  }).join(" ")
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}*/
