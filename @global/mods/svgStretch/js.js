[x,y]=[x,y].map(v=>v.split(' ').map(v=>v-1))
let pts=this.elem.getAttribute('points').split(',').map(v=>v.trim().split(' '))
const curmax=['x','y'].reduce((a,v,k)=>(a[v]=Math.max.apply(Math,(k?y:x).map(v=>pts[v][k])),a),{}),
indent=['x','y'].reduce((a,v,k)=>(a[v]=(k?typeof indentY:typeof indentX)=='undefined'?0:k?indentY:indentX,a),{}),
fn=()=>{
	const {height,width}=this.elem.parentNode.getBoundingClientRect()
	this.elem.setAttribute('points',pts.map((v,k)=>[x,y].map((side,pos)=>side.includes(k)?v[pos]=(pos?height:width)-(curmax[pos?'y':'x']-v[pos])-indent[pos?'y':'x']:v[pos]).join(' ')).join(','))
}
fn()