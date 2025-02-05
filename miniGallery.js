if (typeof mGallery !== "undefined") {
	const galContainer = ".galCont"; //id container gallery
	const galClass = "galBody"; //id gallery
	const imgAct = '_activ';//active img	
	const galShare = './imgs/'; //адрес до папки с изображениями	
	const gimgs = "pictureG";
	const galArrows = "arrPn";//class arrows
	const koeff = 0.75;	
	const newSizeImgWidth = screen.width - (window.outerWidth - window.innerWidth);
	const newSizeImgHeight = screen.height - (window.outerHeight - window.innerHeight);
	const newKoff = newSizeImgWidth / newSizeImgHeight;
	
	var fullMode = "off";
	var _larrow = "larrow";
	var _rarrow = "rarrow";
	
	//g_imgs = document.querySelectorAll('.'+gimgs);//массив всех изображений галлереи

	ggall_build();
	
	function ggall_build(){//строим галлерею
		var gallContainer = document.querySelectorAll(galContainer);//контейнер галлереи
		for(i=0;i<gallContainer.length; i++){
			contenerNow = gallContainer[i];			
			contenerNow.innerHTML = "<div class='"+galClass+"' data-id='"+i+"'><div class='galPanel'><div class='leftArrow'><div class='arrPn "+_larrow+"'></div></div><div class='galSector'></div><div class='rightArrow'><div class='arrPn "+_rarrow+"'></div></div></div><div class='galPodval'><div class='listBlock'></div></div></div>";
			
			var galId = i; //id gallery
			var galImg = 1;//mGallery.size; //how many img visible
			var galWidth = mGallery.width; //width gallery
			var galHeight = mGallery.width * koeff; //height gallery
			var galMass = mGallery.images; //массив изображений			
			var galleryNow = contenerNow.querySelector("."+galClass);
			galleryNow.style.width = galWidth+"px";
			galleryNow.style.height = galHeight+"px";			
			
			loadingImg(galId,galMass);
			podvalBuild(galId,galMass);
			arrowBuild(galId,galMass);
			
		}
		galleryNow.addEventListener('dblclick', e => {fullsizeMode(e,galleryNow);});
		document.addEventListener('keyup', function(e){			
			console.log(e);
			var keyCode = e.keyCode;
			if(keyCode === 27){
				console.log(e.keyCode);
				var r = document.querySelector(".fullmode");
				console.log(r);
				if(fullMode === "on"){
					fullMode = "off";					
					_endfullscreen(r);
				}
			}
		});
		document.addEventListener('fullscreenchange', function() {
			var r = document.querySelector(".fullmode");
			if (!document.fullscreenElement) {
				fullMode = "off";
				_endfullscreen(r);
			}
		});
	}	
	function arrowBuild(e,k){
		var whatGallery = e; //id gallery			
		var galleryIdData = document.querySelector("[data-id='"+(whatGallery)+"']");		
		var arrows = galleryIdData.querySelectorAll('.'+galArrows);		
		Array.from(arrows, el => el.addEventListener('click', e => {changeImg(e,k);})); //листаем по стрелкам в сторону изображения
	}
	function podvalBuild(e,k){
		var whatGallery = e; //id gallery			
		var galleryIdData = document.querySelector("[data-id='"+(whatGallery)+"']");		
		var sectorPodval = galleryIdData.querySelector(".listBlock");
		for(l=0; l<k.length; l++){
			if(l == 0){
				sectorPodval.insertAdjacentHTML("beforeend","<div class='controller -activ' data-id='"+l+"'></div>");
			}else{
				sectorPodval.insertAdjacentHTML("beforeend","<div class='controller' data-id='"+l+"'></div>");
			}
			
		}
	}	
	function resizeImg(k){
		if(!k) return;
		var newGallery = k.getAttribute("data-id");		
		if(newGallery){
			var actImgTNow = k.querySelector('._activ');
		}else{
			var actImgTNow = k;
		}
		if(fullMode == "on"){
			actImgTNow.style.width = actImgTNow.offsetWidth * newKoff + "px";
			actImgTNow.style.height = actImgTNow.offsetHeight * newKoff + "px";
		}else{
			actImgTNow.style.width = actImgTNow.offsetWidth / newKoff + "px";
			actImgTNow.style.height = actImgTNow.offsetHeight / newKoff + "px";
		}		
	}	
	function loadingImg(e,k){
		var whatGallery = e; //id gallery
		var galleryIdData = document.querySelector("[data-id='"+(whatGallery)+"']");		
		var sectorVisible = galleryIdData.querySelector(".galSector");
		var s4et = 0;
		
		for(j=e; j<(k.length); j++){				
			var galKoef = Math.round((sectorVisible.offsetWidth / sectorVisible.offsetHeight) * 100) / 100;
			var imgd = new Image();			
			imgd.onload = function(e){
				s4et++;
				//console.log(s4et);
				//console.log(this.src);
				
				naturalWidth = this.naturalWidth;				
				naturalHeight = this.naturalHeight;
				//console.log(naturalWidth + " | " + naturalHeight);
				var imgNowKoef = Math.round((naturalWidth / naturalHeight) * 100) / 100;
				//console.log(galKoef +" != "+ imgNowKoef);
				if(galKoef > imgNowKoef){
					var imgHeight = sectorVisible.offsetHeight;
					var imgWidth = (sectorVisible.offsetHeight * imgNowKoef);				
				}else if(galKoef < imgNowKoef){
					var imgWidth = sectorVisible.offsetWidth;
					var imgHeight = Math.round(sectorVisible.offsetWidth / imgNowKoef);
				}else if(galKoef = imgNowKoef){
					var imgHeight = sectorVisible.offsetHeight;
					var imgWidth = (sectorVisible.offsetHeight * imgNowKoef);
				}	
				//console.log(imgWidth + " | " + imgHeight);
				if(s4et == 1){
					sectorVisible.insertAdjacentHTML("beforeend","<img data-img='"+(s4et)+"' src='"+this.src+"' class='"+gimgs+" _activ' style='height:"+imgHeight+"px;width:"+imgWidth+"px;'>");
				}else{
					sectorVisible.insertAdjacentHTML("beforeend","<img data-img='"+(s4et)+"' src='"+this.src+"' class='"+gimgs+" nnact' style='height:"+imgHeight+"px;width:"+imgWidth+"px;'>");
				}	
			};
			imgd.src = galShare+k[j];			
		}			
	}
	function changeImg(e,k){
		tp_ar = e.target; //arrows
		tp_mass = k; //mass imgs
		arh = tp_ar.classList.contains(_larrow);//left?
		//ищем родителя, т.е. что за галлерея
		galNowActive = tp_ar.parentElement.parentElement.parentElement;
		//console.log(galNowActive);		
		if(arh){
			var imgNowActiv = galNowActive.querySelector("."+imgAct);
			//console.log(imgNowActiv);
			imgNowActiv.classList.toggle(imgAct);
			imgNowActiv.classList.toggle("nnact");
			var dataIdActiveImg = imgNowActiv.getAttribute("data-img");
			//console.log(dataIdActiveImg);
			if(dataIdActiveImg == 1){//значит это начальное изображение
				var stepScroll = Number(dataIdActiveImg) + Number(mGallery.images.length - 1);
				//console.log(stepScroll);
				var imgNextActiv = galNowActive.querySelector("[data-img='"+stepScroll+"']");
				//console.log(imgNextActiv);
				imgNextActiv.classList.toggle(imgAct);
				imgNextActiv.classList.toggle("nnact");				
				changePodval(galNowActive,stepScroll);
				if(fullMode == "on"){resizeImg(imgNextActiv);}
				
			}else{
				var stepScroll = Number(dataIdActiveImg) - 1;
				//console.log(stepScroll);
				var imgNextActiv = galNowActive.querySelector("[data-img='"+stepScroll+"']");
				//console.log(imgNextActiv);
				imgNextActiv.classList.toggle(imgAct);
				imgNextActiv.classList.toggle("nnact");
				changePodval(galNowActive,stepScroll);
				if(fullMode == "on"){resizeImg(imgNextActiv);}
			}
			
		}else{
			arh = tp_ar.classList.contains(_rarrow);
			if(arh){				
				var imgNowActiv = galNowActive.querySelector("."+imgAct);
				//console.log(imgNowActiv);
				imgNowActiv.classList.toggle(imgAct);
				imgNowActiv.classList.toggle("nnact");
				var dataIdActiveImg = imgNowActiv.getAttribute("data-img");
				//console.log(dataIdActiveImg);
				if(dataIdActiveImg == mGallery.images.length){//значит это конечное изображение
					var stepScroll = Number(dataIdActiveImg) - Number(mGallery.images.length - 1);
					//console.log(stepScroll);
					var imgNextActiv = galNowActive.querySelector("[data-img='"+stepScroll+"']");
					//console.log(imgNextActiv);
					imgNextActiv.classList.toggle(imgAct);
					imgNextActiv.classList.toggle("nnact");
					changePodval(galNowActive,stepScroll);
					if(fullMode == "on"){
						//resizeImg(imgNextActiv);
					}
										
				}else{
					var stepScroll = Number(dataIdActiveImg) + 1;
					//console.log(stepScroll);
					var imgNextActiv = galNowActive.querySelector("[data-img='"+stepScroll+"']");
					//console.log(imgNextActiv);
					imgNextActiv.classList.toggle(imgAct);
					imgNextActiv.classList.toggle("nnact");
					changePodval(galNowActive,stepScroll);
					if(fullMode == "on"){
						//resizeImg(imgNextActiv);
					}					
				}
			}
		}
	}
	function changePodval(e,k){
		var idGalF = e; //id gallery		
		var idElemP = k; //id now visible
		//console.log(k);
		var nowActivPodval = e.querySelector(".galPodval");
		var barActive = nowActivPodval.querySelector(".-activ");
		barActive.classList.toggle("-activ");
		var barNow = nowActivPodval.querySelector("[data-id='"+(k-1)+"']");
		barNow.classList.toggle("-activ");
	}
	function fullsizeMode(e,k){		
		if(fullMode == "off"){
			fullMode = "on";
			_fullscreen(k);
		}else{
			fullMode = "off";
			_endfullscreen(k);
		}
	}
	function _fullscreen(k){		
		k.classList.add("fullmode");
		if (k.requestFullscreen){
			k.requestFullscreen();
		}else if (k.mozRequestFullScreen){
			k.mozRequestFullScreen();
		}else if (k.webkitRequestFullscreen){
			k.webkitRequestFullscreen();
		}else if (k.msRequestFullscreen){
			k.msRequestFullscreen();
		}else{k.classList.toggle("fullscreen");
		}
		resizeImg(k);
	}
	function _endfullscreen(k){
		if(k){
			k.classList.remove("fullmode");
		}
		if (document._endfullscreen) {
			document._endfullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		resizeImg(k);
	}
	
}
