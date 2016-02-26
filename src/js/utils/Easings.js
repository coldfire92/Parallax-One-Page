
'use strict';

const Easings = {
	easeIn : function(t, b, c, d) {
  		return -c * (t /= d) * (t - 2) + b;
	}
};

export default Easings;