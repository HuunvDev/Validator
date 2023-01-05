//constractor function
function validator(options){
//hàm thực hiên validate
    function validate(inputElement,rules){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
         //lấy value của ô input:inputElement.value;
                //test function : rules.test;
                var errorMessage = rules.test(inputElement.value);
                //lấy ra thẻ cha của nó từ thẻ con:inputElement.parentElement,
                //lấy ra  đúng phần tử con của thẻ to mà mình muốn lấy:
                //inputElement.parentElement.querySelector('form-message');
                if(errorMessage){
                 errorElement.innerText = errorMessage;
                 errorElement.parentElement.classList.add('invalid');
                }else{
                 errorElement.innerText = " ";
                 errorElement.parentElement.classList.remove('invalid');
                }
    }
    //lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    
    if(formElement){
       options.rules.forEach( function (rules){
        var inputElement = formElement.querySelector(rules.selector);
        if(inputElement){
            //xử lí trường hợp blur khỏi thẻ input
            inputElement.onblur = function(){
               validate(inputElement,rules);
            }

            // xử lí khi người dùng nhập dữ liệu
            inputElement.oninput = function(){
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                errorElement.innerText = " ";
                errorElement.parentElement.classList.remove('invalid');
            }
        }
       })
    }
}
//định nghĩa các rules
//nguyên tắc của các rules:
//1.khi có lỗi thì trả ra message lỗi
//2.khi hợp lệ thì clear lỗi
validator.isRequired = function (selector,message){
    return {
        selector: selector,
        test: function (value){
            return value.trim() ? undefined : message || "Vui lòng nhập trường này";
        }
    }
}
validator.isEmail = function (selector,message){
    return {
        selector: selector,
        test: function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)? undefined :"Trường này phải là email";
        }
    }
}

validator.minLength = function (selector,min){
    return {
        selector: selector,
        test: function (value){
            return value.length >= min ? undefined :`Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
}

validator.isConfirmed = function(selector,getConfirmValue){
    return {
        selector:selector,
        test : function(value){
            return value === getConfirmValue() ? undefined :'Mật khẩu nhập lại không chính xác';
        }
    }
}