//constractor function
function validator(options){
    var formElement = document.querySelector(options.form);
    if(formElement){
       
    }
}
//định nghĩa các rules
validator.isRequired = function(selector){
    return {
        selector: selector
    }
}
validator.isEmail = function(selector){

}