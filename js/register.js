$(function(){
	var bTag=false;
	var phonenum=/0?(13|14|15|18)[0-9]{9}/;
	var pwd=/^\w{5,13}\w$/i;
	var yzMa='';
	var message='';
	
	var cookieUtil={
		setCookie:function(name,value,iDate){
			var date=new Date();
			date.setDate(date.getDate()+iDate);
			document.cookie=name+"="+value+";expires="+date+';path=/';
		},
		getCookie:function(name){
			var str=document.cookie;
			var arr=str.split("; ");
			for(var j=0;j<arr.length;j++){
				var arr1=arr[j].split("=");
				if(arr1[0]==name){
					return arr1[1];
				}
			}
			return "";
		},
		removeCookie:function(name){
			this.setCookie(name,1,-1);
		}
	};
	
	
	
	
	
	
	
	//验证手机号
	$('.phonebox .input').blur(function(){
		if($(this).val().length==0){
			$('.phonebox').find('.warn').show();
			return;
		}else if(!phonenum.test($(this).val())){
			$('.phonebox').find('.warn').show();
			return;
		}else{
			$('.phonebox').find('.warn').hide();
			bTag=true;
		}
		
	});
	$('.phonebox .input').focus(function(){
		$('.phonebox').find('.warn').hide();
	});
	
	random();
	//生成随机验证码
	function random(){
		var arr = ['a','b','c','d','n','o','p','q','r','s','t','u','v','w','x','y','z','e','f','g','h','i','j','k','l','m','n','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
		var str='';
		var arr2=['-1px','-2px','-3px','0px','1px','2px','3px','4px','5px','6px','7px','8px','9px','10px','11px','12px','13px','14px','15px'];
		for (var i =0;i<4;i++){
			var a=Math.floor(Math.random()*62);
			str+=arr[a];
		}
		var b=Math.floor(Math.random()*18);
		yzMa=str;
		$('.yanzhengtu').text(yzMa).css('letter-spacing',arr2[b]);
		
	};
	$('.yanzhengbox .changeyzma').click(function(){
		random();
	});
	
	//验证码
	$('.yanzhengma .input').focus(function(){
		$('.yanzhengma .warn').css('display','none');
	})
	//模拟短信验证
	$('.duanxin .getduanxin').click(function(){
		if($('.phonebox .input').val().length==0){
			$('.phonebox').find('.warn').show();
			return;
		}else if($('.yanzhengma .input').val().length==0){
			$('.yanzhengma .warn .warncon').text('验证码不能为空');
			$('.yanzhengma .warn').css('display','block');
		}else if($('.yanzhengma .input').val().toLowerCase()!=yzMa.toLowerCase()){
			$('.yanzhengma .warn .warncon').text('验证码错误');
			$('.yanzhengma .warn').show();
			random();
			return;
		}else{
			message=parseInt(Math.random()*1000000);
			alert('      【'+message+'】这是您的模拟短信验证码，请输入短信验证码框中，祝您购物愉快，天天开心！')
			duanxin();
		}	
	});
	
	function duanxin(){
		$('.duanxin').find('.warncon').text('验证码已发送，请查收短信');
		$('.duanxin').find('.warn').show();
		var a =20;
		duanxinTimer=setInterval(function(){
			a--;
			if(a==0){
				$('.duanxin .getduanxin').text('重新获取短信验证码');
				clearInterval(duanxinTimer);
			}else{
				$('.duanxin .getduanxin').text(a+'秒后重新获取');
			}
		},1000)
	}
	
	$('.duanxin .input').blur(function(){
		if($(this).val().length==0){
			$('.duanxin').find('.warn').show();
			return;
		}else{
			$('.duanxin').find('.warn').hide();
		};	
	});
	$('.duanxin .input').focus(function(){
		$('.duanxin').find('.warn').hide();
	});
	
	
	//密码
	$('.paswordbox .input').blur(function(){
		if($(this).val().length==0){
			$('.paswordbox').find('.warn').show();
			return;
		}else if(!pwd.test($(this).val())){
			$('.paswordbox').find('.warn').show();
			return;
		}else{
			$('.paswordbox').find('.warn').hide();
			bTag=true;
		};	
	});
	$('.paswordbox .input').focus(function(){
		$('.paswordbox').find('.warn').hide();
	});	
	
	//确认密码
	$('.Rpaswordbox .input').blur(function(){
		if($(this).val().length==0){
			$('.Rpaswordbox').find('.warn').show();
			return;
		}else if($(this).val()!=$('.paswordbox .input').val()){
			$('.Rpaswordbox').find('.warn').text('两次输入的密码不一致').show();
			return;
		}else if(!pwd.test($(this).val())){
			$('.Rpaswordbox').find('.warn').show();
			return;
		}else{
			$('.Rpaswordbox').find('.warn').hide();
			bTag=true;
		};	
	});
	$('.Rpaswordbox .input').focus(function(){
		$('.Rpaswordbox').find('.warn').hide();
	});	
	
	$('.agreemia #isagree').mouseup(function(){
		$('.agreemia .warn').toggle();
	});
	
	//注册提交
	$('.registerbtn a').click(function(){
		if($('.duanxin .input').val()!=message){
			$('.duanxin').find('.warncon').text('短信验证码错误');
			$('.duanxin').find('.warn').show();
			return;
		}else{
			cookieUtil.setCookie('username',$('.phonebox .input').val(),7);
			cookieUtil.setCookie('password',$('.Rpaswordbox .input').val(),7);
			cookieUtil.setCookie('ok','0',7);
			window.open('../html/registerSuccess.html','_self');
		}
	})
	

	
	
	
})
