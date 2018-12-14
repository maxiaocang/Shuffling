window.onload = function(){
	waterFall("main","box");
	//模拟后台传回的数据
	var dataInt ={"data":[{"src":"221159kxfy7fp6pknt6cfm.jpg"},{"src":"27814079a80a2f368b945218a56808c1.jpg"},{"src":"30fbf38e34b6156a621bd624e55a2ca2.jpg"}]};
	window.onscroll = function(){
		if(checkScrollSlide){
	    	var oParent = document.getElementById("main");
		
			//将数据块渲染到页面的尾部
			for(var i=0; i<dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = "box";
				oParent.appendChild(oBox);

				var oPic = document.createElement('div');
				oPic.className = "pic";
				oBox.appendChild(oPic);
				
				
				var oImg = document.createElement('img');
				oImg.src = "img/"+dataInt.data[i].src;
				oPic.appendChild(oImg);

				
			}
			waterFall("main","box");
			
		}
	}
	
}
function waterFall(parent,box){
	//将main下所有的class为box的子元素取出来
	var oParent = document.getElementById("main");
	var oBox = getByClass(oParent,box);
	//计算整个页面显示的列数（整个页面的宽度/box的宽度）
	var oBoxW = oBox[0].offsetWidth; /*因为瀑布流等宽不等高，所以每个box的宽都相同，只用取第一个box的宽即可*/
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);/*document.documentElement.clientWidth:获取页面的宽度*/
	//设置main的宽,并且同时让main居中（main的宽度 = box的宽度 X 每行的列数）
	oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';
	
	var hArr = []; //存放每一列高度的数组
	for(var i=0; i<oBox.length; i++){
		if(i<cols){
			hArr.push(oBox[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBox[i].style.position = 'absolute';
			oBox[i].style.top = minH +"px";
//			oBox[i].style.left = oBoxW*index+"px";
			oBox[i].style.left = oBox[index].offsetLeft+"px";
			//改变高度数组
			hArr[index] += oBox[i].offsetHeight; 
		}
	}
}
//根据class取元素
function getByClass(parent,className){
	var boxArr = new Array();//用来存储所有的class为box的元素
	var oElements = parent.getElementsByTagName("*");
	for(var i=0; i<oElements.length; i++){
		if(oElements[i].className == className){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//获取最小高度图片索引
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

//检测是否具备了滚动条加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById("main");
	var oBox = getClass(oParent,'box');
	var lastBoxH = oBox[oBox.length - 1].offsetTop + Math.floor(oBox[oBox.length - 1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //标准模式与混杂模式
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH < scrollTop + height)?true:false;
}
