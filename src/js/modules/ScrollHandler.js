
'use strict';

import Device from './Device.js';

export default class {

   constructor(callback){
      this.callback = callback;
   }

	 add(){

      var deviceInst = new Device();
      

      console.log(deviceInst);
      

      document.addEventListener('wheel', this.callback);
      document.addEventListener('mousewheel', this.callback);
   }

   remove(){
      document.removeEventListener('wheel', this.callback);
      document.removeEventListener('mousewheel', this.callback);
   }
  
}
