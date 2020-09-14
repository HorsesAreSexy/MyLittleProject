let width,height,top,left
const reset=()=>{
	;[width,height]=['Width','Height'].map(v=>this.elem['offset'+v])
	;[top,left]=['top','left'].map(v=>this.elem.style[v]?parseInt(this.elem.style[v]):0)
},
move=(rect,hory,vert,lshift,tshift)=>e=>{
	e.preventDefault()
	if(hory){
		const dif=rect.x-(rect.x+=e.clientX-rect.x)
		if(lshift){
			this.elem.style.left=(left-=dif)+'px'
			this.elem.style.width=(width+=dif)+'px'
		} else this.elem.style.width=(width-=dif)+'px'
	}
	if(vert){
		const dif=rect.y-(rect.y+=e.clientY-rect.y)
		if(tshift){
			this.elem.style.top=(top-=dif)+'px'
			this.elem.style.height=(height+=dif)+'px'
		} else this.elem.style.height=(height-=dif)+'px'
	}
},
fn=corns=>(v,k)=>{
	const el=document.createElement('div'),
	even=k%2
	el.style=`position:absolute;top:${v.top};left:${v.left};${corns?`width:${borders};height:${borders};z-index:99;cursor:${even?'nesw-resize':'nwse-resize'};`:`${even?'height':'width'}:100%;${even?'width':'height'}:${borders};z-index:98;cursor:${even?'ew-resize':'ns-resize'};`}`
	el.addEventListener('mousedown',e=>{
		e.preventDefault()
		reset()
		document.body.addEventListener('mousemove',mfn=move(el.getBoundingClientRect(),corns||even,corns||!even,corns&&!k||k==3,!k||corns&&k==1))
	})
	document.body.addEventListener('mouseup',()=>document.body.removeEventListener('mousemove',mfn))
	this.elem.appendChild(el)
	let mfn
}
;[
	{top:0,left:0},
	{top:0,left:'100%'},
	{top:'100%',left:0},
	{top:0,left:0}
].forEach(fn())
;[
	{top:0,left:0},
	{top:0,left:'100%'},
	{top:'100%',left:'100%'},
	{top:'100%',left:0}
].forEach(fn(true))
