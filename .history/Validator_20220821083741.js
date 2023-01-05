//constractor function
function validator(options){

    function getParent (element,selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules ={};
//hàm thực hiên validate
    function validate(inputElement,rules){
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        //lấy ra các rules của selector
        var rules = selectorRules[rules.selector];
        //lặp qua từng rules và check
        //nếu có lỗi dừng việc kiểm tra
        for (var i = 0; i < rules.length;i++){
            switch
            errorMessage= rules[i](inputElement.value);
            if(errorMessage) break;
        }
                //lấy value của ô input:inputElement.value;
                //test function : rules.test;
               // var errorMessage = rules.test(inputElement.value);
                //lấy ra thẻ cha của nó từ thẻ con:inputElement.parentElement,
                //lấy ra  đúng phần tử con của thẻ to mà mình muốn lấy:
                //inputElement.parentElement.querySelector('form-message');
                if(errorMessage){
                 //errorElement.innerText = errorMessage;
                 errorElement.innerHTML = `<i class="fas fa-exclamation-triangle warning"></i> ${errorMessage}`;
                 getParent(inputElement, options.formGroupSelector).classList.add('invalid');
                }else{
                 errorElement.innerText = " ";
                 getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }

                return !errorMessage;
    }
    //lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    
    if(formElement){
        //loại bỏ hành vi mặc định của submit
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;
            //thực hiện lặp qua từng rules và validate
            options.rules.forEach( function (rules){
                var inputElement = formElement.querySelector(rules.selector);
                 var isValid = validate(inputElement,rules);
                 if(!isValid){
                    isFormValid =  false;
                 }
            });

            if(isFormValid){
                //trường hợp submit với js
             if( typeof options.onSubmit ==='function'){
                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');//lấy ra tất cả các phần tử có attribute là name và ko lấy các phần tử  bị disabled( có nghĩa là bị ẩn đi ko cho người dùng tương tác);
                var formValues = Array.from(enableInputs).reduce(function(values,input){
                    values[input.name] = input.value;
                    return  values;
                },{});
                options.onSubmit(formValues);
             }//trường hợp submit mặc định của trình duyệt
             else{
                formElement.submit();
             }
            }
        }
        //lặp qua mỗi rules và lắng nghe sự kiện
       options.rules.forEach( function (rules){
        //lưu lại các rules cho mỗi input
        if(Array.isArray( selectorRules[rules.selector])){
            selectorRules[rules.selector].push( rules.test);
        }else{
            selectorRules[rules.selector] = [rules.test];
        }
      
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
                getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
            }
        }
       });
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
            return regex.test(value)? undefined : message ||"Trường này phải là email";
        }
    }
}

validator.minLength = function (selector,min,message){
    return {
        selector: selector,
        test: function (value){
            return value.length >= min ? undefined :message ||`Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
}

validator.isConfirmed = function(selector,getConfirmValue,message){
    return {
        selector:selector,
        test : function(value){
            return value === getConfirmValue() ? undefined : message ||'Mật khẩu nhập lại không chính xác';
        }
    }
}
