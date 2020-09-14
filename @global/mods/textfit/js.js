const max=typeof width!='undefined'?width:this.up.elem.offsetWidth
let fs=parseInt(window.getComputedStyle(this.elem).fontSize)
while(this.elem.offsetWidth>max) this.elem.style.fontSize=--fs+'px'