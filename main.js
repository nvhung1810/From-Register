// validation form là nghiệp vụ kiểm tra lỗi 
//  viết layout cho 1 cái form thì luôn có thẻ form

//  đối tượng validator 
function Validator(options) {

    // Hàm thực hiện báo lỗi
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelecter)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = ' '
            inputElement.parentElement.classList.remove('invalid')
        }
    }



   var formElement = document.querySelector(options.form)
   // lấy form elemrnt
//    console.log(options.rule)

   if(formElement) {
      // làm sao để ko nhấn vào cái input thì nó báo lỗi luôn 
      // muốn làm dc 
      // B1: get được các element của thẻ đó 
      // B2: sau khi lấy được element thì mới lắng nghe được sự kiện kick ra ngoài 
      // B3: sau khi nghe được sự kiện thì muốn làm j thì làm.
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = inputElement.parentElement.querySelector(options.errorSelecter)
            // lắng nghe sự kiện click ra ngoài 
            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                validate(inputElement, rule)
                }
                // xử lý trường hợp mỗi khi ng dùng nhập 
                inputElement.oninput = function() {
                    errorElement.innerText = ' '
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
   }
}

// định nghĩa các điều luật
// nguyên tắc của các rule:
    // 1 Khi có lỗi trả ra message lỗi
    // 2 Khi không có lỗi thì ko trả ra cái gì (undefine)

Validator.isRequired = function(selector) {
    return {
        selector: selector, 
        // kiểm tra ng dùng bắt buộc nhập
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
            // trim dùng để loại bỏ dấu cách
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector, 
        // kiểm tra ng dùng bắt buộc nhập
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập email'
        }
    }
}