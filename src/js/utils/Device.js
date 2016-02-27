
'use strict';

var userAgent = navigator.userAgent.toLowerCase(); 

const Device = {
	isChromeOnWindows : function(){
		return (userAgent.indexOf("chrome") !== -1 && userAgent.indexOf("windows") !== -1);
	},
	isWindows : function(){
		return (userAgent.indexOf("windows") !== -1);
	}
};

export default Device;