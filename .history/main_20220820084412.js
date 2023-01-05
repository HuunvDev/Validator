var fullName = document.getElementById('fullName');
var message = document.getElementsByClassName("form-message");
console.log(message)
fullName.onblur = function(){
    if(!fullName.value){
        message[0].innerText ="Vui lòng nhập trường này";
    }
}