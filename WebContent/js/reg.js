$(function(){
	var email = $.trim($('#tel').val());
	var code = $.trim($('#veri-code').val());
	
	$('#tel').keyup(function(event) {
		$('.tel-err').addClass('hide');
		checkBtn();
		checkRegButton();
	});
	$('.send').click(function(event) {
		$('.pwd-err').addClass('hide');
		checkBtn();
		sendBtn();
		checkRegButton();
	});
	$('#passport').keyup(function(event) {
		$('.tel-err').addClass('hide');
		checkBtn();
		checkPas();
		checkPas2();
		checkRegButton();
	});
	$('#passport2').keyup(function(event) {
		$('.tel-err').addClass('hide');
		checkBtn();
		checkPas2();
		checkRegButton();
	});
	$('#veri-code').keyup(function(event) {
		$('.error').addClass('hide');
		var code = $.trim($('#veri-code').val());
		checkCode(code);
	});
	//检查code
	function checkCode(code){
		if(code!=""){
			$.ajax({
	            url: '/MyDemo/checkCode',
	            type: 'post',
	            dataType: 'json',
	            data: {"email":code},
	            success:function(data){
	                if (data.result == 'success') {
	                	$('.error').addClass('hide');
	                	return true;
	                }else{
	                	$('.error').removeClass('hide').text('验证码错误');
	                	return false;
	                }
	            },
	        });
		}else{
			$('.error').removeClass('hide').text('验证码不能为空');
			return false;
		}
	}
	//检查注册按钮
	function checkRegButton(){
		var pas = $.trim($('#passport').val());
		var pas2 = $.trim($('#passport2').val());
		var email = $.trim($('#tel').val());
		var code = $.trim($('#veri-code').val());
		if (pas!="" && pas2 == pas && email !="") {
			$('.lang-btn').removeClass('off');
		}else{
			$('.lang-btn').addClass('off');
		}
	}
	//检查密码
	function checkPas(){
		var pas = $.trim($('#passport').val());
		if(pas==""){
			$('.pwd-err').removeClass('hide').text('请输入密码');
			return false;
		}else{
			$('.pwd-err').addClass('hide')
			return true;
		}
	}
	function checkPas2(){
		var pas = $.trim($('#passport').val());
		var pas2 = $.trim($('#passport2').val());
		if(pas!=pas2){
			$('.confirmpwd-err').removeClass('hide').text('两次输入密码不一致');
			return false;
		}else{
			$('.confirmpwd-err').addClass('hide');
			return true;
		}
	}
	//检查注册邮箱是否合法
	function checkBtn(){
		var email = $.trim($('#tel').val());
		if(email==""){
			$('.tel-err').removeClass('hide').text('输入邮箱账号');
			return false;
		}else {
			var param = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
			if(!param.test(email)){
				$('.tel-err').removeClass('hide');
				$('.tel-err').text('邮箱号不合法，请重新输入');
				return false;
			}
			$('.tel-err').addClass('hide');
			return true;
		}
	}
	function sendBtn(){
		var email = $.trim($('#tel').val());
		if (checkBtn(email)) {
			$.ajax({
	            url: '/MyDemo/checkCode',
	            type: 'post',
	            dataType: 'json',
	            data: {"email":email},
	            success:function(data){
	                if (data.result == 'success') {
	                	// globalTip({'msg':'登录成功!','setTime':3,'jump':true,'URL':'http://www.ui.cn'});
	                	alert("邮件发送成功");
	                  	var oTime = $(".form-data .time"),
	        			oSend = $(".form-data .send"),
	        			num = parseInt(oTime.text()),
	        			oEm = $(".form-data .time em");
	        		    $('.send').hide();
	        		    oTime.removeClass("hide");
	        		    var timer = setInterval(function () {
	        		   	var num2 = num-=1;
	        	            oEm.text(num2);
	        	            if(num2==0){
	        	                clearInterval(timer);
	        	                oSend.text("重新发送验证码");
	        				    oSend.show();
	        	                oEm.text("120");
	        	                oTime.addClass("hide");
	        	            }
	        	        },1000);
	        		    $('.p-input').removeClass('hide');
	                }
	            },
	        });
		}
	}
});