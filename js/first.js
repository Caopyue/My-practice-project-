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

	function Ajax(url, fnSucc, fnFail) {
		var oAjax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		oAjax.open("get", url, true);
		oAjax.send(null);
		oAjax.onreadystatechange = function() {
			if(oAjax.readyState == 4) {
				if(oAjax.status == 200) {
					fnSucc(oAjax.responseText);
				} else if(fnFail) {
					fnFail();
				}
			}
		}
	};

	
	
	//banner
	var index=0;
	var banTimer=setInterval(change,3000);
	function change(){
		index++;
		if(index>$('.banner .bannermain .ban').length-1){
			index=0;
		};	
		$('.banner .bannermain .ban').eq(index).animate({'opacity':'1'},1000).css('zIndex','2').siblings().animate({'opacity':'0'},1000).css('zIndex','0');
		$('.banner .banbtn .btnnum a').eq(index).addClass('bannow').siblings().removeClass('bannow');
	};
	
	$('.banner .bannermain').hover(function(){
		clearInterval(banTimer);
	},function(){
		banTimer=setInterval(change,3000);
	});
	$('.banner .banbtn .btnnum a').each(function(){
		$(this).hover(function(){
			clearInterval(banTimer);
			$('.banner .bannermain .ban').eq($(this).index()).stop().animate({'opacity':'1'}).css('zIndex','2').siblings().stop().animate({'opacity':'0'}).css('zIndex','0');
			$(this).addClass('bannow').siblings().removeClass('bannow');
			index=$(this).index();
		},function(){
			banTimer=setInterval(change,3000);
		})
	});
	
	//今日特卖
	(function(){
		for(var i=0;i<5;i++){
			cloneapp()
		}	
	})()

	function cloneapp(){
		$('.todayhot .theclone').clone(true).appendTo('.todayhot');
	};
	
	
	
	//为你推荐
	adddata();
	function adddata(){
		Ajax("data/mia.json",function(str){
			var arr = eval(str);
			for (var i=0;i<arr.length;i++){
				$("<dl class='goods' goodsid='"+arr[i].id+"'>").html("<a class='detailbtn' href='javascript:;'><dt><img src='"+arr[i].src+"'/></dt><dd><p>"+arr[i].logo+"       "+arr[i].title+"</p><span class='nowprice'>￥<em>"+arr[i].nprice+"</em></span><span class='oldprice'>￥<em>"+arr[i].oprice+"</em></span><i>立即抢</i><strong>"+arr[i].buynum+"人已购买</strong></dd></a>").appendTo($('.foryou .forgoods'));
			}
		})
	};
	
	$('.gotopten').each(function(){
		$(this).click(function(){
			cookieUtil.setCookie("way","1",7);
			window.open("html/module.html","_self");
		});
	});
	$('.gobibei').each(function(){
		$(this).click(function(){
			cookieUtil.setCookie("way","2",7);
			window.open("html/module.html","_self");
		});
	});
	$('.gorenxuan').each(function(){
		$(this).click(function(){
			cookieUtil.setCookie("way","3",7);
			window.open("html/module.html","_self");
		});
	});
	
	
	
	
	
	
	
})
