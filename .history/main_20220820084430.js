var fullName = document.getElementById('fullName');
var message = document.getElementsByClassName("form-message");

fullName.onblur = function(){
    if(!fullName.value){
        message[0].innerText ="Vui lòng nhập trường này";
    }
}