var fullName = document.getElementById('fullName');
var message = document.getElementsByClassName("form-message");
cốnl
fullName.onblur = function(){
    if(!fullName.value){
        message.innerText ="Vui lòng nhập trường này";
    }
}