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
	
	
	
	//注册登陆后
	(function(){
		if(cookieUtil.getCookie('ok')==''){
			$('.registerNo').show();
			$('.registerOk').hide();
			
		}else{
			
			$('.registerNo').hide();
			$('.registerOk').show();
			$('.welcomeyou').text('你好，miya'+cookieUtil.getCookie('username')+'..');
		};
	})();
	

	$('.registerOk .logoout').click(function(){
		cookieUtil.removeCookie('ok');
		$('.registerNo').show();
		$('.registerOk').hide();
	})
	
	
	
	//弹出层
	setTimeout(tanchu,500);
	function tanchu(){
		$('.zhezhao,.tanchu').show();
	}
	$('.tanchu span').click(function(){
		$('.zhezhao,.tanchu').hide();
	})
		//鼠标划过显示三级菜单
	$('.allgoods .goodsmain dl').each(function(){
		$(this).hover(function(){
			var utop=$(this).index()*$(this).outerHeight();
			$(this).children('dd').css('top',utop);
			var top=$('.goodsmain').outerHeight()-$(this).children('dd').outerHeight();
			if($(this).children('dd').position().top+$(this).children('dd').outerHeight()>$('.goodsmain').outerHeight()){
				$(this).children('dd').css('top',top);
			};

			$(this).addClass('nowactive');
		},function(){
			$(this).removeClass('nowactive');
		});
		
		//三级菜单瀑布流布局
		var goodbox=$(this).find('.goodboxs').children();
		var colTa=goodbox.eq(0).outerHeight();
		var rowLa=goodbox.eq(0).outerWidth()+30;
		var colTb=goodbox.eq(1).outerHeight();
		var minT=0;
		var index=0;
		var maxT=0;
		goodbox.each(function(){
			if($(this).index()<2){
				$(this).css({"top":0,"left":$(this).index()*rowLa});
			}else{
				colTa>colTb?minT=colTb:minT=colTa;
				minT==colTa?index=0:index=1;
				$(this).css({'top':minT,'left':index*rowLa})
				minT==colTa?colTa=minT+$(this).outerHeight():colTb=minT+$(this).outerHeight();
			}
		})
		colTa>colTb?maxT=colTa:maxT=colTb;
		$(this).find('.goodboxs').css('height',maxT);
		
		$(this).find('.shangbiao').css({'top':0,'left':$(this).find('.goodboxs').outerWidth()+26});
		$(this).children().eq(1).width($(this).find('.goodboxs').outerWidth()+$(this).find('.shangbiao').outerWidth());
	});
	
	
	
	//左右固定图标
	$(window).scroll(function(){
		$(this).scrollTop()>200?$('.xuanfu').show():$('.xuanfu').hide();	
	});
	

	$('.fixedright .gotop').click(function(){
		$('body,html').animate({'scrollTop':'0'},300,function(){
		});
	});
	
	$('.fixedright .fdlist .fdkefu').hover(function(){
		$(this).children('.kefutu').stop().animate({'right':'55px'},600);
	},function(){
		$(this).children('.kefutu').stop().animate({'right':'97px'},100);
	});
	
	$('.fixedright .fdlist .fdweixin').hover(function(){
		$(this).children('.weixintu').stop().animate({'right':'55px'},600);
	},function(){
		$(this).children('.weixintu').stop().animate({'right':'97px'},100);
	});
	
	
	
	
});



















