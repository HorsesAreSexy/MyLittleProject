const vt={
	s:'string',
	f:'function',
	b:'boolean',
	o:'object',
	n:'number',
	u:'undefined'
}
dump=null

function setvars(arr,types){
	let res=Array(arr.length).fill(undefined);
	arr.forEach(v=>{
		let t=typeof v;
		if(t==vt.u) return;
		types.some((v2,k2)=>{
			let us
			if(typeof v2==vt.o) $.each(v2,(k3,v3)=>{
				if(t==v3){
					us=true
					return false
				}
			})
			else us=t==v2
			if(res[k2]===undefined && us){
				res[k2]=v;
				return true;
			}
		});
	});
	return res;
}
function random(min, max){
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}
function randomString(len, an){
    an = an&&an.toLowerCase();
    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
    for(;i++<len;){
      var r = Math.random()*(max-min)+min <<0;
      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
    }
    return str;
}
function defer(){
	return new $.Deferred()
}
function range(num){
	return [...Array(num===0?1:num).keys()]
}
function when(...args){
	if(args.length===1&&ioa(args[0])) args=args[0]
	let prom=defer(),
	count=0,
	pars=[],
	reso=()=>prom.resolve(...pars)
	args.forEach((v,k)=>{
		if(!v) return
		if(v.state&&v.state()=='pending'||v['[[PromiseStatus]]']!='resolved'){
			count++
			v.then(ret=>{
				pars[k]=ret
				--count||reso()
			})
		} else
			if(v.done) v.done(ret=>pars[k]=ret)
			else pars[k]=v['[[PromiseValue]]']
	})
	if(!count) setTimeout(reso,100)
	return prom
}
function noshit(a){
	let b=c=>JSON.parse(JSON.stringify(c))
	return a instanceof Array?a.map(b):b(a)
}
function ioa(v){
	return v instanceof Array
}
function sysprop(obj,name,val,...we){
	let [writ=true,type='value']=setvars(we,[vt.b,vt.s])
	proxyflag='ignore'
	if(obj[name]) obj[name]=val
	else{
		let pre={
			enumerable:false,
			configurable:false
		}
		if(type=='value') pre.writable=writ
		Object.defineProperty(obj,name,Object.assign({[type]:val},pre))
	}
	proxyflag=null
	return obj
}
function tojq(){
	let fn=v=>v instanceof $?v:$(v)
	if(arguments.length===1) return fn(arguments[0])
	else if(arguments.length>1) return Array.from(arguments).map(v=>fn(v))
}


$.fn.mult=function(){
	return this.clone(true).insertAfter(this)
}
/*/!\Deprecated/!\
$.fn.parpos=function(){
		let {left:pl,top:pt}=this.parent().offset(),
		{left,top}=this.offset()
    return {left:left-pl,top:top-pt}
}*/
$.fn.random=function(){
    return this.eq([Math.floor(Math.random()*this.length)])
}
$.fn.middle=function(){
	return this.eq([Math.floor($(this).length/2)])
}
/*/!\Deprecated/!\
$.fn.nextLike=function(sel){
	return this.nextAll(sel).first();
}
$.fn.prevLike=function(sel){
	return this.prevAll(sel).first();
}*/
/*/!\Deprecated/!\
$.fn.join=function(to=0){
	return this.each((k,v)=>k!==to&&v.appendTo(this.eq(to)))
}
*/
$.fn.moveTo=function(sel){
	sel=tojq(sel)
	sel.find('>*').remove()
	this.prependTo(sel)
	return this
}
/*/!\Deprecated/!\
$.fn.vhide=function(){
	return this.css('visibility','hidden')
}
$.fn.vshow=function(){
	return this.css('visibility','visible')
}
$.fn.rshow=function(){
	if(this.css('display')=='none') this.css('display','')
	return this
}
*/
$.fn.swapClass=function(cls,from){
	this.addClass(cls).siblings().not(this).removeClass(cls)
	if(from) tojq(from).removeClass(cls)
	return this
}
$.fn.loaded=function(cb){
	if(this[0].complete) cb.call(this,{target:this})
	else this.on('load',cb)
	return this
}
$.fn.liquid=function(fn,...exceptions){
	if(typeof fn!=vt.f) exceptions.unshift(fn),fn=undefined
	exceptions.forEach((v,k)=>{
		v=tojq(v).each((k,v)=>{exceptions.replace(k,v)})
	})
	if(!window.liquid_event) $(document).on('click.liquid',e=>{
		liquid_elems.each((v,k)=>{
			if(v.exc.every(v=>!(v===e.target)&&!v.contains(e.target))&&!v.jq.is(e.target)&&!v.jq[0].contains(e.target)){
				if(fn) fn(v.jq)
				else v.jq.remove()
				if(!liquid_elems.length){
					$(document).off('click.liquid')
					liquid_event=false
				}
			}
		})
	}),liquid_event=true
	let neu={jq:this,exc:exceptions}
	window.liquid_elems?liquid_elems.push(neu):liquid_elems=[neu]
	let curk=liquid_elems.length-1
	this.hook('remove',()=>liquid_elems.delete(curk))
	return this
}
/*/!\Deprecated/!\
$.fn.measure=function(rel){
	let w=$(window),
	{top,left}=this.offset(),
	width=this.outerWidth(),
	height=this.outerHeight(),
	bottom=w.height()-(top+height),
	right=w.width()-(left+width),
	xcenter=left+width/2,
	ycenter=top+height/2,
	res={top,left,width,height,bottom,right,xcenter,ycenter}
	if(rel){
		let rc=rel.measure()
		delete rc.width
		delete rc.height
		delete rc.xcenter
		delete rc.ycenter
		$.each(rc,(k,v)=>{
			res[k]=res[k]-v
		})
		res.xcenter=res.left+width/2
		res.ycenter=res.top+height/2
	}
	return res
}
*/
$.fn.track=function(sel,addcb,delcb){
	let caller=this,
	fn=el=>{
		let bind,
		ignore,
		muta=new MutationObserver((mutationsList)=>{
			if(ignore) return ignore=false
			for(var mutation of mutationsList){
				[[mutation.addedNodes,addcb],[mutation.removedNodes,delcb]].forEach(v=>{
					let cb=v[1]
					if(!v[0].length||!cb) return
					let set=$()
					$(v[0]).each((k,v)=>{$(v).take(sel).each((k,v)=>{set=set.add(v)})})
					set.each((k,v)=>{cb.call(bind,v)})
				})
			}
		})
		muta.observe(el,{childList:true,subtree:true})
		bind={
			off(){
				muta.disconnect()
			},
			skipNext(){
				ignore=true
			}
		}
		$(el).hook('remove',()=>muta.disconnect())
	}
	this.each((k,v)=>{fn(v)})
	return this
}
$.fn.attrchange=function(...args){
	let [attr,cb,childs]=setvars(args,[vt.s,vt.f,vt.b]),
	opts={attributes:true,attributeOldValue:true}
	if(attr) opts.attributeFilter=attr.split(' ')
	if(childs) Object.assign(opts,{childList:true,subtree:true})
	let fn=el=>{
		let bind,
		ignore,
		muta=new MutationObserver(function(mutations){
			if(ignore) return ignore=false
	    mutations.forEach(e=>cb.call(bind,e.target.getAttribute(e.attributeName),e.oldValue,e.attributeName,e.target))
		})
		muta.observe(el,opts)
		bind={
			off(){
				muta.disconnect()
			},
			skipNext(){
				ignore=true
			}
		}
	}
	if(cb) this.each((k,v)=>{fn(v)})
	return this
}
$.fn.indom=function(){
	return this.toArray().every(v=>document.documentElement.contains(v))
}
$.fn.hook=function(type,cb){
	let muta,
	el=this,
	proc=(waitFor,stillwait)=>{
		if(stillwait){
			stillwait=$(stillwait)
			return new MutationObserver(function(mutations){
				for(var mutation of mutations){
					let set=mutation[waitFor]
					if(set.length) set.forEach(v=>{
						if(stillwait.is(v)){
							stillwait=stillwait.not(v)
							if(!stillwait.length){
								this.disconnect()
								cb(el)
							}
						}
					})
				}
			})
		} else cb(el)
	}
	switch(type){
		case 'remove':
			muta=proc('removedNodes',el.toArray().filter(v=>document.documentElement.contains(v)))
		break
		case 'appear':
			muta=proc('addedNodes',el.toArray().filter(v=>!document.documentElement.contains(v)))
		break
	}
	muta&&muta.observe(document.documentElement,{childList:true,subtree:true})
}
/*/!\Deprecated/!\
$.fn.tohtml=function(){
	this.html(this.text())
	return this
}
*/
$.fn.take=function(sel){
	let res=this.filter(sel)
	if(res.length) return res
	return this.find(sel)
}


Function.prototype.params=function(){
  return new RegExp('^(?:'+this.name.noregexp+'|)\\s*\\((.*?)\\)').exec(this.toString().replace(/\n/g, ''))[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '');
}

String.prototype.has=function(...val){
	return val.some(v=>this.search(v)!=-1)
}
String.prototype.replaceAll=function(find,rep){
	return find.reduce((res,v,k)=>res.replace(typeof v==vt.s?new RegExp(v.noregexp,'g'):v,ioa(rep)?rep[k]:rep),this).toString()
}
String.prototype.overflow=function(max,end='...'){
	return this.length>max?this.slice(0,max)+end:this
}
//'бутыл'.end(1, 'ка', 'ки', 'ок')
String.prototype.end=function(num, ...words){
	if(typeof num!=vt.n){
		words.unshift(num)
		let tre=this.match(/\d+/g)
		if(tre) num=+tre.last[0]
		else return this
	}
  if((num=Math.abs(num%100)) > 20) num%=10;
  return this+words[ (num > 4 || num === 0) + (num !== 1) ].toString()
}
sysprop(String.prototype,'pls',function(){
    return this+'?'+randomString(5).toString()
},'get')
Object.defineProperty(String.prototype,'noregexp',{
	get:function(){
		return this.replace(/[|\\{}()[\]^$+*?.]/g,'\\$&').toString()
	},
	enumerable:false,
	configurable:false
})

let arrfns={
	findKey:function(name,val){
		return this.findIndex(v=>v[name]===val)
	},
	//ищет объект, у которого свойство name равно val
	findVal:function(name,val){
		return this.find(v=>v[name]===val)
	},
	//ищет объект в массиве, который и есть val
	findData:function(val){
		return this.findIndex(v=>Object.is(v,val))
	},
	//удаляет перечисленные значения, если они были найдены в массиве
	remove:function(){
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
	},
	each:function(){
		return this.forEach(...arguments)
	},
	//[key1,key2]=[[val1,val2],[val1,val2]]=>[{key1:val1},{key2,val2}]
	data:function(...args){
		let res=[]
		args.forEach(v=>{
			let cur={}
			v.forEach((v,k)=>{
				cur[this[k]]=v
			})
			res.push(cur)
		})
		return res
	},
	//[key1,key2]=[[val1,val1],[val2,val2]]=>[{key1:val1},{key2,val2}]
	bunch:function(...args){
		let res=[],
		i=0,
		over=false,
		t=this
		while(!over){
			let cur={}
			over=t.some((v,k)=>{
				let q
				if(q=args[k][i]) cur[v]=q
				else return true
			})
			if(!over) i++,res.push(cur)
		}
		return res
	},
	merge:function(arr){
		arr.forEach((v,k)=>{
			for(let attr in v) this[k][attr]=v[attr]
		})
		return this
	},
	/*/!\Deprecated/!\
	prep:function(str){
		return this.map(v=>{
			if(typeof v==vt.s) v=str+v
			return v
		})
	},*/
	/*/!\Deprecated/!\
	app:function(str){
		return this.map(v=>{
			if(typeof v==vt.s) v+=str
			return v
		})
	},*/
	copy:function(){
		return this.slice()
	},
	clean:function(){
		let set=[]
		this.forEach((v,k)=>v||set.push(k))
		this.delete(...set)
		return this
	}
}
for(let k in arrfns){
	arrfns[k]={
		value:arrfns[k],
		enumerable:false,
		writable:false,
		configurable:false
	}
}
Object.defineProperties(Array.prototype,arrfns)

let srtwas=Array.prototype.sort
Array.prototype.sort=function(...args){
	let canbe=args[0]
	return typeof canbe!=vt.s?srtwas.call(this,...args):srtwas.call(this,(a,b)=>{
		  if(a[canbe]>b[canbe]) return 1
		  if(a[canbe]<b[canbe]) return -1
		  return 0
		})
}

Object.defineProperty(Array.prototype,'last',{
	get(){
		return this[this.length-1]
	},
	set(val){
		this[this.length-1]=val
	},
	enumerable:false,
	configurable:false
})

const $obj=function(self){
	return new class{
		load(){
			let arr=[]
			return arr.load(...arguments).done(()=>arr[0]&&Object.assign(self,arr[0]))
		}
		equal(obj){
			let process=(one,two)=>{
				if(typeof one!=vt.o) return one===two
				if(typeof two!=vt.o) return false
				let a=one.constructor,
				b=two.constructor
				if(a!=b) return false
				if(a==Object) return compare(one,two)
				if(a==Array) return arrrec(one,two)
			},
			compare=(one,two)=>{
				if($obj(one).length!==$obj(two).length) return false
				let res
				$obj(one).each((v,k)=>res=process(v,two[k]))
				return res
			},
			arrrec=(one,two)=>{
				if(one.length!==two.length) return false
				return one.every((v,k)=>process(v,two[k]))
			}
			return compare(self,obj)
		}
		each(fn){
			Object.keys(self).some(v=>fn(self[v],v)===false)
			return this
		}
		get makeFD(){
			let fd=new FormData()
			for(let k in self){
				let v=self[k]
				if(v instanceof Array) v.each(v=>fd.append(k+'[]',v))
				else fd.set(k,v)
			}
			return fd
		}
		renameKey(oldName,newName){
			let res
      if(self instanceof Array) res=self.map(v=>{
      	if(typeof v==vt.o) v=$obj(v).renameKey(oldName,newName)
      	return v
      })
      else{
      	res=$obj(self).copy()
      	let fn=(f,s)=>{
      		if(res.hasOwnProperty(f)){
	            res[s]=res[f];
	            delete res[f];
	        }
      	}
      	if(oldName instanceof Array) oldName.forEach((v,k)=>{
      		fn(v,typeof newName==vt.s?newName:newName[k])
      	})
      	else fn(oldName,newName)
      }
      return res;
		}
		get length(){
			return Object.keys(self).length;
		}
	}
}