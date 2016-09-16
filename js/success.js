$(function(){
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
	
	
	$('.welcomeyou').text('你好，miya'+cookieUtil.getCookie('username')+'..');
	$('.successmain p').text('miya'+cookieUtil.getCookie('username')+'您的账户已注册成功，祝您购物愉快！');

	var a=10;
	$('.successmain em').text(a);
	var jishiTimer=setInterval(jishi,1000);
	function jishi(){
		a--;
		if(a==0){
			clearInterval(jishiTimer);
			window.open('../mia.html','_self');
			
		}else{
			$('.successmain em').text(a);
			
		}
		
	};
	
	$('.successmain a').click(function(){
		clearInterval(jishiTimer);
	})
	
	
	
	
	
	
	
	
})
