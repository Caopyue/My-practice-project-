$(function() {

	var cookieUtil = {
		setCookie: function(name, value, iDate) {
			var date = new Date();
			date.setDate(date.getDate() + iDate);
			document.cookie = name + "=" + value + ";expires=" + date + ';path=/';
		},
		getCookie: function(name) {
			var str = document.cookie;
			var arr = str.split("; ");
			for(var j = 0; j < arr.length; j++) {
				var arr1 = arr[j].split("=");
				if(arr1[0] == name) {
					return arr1[1];
				}
			}
			return "";
		},
		removeCookie: function(name) {
			this.setCookie(name, 1, -1);
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

	//注册登陆后
	(function() {
		if(cookieUtil.getCookie('ok') == '') {
			$('.registerNo').show();
			$('.registerOk').hide();

		} else {

			$('.registerNo').hide();
			$('.registerOk').show();
			$('.welcomeyou').text('你好，miya' + cookieUtil.getCookie('username') + '..');
		};
	})();

	$('.registerOk .logoout').click(function() {
		cookieUtil.removeCookie('ok');
		$('.registerNo').show();
		$('.registerOk').hide();
	})

	//鼠标划过显示三级菜单
	$('.allgoods .goodsmain dl').each(function() {
		$(this).hover(function() {
			var utop = $(this).index() * $(this).outerHeight();
			$(this).children('dd').css('top', utop);
			var top = $('.goodsmain').outerHeight() - $(this).children('dd').outerHeight();
			if($(this).children('dd').position().top + $(this).children('dd').outerHeight() > $('.goodsmain').outerHeight()) {
				$(this).children('dd').css('top', top);
			};

			$(this).addClass('nowactive');
		}, function() {
			$(this).removeClass('nowactive');
		});

		//三级菜单瀑布流布局
		var goodbox = $(this).find('.goodboxs').children();
		var colTa = goodbox.eq(0).outerHeight();
		var rowLa = goodbox.eq(0).outerWidth() + 30;
		var colTb = goodbox.eq(1).outerHeight();
		var minT = 0;
		var index = 0;
		var maxT = 0;
		goodbox.each(function() {
			if($(this).index() < 2) {
				$(this).css({
					"top": 0,
					"left": $(this).index() * rowLa
				});
			} else {
				colTa > colTb ? minT = colTb : minT = colTa;
				minT == colTa ? index = 0 : index = 1;
				$(this).css({
					'top': minT,
					'left': index * rowLa
				})
				minT == colTa ? colTa = minT + $(this).outerHeight() : colTb = minT + $(this).outerHeight();
			}
		})
		colTa > colTb ? maxT = colTa : maxT = colTb;
		$(this).find('.goodboxs').css('height', maxT);

		$(this).find('.shangbiao').css({
			'top': 0,
			'left': $(this).find('.goodboxs').outerWidth() + 26
		});
		$(this).children().eq(1).width($(this).find('.goodboxs').outerWidth() + $(this).find('.shangbiao').outerWidth());
	});

	
	
	function adddata(){
		Ajax("../data/mia.json",function(str){
			var arr = eval(str);
			for (var i=0;i<arr.length;i++){
				$("<div class='tejia' goodsid='"+arr[i].id+"'>").html("<a class='detailbtn' href='javascript:;'><div class='tejiatu'><img src='../"+arr[i].src+"' /><div class='marks'>特价</div></div><div class='tejiawenzi'><div class='tejiatit'><p>"+arr[i].title+"</p></div><div class='tjprice'><span class='nowtj'>￥<em class='nowteji'>"+arr[i].nprice+"</em></span><span class='oldtj'>￥<em class='oldteji'>"+arr[i].oprice+"</em></span></div></div></a><a class='tejiabtn' href='javascript:;'></a>").appendTo($('.tejiagoods'));
			}
		})
	};

	(function(){
		for(var i=0;i<10;i++){
			adddata();
		}
		$('.navnow').removeClass('navhover');
	})();


	(function(){
		if(cookieUtil.getCookie('way')==1){
			$('.topten').show();
			$('title').text('小学书单TOP10 - 蜜芽，中国领先的进口母婴限时特卖商城');
		}else if(cookieUtil.getCookie('way')==2){
			$('.bibei').show();
			$('title').text('小宝宝必备书单 - 蜜芽，中国领先的进口母婴限时特卖商城');
		}else if(cookieUtil.getCookie('way')==3){
			$('.renxuan').show();
			$('title').text('0-2岁启蒙认知书 - 蜜芽，中国领先的进口母婴限时特卖商城');
		}
	})()

	var m=cookieUtil.getCookie('cargoodsnum');
	
	$('.tejiabtn').each(function(){
		$(this).click(function(){
			m++;
			var cargoods=$(this).parent('.tejia').attr('goodsid');
			var valnum=cargoods.slice(3);
			cookieUtil.setCookie(cargoods,valnum,7);
			cookieUtil.setCookie('cargoodsnum',m,7);
			loading(cargoods);
			cargoodsnum();
		})
	});
	cargoodsnum()
	function cargoodsnum(){
		if(m!=""){
			$('.car-goods-num').show().text(cookieUtil.getCookie('cargoodsnum'));
		}else{
			$('.car-goods-num').hide();
		}
	};
	
	function caracent(){
		$('.acent').html("<h3>最近加入的商品</h3>");
		
	}
	
	
	
	
	function loading(cargoods){
		$('.addshopcar').css({"opacity":"1","filter":"alpha(opacity=100)","margin-left":"-125px","margin-top":"-68px"}).show().children().eq(0).css('background','url(../img/loading.gif) no-repeat center').end().eq(1).text('loading...');
		setTimeout(function(){
			$('.addshopcar').hide();
			findsize(cargoods);
			$('.choosesize').show();
		},1000)
	};

	function findsize(cargoods){
		Ajax("../data/mia.json",function(str){
			var arr = eval(str);	
			for (var i=0;i<arr.length;i++){
				if(document.cookie.indexOf(arr[i].id)!=-1){
					if(arr[i].id!=cargoods){
						continue;
					}else{
						$('.goodsize').text(arr[i].size);
					}
					
				}
			}
		});
	};

	$('.chooseadd').click(function(){
		$('.choosesize').hide();
		$('.addshopcar').show().children().eq(0).css('background','url(../img/nook.png) no-repeat -40px 0').end().eq(1).text('已加入购物车');
		setTimeout(function(){
			$('.addshopcar').animate({"margin-left":"350px","margin-top":"-368px","opacity":"0"},500,function(){
				$(this).hide();
			})
		},1000)
	})

});