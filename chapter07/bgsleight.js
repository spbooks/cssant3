function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

var bgsleight	= function() {
	
	function fnLoadPngs() {
		var rslt = navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
		var itsAllGood = (rslt != null && Number(rslt[1]) >= 5.5);
		for (var i = document.all.length - 1, obj = null; (obj = document.all[i]); i--) {
			if (itsAllGood && obj.currentStyle.backgroundImage.match(/\.png/i) != null) {
				fnFixPng(obj);
				obj.attachEvent("onpropertychange", fnPropertyChanged);
			}
			if ((obj.tagName=='A' || obj.tagName=='INPUT') && obj.style.position == ''){
			obj.style.position = 'relative';
			
			}
		}
	}

	function fnPropertyChanged() {
		if (window.event.propertyName == "style.backgroundImage") {
			var el = window.event.srcElement;
			if (!el.currentStyle.backgroundImage.match(/x\.gif/i)) {
				var bg	= el.currentStyle.backgroundImage;
				var src = bg.substring(5,bg.length-2);
				el.filters.item(0).src = src;
				el.style.backgroundImage = "url(x.gif)";
			}
		}
	}

	function fnFixPng(obj) {
		var mode = 'scale';
		var bg	= obj.currentStyle.backgroundImage;
		var src = bg.substring(5,bg.length-2);
		if (obj.currentStyle.backgroundRepeat == 'no-repeat') mode = 'crop';
		obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='" + mode + "')";
		obj.style.backgroundImage = "url(/img/shim.gif)";
	}
	
	return {
		init: function() {
			if (navigator.platform == "Win32" && navigator.appName == "Microsoft Internet Explorer" && window.attachEvent) {
				addLoadEvent(fnLoadPngs);
			}
		}
	}
}();

bgsleight.init();