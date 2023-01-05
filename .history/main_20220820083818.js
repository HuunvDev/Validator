var fullName = document.getElementById('fullName');
fullName.onblur = function(){
    if(!fullName.value){
        console.log('vui long')
    }
}