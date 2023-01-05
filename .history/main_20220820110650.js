//constractor function
function validator(options){
    var formElement = document.querySelector(options.form);
    if(formElement){
       options.rules.forEach( function (rules){
        var inputElement = formElement.querySelector(rules.selector);
        if(inputElement){
            inputElement.onblur = function(){
                //lấy value của ô input:inputElement.value;
                //test function : rules.test;
                if(inputElement.value){

                }
            }
        }
       })
    }
}
//định nghĩa các rules
//nguyên tắc của các rules:
//1.khi có lỗi thì trả ra message lỗi
//2.
validator.isRequired = function (selector){
    return {
        selector: selector,
        test: function (value){

        }
    }
}
validator.isEmail = function (selector){
    return {
        selector: selector,
        test: function (value){

        }
    }
}