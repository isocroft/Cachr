/*!
 *
 * File: cachr.js
 * Author: Ifeora Okechukwu
 * Version: 0.2.1
 *
 * Desc: Implements Application Cache with an easy interface
 *	 	for browsers with native support (no polyfills)
 *
 * Support: IE10+, Saf4+, FF3.5+, Opr11.5+, Chrm5+
 *
 */

window.Cachr = window.applicationCache && (function(w){

	var webAppCache = null,
 		updatePollDelay = 3600000, // 1 hour
 		percentLoaded = -1,
 		iframe = null,
 		origin = (w.location.origin || w.location.protocol + '//' + w.location.host),
 		stateVal = /^(load|complet)/,
 		__timer = -1;

	 	function go(){ // install the manifest file asynchronously
		 		var state = w.document.readyState;
		 		if(state.search(stateVal) == -1){
		 			setTimeout(arguments.callee, 0);
		 		}
	 			stateVal = iframe;
	 			iframe = w.document.createElement('iframe');
	 			iframe.id = iframe.name = '__app_cache';
	 			iframe.style.cssText = 'display:none;position:absolute;left-9999px;';
	 			iframe.src = origin + '/' + 'offline.html';
	 			w.document.body.appendChild(iframe);
	 			

	 			iframe.onload = function(e){
	 					frameWin = (iframe.contentWindow || iframe.contentDocument.defaultView);
			 			webAppCache = frameWin.applicationCache;

			 			if(!webAppCache){
			 				return;
			 			}

			 			webAppCache.onchecking = function(e){
							reportStatus(this);
						}

						webAppCache.onnoupdate = function(e){
							updatePollDelay = 4800000;
							reportStatus(this);
						}

						webAppCache.ondownloading = function(e){
							percentLoaded = 0 + '%';
							iframe.setAttribute('data-cache-progress', percentLoaded);
							reportStatus(e);
						}

						webAppCache.onprogress = function(e){
							percentLoaded = ((e.loaded/e.total) * 100) + '%';
							iframe.setAttribute('data-cache-progress', percentLoaded);
							reportStatus(this);
						}

						webAppCache.oncached = function(e){
							if(percentLoaded !== '100%'){
								percentLoaded = '100%';
								iframe.setAttribute('data-cache-progress', percentLoaded);
							}
							reportStatus(this);
						}

						webAppCache.onupdateready = function(e){
							var isAllowed = confirm("This App has been updated against your cache. \n \
								\b Would you like to refresh your browser to get this update?");
							__timer = setInterval((function(alwd, cache){
								if(alwd){
									w.location.reload();
								}
								return function(){
							 		cache.update(); 
								}
							}(isAllowed, webAppCache)), updatePollDelay);
							reportStatus(this);
						}

						webAppCache.onerror = webAppCache.onobselete = function(e){
							clearInterval(__timer);
							webAppCache.swapCache();
							reportStatus(this);
						}
				};

	 	};	

	 	function reportStatus(cache){

			 	switch(cache.status){
			 		case 0:
			 			w.console.log("Cache Status: Uncached");
			 		break;
			 		case 1:
			 			w.console.log("Cache Status: Idle");
			 		break;
			 		case 2:
			 			w.console.log("Cache Status: Checking");
			 		break;
			 		case 3:
			 			w.console.log("Cache Status: Downloading")
			 		break;
			 		case 4:
			 			w.console.log("Cache Status: UpdateReady");
			 		break;
			 		case 5:
			 			w.console.log("Cache Status: Obsolete");
			 		break;
			 	}
		};

		return {
			go:function(){
				setTimeout(go, 0);
			}
		}

}(this));
