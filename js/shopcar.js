$(function(){
	
			function Ajax(url, fnSucc, fnFail) {
				var oAjax = null;
				if (window.XMLHttpRequest) {
					oAjax = new XMLHttpRequest();
				} else {
					oAjax = new ActiveXObject('Micsofot.XMLHTTP');
				}
				oAjax.open('GET', url, true)
				oAjax.send()
				oAjax.onreadystatechange = function() {
					if (oAjax.readyState == 4) {
						if (oAjax.status == 200) {
							fnSucc(oAjax.responseText)
						} else {
							if (fnFail) {
								fnFail()
							}
						}
					}
				}
			};
			Ajax("../data/mia.json",function(str){
				var arr = eval(str);
				for(var i = 0; i < arr.length; i++){
					if(document.cookie.indexOf(arr[i].id)!=-1){
						$('.carempty').hide();
						$('.goodslist').show();
						$("<div class='thegood clear dasborder'>").html("<div class='goodcheck ncheck'><input class='theck' type='checkbox' value='0' ></div><div class='theimg'><a href='#'><img src='../"+arr[i].smallpic+"'/></a></div><div class='thedes'><p class='goodname'><a href='#' target='_blank'>"+arr[i].logo+arr[i].title+"</a></p><p>商品编号："+arr[i].id+"</p></div><div class='goodform'>"+arr[i].size+"</div><div class='theprice'><p class='thenpri'>"+arr[i].nprice+"</p><p class='theopri'>"+arr[i].oprice+"</p></div><div class='thenum'><div class='dpbtn'><span class='redu'></span><input class='num-num' type='text'value='1'/><span class='add'></span></div></div><div class='xiaoji'><span>￥"+arr[i].nprice+"</span></div><div class='thedel'><p><a class='delete' href='javascript:;'>删除</a></p></div>").appendTo($('.everygoods'));
						
					}
				};
	
			})
	
	
	
	
})
