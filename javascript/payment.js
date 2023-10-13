var btn = document.getElementById('btn')
var costomer = 0
btn.addEventListener('click',function(e){
    e.preventDefault()
    Email.send({
        Host : "comptroller@gloria-academy.com",
        Username : "firas.d.saad@gmail.com",
        Password : "F!R@$.2010.saad",
        To : 'loubnanehme@ymail.com',
        From : "you@isp.com",
        Subject : "hallo",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
})