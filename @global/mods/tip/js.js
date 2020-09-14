class{
	constructor(data,pars){
		this.data=data
		this.pars=pars
		this.off=10
		this.await=mlf.samosbor(`
		.tip
			.shadow
			.tail
			.body<rct>@text@
		`,undefined,this.core={rct:{text:pars.text}}).then(v=>{
			this.el=v[0]
			document.body.style.position='relative'
			this.reset()
		})
	}
	reset(){
		const [rect,brect,erect]=[this.data.elem,document.body,this.el.elem].map(v=>v.getBoundingClientRect()),
		ch=(val,j)=>{
			switch(val){
				case 'top': if(j||rect[val]-erect.height<brect.top) return 'bottom'; break
				case 'right': if(j||rect[val]+erect.width>brect.right) return 'left'; break
				case 'bottom': if(j||rect[val]+erect.height>brect.bottom) return 'top'; break
				case 'left': if(j||rect[val]-erect.width<brect.left) return 'right'; break
			}
			return val
		},
		fn=(s,rect,tail)=>{
			let vect={},shift={top:0,left:0}
			if(tail) vect[side]=0
			if(['left','right'].includes(side)){
				const isl=side=='left'
				if(!tail) vect.left=rect[side]
				if(!corner){
					vect.top=tail?5e1:rect.top+rect.height/2
					shift.top=-5e1
					if(tail) shift.left=5e1
					else vect.left+=this.off*(isl?-1:1)
				}
				if(isl)
					if(tail) shift.left*=-1
					else shift.left=-1e2
			} else if(['top','bottom'].includes(side)){
				const ist=side=='top'
				if(!tail) vect.top=rect[side]
				if(!corner){
					vect.left=tail?5e1:rect.left+rect.width/2
					shift.left=-5e1
					if(tail) shift.top=5e1
					else vect.top+=this.off*(ist?-1:1)
				}
				if(ist)
					if(tail) shift.top*=-1
					else shift.top=-1e2
			}
			if(corner) switch(corner){
				case 'top':
				case 'left':
					vect[corner]=tail?0:rect[corner]
					if(!tail) shift[corner]=-1e2
				break
				case 'bottom':
				case 'right':
					if(tail) vect[corner]=0
					else vect[corner=='bottom'?'top':'left']=rect[corner]
				break
			}
			if(!tail){
				if(x) vect.left+=+x
				if(y) vect.top+=+y
			}
			;['top','right','bottom','left'].forEach(v=>v in vect||(vect[v]=''))
			for(const k in vect) s[k]=vect[k]+(vect[k]?(tail?'%':'px'):'')
			if(shift.left||shift.top) s.transform=`translate(${shift.left}%,${shift.top}%)${tail&&!corner?' rotate(45deg)':''}`
		}
		let {side,corner,x,y}=this.pars
		;[side,corner]=[side,corner].map(v=>ch(v))
		fn(this.el.elem.style,rect)
		;[side,corner]=[side,corner].map(v=>ch(v,true))
		fn(this.el.elem.childNodes[1].style,erect,true)
	}
	get show(){
		this.reset()
		this.el.elem.classList.add('act')
	}
	get hide(){
		this.el.elem.classList.remove('act')
	}
	set text(v){
		this.core.rct.text=v
	}
}