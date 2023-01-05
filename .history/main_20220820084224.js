var fullName = document.getElementById('fullName');
var message = document.getElementsByClassName("form-message");
console.log()
fullName.onblur = function(){
    if(!fullName.value){
        message.innerText ="Vui lòng nhập trường này";
    }
}