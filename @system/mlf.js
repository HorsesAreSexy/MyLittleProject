fetch.easy=(route,send)=>new Promise(async(res,rej)=>{
	const q=await fetch(route,{
		method:'POST',
	  headers:{
	    'Accept':'application/json',
	    'Content-Type':'application/json'
	  },
	  mode:'same-origin',
	  credentials:'omit',
	  cache:'no-cache',
	  redirect:'error',
	  body:typeof send=='object'?JSON.stringify(send):send
	})
	if(q.status==200) res(await q.json())
	else rej(await q.text())
})
Object.defineProperty(String.prototype,'noregexp',{
	get:function(){
		return this.replace(/[|\\{}()[\]^$+*?.]/g,'\\$&').toString()
	},
	enumerable:false,
	configurable:false
})
Function.async=Object.getPrototypeOf(async()=>{}).constructor
Element.prototype.anima=function(obj,opts){
	if(typeof opts=='object') var {reset,lone}=opts
	const styles=window.getComputedStyle(this),
	ents=Object.entries(obj),
	anima=this.animate(ents.reduce((a,[k,v])=>(a[k.replace(/-./,v=>v[1].toUpperCase())]=Array.isArray(v)?v:[styles[k],v],a),{}),opts),
	res=new Promise(res=>{
		anima.onfinish=()=>res(anima)
		anima.oncancel=()=>res(false)
	})
	if(lone&&this.ongoingAnimas) this.ongoingAnimas.forEach(v=>v[lone]())
	;(this.ongoingAnimas||(this.ongoingAnimas=[])).push(anima)
	res.then(()=>this.ongoingAnimas.delete(this.ongoingAnimas.findIndex(v=>v==anima)))
	if(!reset) res.then(r=>r&&ents.forEach(([k,v])=>this.style[k]=Array.isArray(v)?v[v.length-1]:v))
	;['cancel','finish','pause','play','reverse'].forEach(v=>res[v]=anima[v].bind(anima))
	res.face=anima
	return res
}

{
	const adds={
		add(v,k){
			if(k===undefined) this.push(v)
			else this.splice(k,0,v)
		},
		delete(k){
			this.splice(k,1)
		},
		swap(p1,p2,shift){
			const lose=this[p2]
			this[p2]=this[p1]
			if(shift) this.splice(p1,1)
			else this[p1]=lose
		},
		align(...types){
			if(types[types.length-1]===true) var rest=types.pop()
			const copy=[...this],
			fn=type=>{
				let sr
				return copy.find((v,k)=>{
					const tov=typeof v
					if(tov=='object'?v instanceof type:tov==(sr||(sr=String(type).match(/(?<=function )\w+/)[0].toLowerCase()))){
						copy.delete(k)
						return true
					}
				})
			},
			res=types.map(type=>{
				if(Array.isArray(type)) for(const v of type){
					const res=fn(v)
					if(res!==undefined) return res
				} else return fn(type)
			})
			if(rest) res.push(...copy)
			return res
		},
		unite(...vals){
			return vals.map(v=>v.reduce((a,v,k)=>(a[this[k]]=v,a),{}))
		}
	}
	for(const k in adds) Object.defineProperty(Array.prototype,k,{value:adds[k]})
}

{
	const random=Math.random
	Math.random=function(min,max){
		return min===undefined?random():Math.floor(random()*(max-min+1))+min
	}
}
Math.operate=function(){
	const args=[...arguments]
	let fn
	switch(args.pop()){
		case '+':
			fn=(a,v)=>a+v
		break
		case '-':
			fn=(a,v)=>a-v
		break
		case '/':
			fn=(a,v)=>a/v
		break
		case '*':
			fn=(a,v)=>a*v
		break
		case '>':
			fn=(a,v)=>a>v
		break
		case '<':
			fn=(a,v)=>a<v
		break
		case '>=':
			fn=(a,v)=>a>=v
		break
		case '<=':
			fn=(a,v)=>a<=v
		break
	}
	return args.reduce(fn)
}

mlf=new class mylittleframework{
	constructor(){
		this.pref='mlf'
		this.cache=['pages','mods','pies','rdb'].reduce((a,v)=>(a[v]={},a),{})
		this.cache.img=[]
		this.reacts=[]
		this.w84end=[]
		this.slots={sub:{}}
		for(const v of ['tumbs','tumbcbs','conform','wsEvents']) this[v]={}
		this._subch=v=>location.href=location.protocol+'//'+v+'.'+this.domain
		this.evst=function(...evs){
			for(const ev of evs) if(this.events[ev]){
				this.events[ev].forEach(v=>v())
				delete this.events[ev]
			}
		}
		window.onpopstate=()=>this.page(window.location.pathname.slice(1),false)
		new MutationObserver(m=>{
			for(const muta of m) for(const delel of muta.removedNodes) if(delel.mlf){
				if(delel.mlf.bury.no) delete delel.mlf.bury.no
				else delel.mlf.bury.forEach(v=>v())
			}
		}).observe(document.body,{childList:true,subtree:true})
		this.anchor=document.getElementById('mlf-anchor')
		this.apply(this.loadbar=document.createElement('div'),'+id=mlf-loadbar|+id=mlf-runner')
		document.body.appendChild(this.loadbar)
		this.alertel=document.createElement('div')
		this.alertel.id='mlf-alert'
		document.body.appendChild(this.alertel)
		const main=document.createElement('div')
		main.classList.add('mlf-slot')
		const el=document.createElement('mlf-transpart'),
		el2=el.cloneNode()
		;[el,el2].forEach(v=>main.appendChild(v))
		this.slots.main={free:el,taken:el2}
		const hudslot=document.createElement('div')
		hudslot.classList.add('mlf-hud')
		this.slots.hud={slot:hudslot}
		;[hudslot,main].forEach(v=>document.body.appendChild(v))
		window.addEventListener('unload',()=>navigator.sendBeacon('out.api','lul'))
		
	}
	scrut(...args){
		args=args.align(Array,String,true)
		const ff=args.shift()||[],
		obj={str:args.shift(),flags:new Set(ff),struct:args,res:{},stage:0,pos:0},
		pr=v=>{
			let pzdc
			switch(typeof v){
				case 'string':
					v in obj.res||(obj.res[v]='')
					obj.res[v]+=obj.sym
					smtn=true
				break
				case 'number':
					if(cond=obj.pos+v<obj.str.length) obj.pos+=v-1
				break
				case 'boolean':
					if(!v) pzdc=true
					else if(++obj.stage>=obj.struct.length){
						all.push(obj.res)
						obj.res={}
						obj.stage=0
						obj.flags=new Set(ff)
						smtn=false
					}
				break
				default:
					if(v===null){
						smtn=false
						all=null
						pzdc=true
					}
			}
			return pzdc
		}
		let smtn,
		all=[],
		cond=true
		Object.defineProperty(all,'obj',{value:obj})
		while(cond){
			obj.sym=obj.str[obj.pos]
			const ret=obj.struct[obj.stage](obj)
			cond=obj.pos+1<obj.str.length
			if(Array.isArray(ret)?ret.map(pr).some(v=>v):pr(ret)) break
			if(cond) obj.pos+=1
		}
		if(smtn) all.push(obj.res)
		return all
	}
	get subdom(){
		if(!this._subdom){
			const mtch=location.hostname.match(new RegExp(`^.*(?=\.${this.domain.noregexp})`))
			this._subdom=mtch?mtch[0].split('.'):[]
		}
		return new Proxy(this._subdom,{
			set:(t,k,v)=>{
				t[k]=v
				if(!isNaN(k)) this._subch(t.join('.'))
				return true
			},
			deleteProperty:(t,k)=>{
				if(isNaN(k)) delete t[k]
				else{
					t.splice(k,1)
					this._subch(t.join('.'))
				}
				return true
			}
		})
	}
	set subdom(v){
		this._subdom=v?Array.isArray(v)?v:v.split('.'):[]
		this._subch(v)
	}
	get ldb(){
		return new Proxy({},{
			get(t,dest){
				const so=window.localStorage.getItem(dest),
				obj=so?JSON.parse(so):{}
				return new Proxy(obj,{
					get(t,k){
						return t[k]===undefined?t[k]={}:t[k]
					},
					set(t,k,v){
						t[k]=v
						window.localStorage.setItem(dest,JSON.stringify(t))
						return true
					}
				})
			}
		})
	}
	async wsSend(e,m,s){
		if(!this.wsCon||this.wsCon instanceof Promise) await (this.wsCon||(this.wsCon=new Promise(reso=>{
			const ws=new window.WebSocket('ws://'+window.location.host+':1488')
			ws.onopen=()=>ws.send(this.token)
			ws.onmessage=({data})=>{
				this.wsCon=ws
				ws.onmessage=({data})=>{
					if(data[0]=='e'){
						data=JSON.parse(data.slice(1))
						this.ws[data.e].forEach(fn=>fn(data.m))
					} else{
						const rgxp=/(\w)([\d-]*)({(?:(?:".*?(?<!\\)")|.)+?})?/g
						let pars,
						tally
							console.log(data)
						while(pars=rgxp.exec(data.replace(/^\d+/,v=>(tally=v,'')))){
							let [_,order,pos,obj]=pars
							if(obj) obj=JSON.parse(obj)
							const vict=this.cache.rdb[this.reacts[tally]]
							switch(order){
								case 'i':
								case 'r':
									vict.add(obj,pos)
								break
								case 'u':{
									const target=pos?vict[pos]:vict
									for(const k in obj) target[k]=obj[k]
								}break
								case 'd':
									vict.delete(pos)
								break
								case 's':
									vict.swap(...pos.split('-'))
								break
								case 'p':
									vict.swap(...pos.split('-'),true)
								break
							}
						}
					}
				}
				reso()
			}
		})))
		e&&this.wsCon.send(JSON.stringify(s!==undefined?{e,s:Number(s)}:{e,m}))
	}
	get ws(){
		return new Proxy(this.wsSend,{
			get:(s,ev)=>{
				return this.wsEvents[ev]||(this.wsEvents[ev]=new Proxy([],{
					set:(s,k,v)=>{
						const l=s.length
						s[k]=v
						if(!l&&!isNaN(k)) this.wsSend(ev,undefined,true)
						return true
					},
					deleteProperty:(s,k)=>{
						if(isNaN(k)) return delete s[k]
						s.splice(k,1)
						if(!s.length){
							delete this.wsEvents[ev]
							this.wsSend(ev,undefined,false)
						}
						return true
					}
				}))
			}
		})
	}
	get db(){
		let str='',
		lastprop,
		fp,
		p=new Proxy((...args)=>{
			str+='('+args.map(fn)+')'
			if(fp||fin.includes(lastprop)) return (async()=>{
				const rdb=lastprop=='react'||lastprop=='rea'
				if(rdb&&str in this.cache.rdb) return await this.cache.rdb[str]
				await this.wsSend()
				const send={t:this.token,s:str},
				log=!('logged' in this)&&window.localStorage.getItem('[[mlf-log]]')
				if(log) send.l=log
				if(rdb){
					if(this.w84end.length) await new Promise(r=>{
						const fn=()=>{
							if(this.w84end.length){
								const iter=[...this.w84end]
								this.w84end=[]
								Promise.all(iter).then(fn)
							} else r()
						}
						fn()
					})
					send.o=this.reacts.push(str)-1
				}
				p=fetch.easy('db.api',send)
				if(log) this.logged=p
				if(rdb) this.cache.rdb[str]=p
				let res=await p
				if(log){
					this.logged=res.pop()
					res=res[0]
				}
				if(rdb)
					if(res){
						const prx=this.observe(res)
						Object.defineProperty(prx,'[[react]]',{value:true})
						this.cache.rdb[str]=prx
					}
					else delete this.cache.rdb[str]
				return res
			})()
			return p
		},{get(s,k){
			if(fp!==false) fp=!fp
			str+=(str?'.':'')+(lastprop=k)
			return p
		}})
		const fin=['get','necro','set','push','delete','restore','react','rea','nec','pus','del','res'],
		fn=v=>{
			if(typeof v=='object') return Array.isArray(v)?'['+v.map(fn)+']':`{${Object.entries(v).map(([k,v])=>`'${k}':${fn(v)}`)}}`
			return typeof v=='string'?'`'+v+'`':v
		}
		return p
	}
	login(log,pass){
		if(this.logged){
			let letsee
			if(this.logged===true) letsee='Already logged in'
			else if(this.logged instanceof Promise) letsee='Attempt already was made'
			else if(this.logged==log+pass) letsee='No such account'
			if(letsee) return Promise.reject(letsee)
		}
		return this.logged=fetch.easy('login.api',{t:this.token,l:log,p:pass}).then(v=>{
			if(v) window.localStorage.setItem('[[mlf-log]]',v)
			return this.logged=Boolean(v)
		})
	}
	logout(){
		if(this.logged=false) return Promise.reject('Already logged out')
		return this.logged=fetch.easy('logout.api',{t:this.token}).then(v=>v&&(this.logged=false,v))
	}
	alert(time){
		const fo=()=>this.alertel.anima({opacity:0}).then(()=>{
			this.alertel.innerHTML=''
			this.alertel.classList=''
		})
		this.alertel.anima({opacity:1}).then(()=>{
			if(time instanceof Promise) time.finally(fo)
			else setTimeout(fo,time*1000)
		})
		return this.alertel
	}
	async page(...args){try{
		const first=this.url===undefined,
		was=this.url||''
		let [route,history=true]=args.align([String,Object],Boolean)
		if(typeof route=='object'){
			var plump=route
			route=window.location.pathname.slice(1)+window.location.search
		}
		if(route=='<') route=was.replace(/\/[^/]+$/,'')
		else{
			if(route[route.length-1]=='/') route=route.slice(0,-1)
			else{
				var gets
				route=route.replace(/\?.+$/,full=>{
					full.slice(1).split('&').reduce((a,v)=>{
						const eq=v.indexOf('=')
						a[v.slice(0,eq)]=v.slice(eq+1)
						return a
					},{})
					gets={}
					return ''
				})
			}
			if(route[0]=='/') route=was?was+route:route.slice(1)
		}
		try{
			route=decodeURI(route)
		} catch(e){
			route='@broken_URI'
		}
		if(route==was&&!first) return
		this.loadbar.style.display='block'
		this.loadbar.anima({opacity:1})
		this.url=route
		const map=[],
		kuku={
			new:route?route.split('/'):[],
			old:was?was.split('/'):[]
		},
		join=(s,k)=>{
			let res='',
			i=0
			while(i<=k) res+=(i?'/':'')+s[i++]
			return res
		}
		let build=[],
		pathes=[],
		collapse=first,
		main,
		repe=-1,
		send=!plump&&!route&&!this.cache.pages._main,
		k=Math.max(kuku.new.length,kuku.old.length)-1
		for(k;k>=0;k-=1){
			if(repe==-1&&k in kuku.old){
				const oldroute=join(kuku.old,k),
				inn=k in kuku.new,
				eq=inn&&oldroute==join(kuku.new,k)
				if((!(oldroute in this.cache.pages)||this.cache.pages[oldroute].type!='sub')&&!eq) collapse=true
				if(!inn) continue
				if(eq){
					repe=k
					if(!collapse) break
				}
			}
			const path=join(kuku.new,k),
			record=this.cache.pages[path]
			pathes.push(path)
			if(record){
				build.push(record)
				map[k]=''
				if(record.type!='sub') break
			} else{
				build.push(null)
				const dyn=this.cache.pages[join(kuku.new,k-1)+'/?']
				map[k]=dyn?dyn.type=='sub'?'?':'|':'!'
				send=true
			}
		}
		if(collapse&&!~k){
			const mp=this.cache.pages._main
			if(!mp){
				main=true
				send=true
			}
			pathes.push('_main')
			build.push(mp||null)
		}
		if(send)send:{
			const rest=plump||(await fetch.easy('page.api',{route,map:map.join('/'),hud:!this.cache.pages._hud,main,'404':!this.cache.pages._404})),
			lng=kuku.new.length-1
			if(rest.length){
				if(rest[rest.length-1].hud) this.cache.pages._hud=rest.pop()
				if(rest[0]['404']){
					build=[this.cache.pages._404=rest[0]]
					pathes=['_404']
					break send
				}
			}
			for(const k in build){
				if(build[k]) continue
				const nv=rest.shift()
				if(!nv){
					build=[this.cache.pages._404||{type:'solo',tpl:'return ">INSERT_DEFAULT_404_PAGE_HERE"'}]
					break
				}
				if(typeof nv=='object'){
					const path=join(kuku.new,lng-k)||'_main'
					build[k]=this.cache.pages[path]=nv
					if(nv.dyn) this.cache.pages[join(kuku.new,lng-k-1)+'/?']=nv
					if(nv.type=='sub') continue
				} else{
					build[k]=this.cache.pages[join(kuku.new,lng-k)]=this.cache.pages[join(kuku.new,lng-k-1)+'/?']
					if(nv=='?') continue
				}
				build.splice(+k+1)
				break
			}
		}
		if(first){
			const wtr=document.getElementById('mlf-waiter')
			if(wtr) wtr.remove()
		}
		const trans=(slot,rec,disa)=>{
			if(!rec) return
			const cust=rec[disa?'disappear':'appear'],
			prom=cust?new Function.async(cust).call(slot):slot.anima({opacity:[Number(disa||false),Number(!disa)]},400)
			if(disa) prom.then(res=>res&&disafn(slot))
			return prom
		},
		disafn=slot=>{
			;[...slot.classList].forEach(v=>/^mlf-page-/.test(v)&&slot.classList.remove(v))
			slot.innerHTML=''
			if(slot.mlf){
				slot.mlf.bury=slot.mlf.bury.reduce((a,v,k)=>(v.paging?v():a.push(v),a),[])
			}
		}
		if(!build.length||build[build.length-1].type=='sub') subclear:{
			let path=join(kuku.old,repe+1)
			if(!(path in this.slots.sub)) path=join(kuku.old,repe)+'/?'
			if(!(path in this.slots.sub)) break subclear
			const {slot,current}=this.slots.sub[path],
			ani=trans(slot,current,true)
			if(ani){
				this.slots.sub[path].anima=ani
				await ani.then(()=>{
					const imp=path.replace(/\//g,'_')
					for(const v of document.head.getElementsByClassName('mlf-pagestyl')) v.id.includes(imp)&&v.remove()
					this.slots.sub[path].anima=null
				})
			}
		}
		if(build.length){
			const began=async(obj,entry,opts,ishud)=>{
				const slot=entry.slot||entry.free,
				anima=entry.anima,
				core={},
				imp=ishud?'_hud':pathes[build.length].replace(/\//g,'_'),
				name=ishud?'mlf-hud':'mlf-page-'+imp
				if(anima){
					anima.cancel()
					disafn(slot)
				}
				const tpl=await new Function.async(obj.tpl).call({...opts,slot,get:gets,core})
				if(this.url!=route) throw 0
				slot.classList.add(name)
				if(obj.styl&&![...document.head.getElementsByClassName('mlf-pagestyl')].find(el=>el.id==imp)){
					const stel=document.createElement('style')
					stel.id=imp
					stel.classList.add('mlf-pagestyl')
					stel.innerHTML=stylus(this.stylcore+'.'+name+'\n'+obj.styl.replace(/^/gm,'\t')).render()
					document.head.insertBefore(stel,this.anchor)
				}
				await this.samosbor(tpl,slot,core)
				trans(slot,obj)
			}
			if(build[build.length-1].type!='sub'){
				if(this.reacts.length){
					this.reacts=[]
					this.cache.rdb={}
					this.w84end.push(fetch.easy('halt.api',this.token))
				}
				const v=build.pop(),
				path=pathes[build.length]
				for(const v of document.head.getElementsByClassName('mlf-pagestyl')) v.remove()
				if(v.type=='lone'){
					if(this.hudbool){
						const slot=this.slots.hud,
						hud=this.cache.pages._hud,
						p=trans(slot.slot,hud,true)
						if(p){
							slot.anima=p
							p.then(()=>slot.anima=null)
						}
						if(typeof hud.hud=='object') ['top','right','bottom','left'].forEach(v=>document.body.style['padding-'+v]='unset')
						this.hudbool=false
					}
				} else if(!this.hudbool&&'_hud' in this.cache.pages){
					const hud=this.cache.pages._hud
					await began(hud,this.slots.hud,{
						name:'@hood',
						url:this.url
					},true)
					this.hudbool=true
					if(typeof hud.hud=='object') for(const k in hud.hud) document.body.style['padding-'+k]=hud.hud[k]
				}
				await began(v,this.slots.main,{
					name:v.main?'@main':path.match(/(?:\/|^)([^/]+$)/)[1],
					url:v.main?'':path
				})
				const {free,taken,current}=this.slots.main,
				p=trans(taken,current,true)
				if(p) p.then(()=>this.slots.main.anima=null)
				this.slots.main={free:taken,taken:free,current:v,anima:p}
			}
			while(build.length){
				const v=build.pop(),
				path=pathes[build.length]
				let cr=path
				if(!(cr in this.slots.sub)){
					if(v.dyn) cr=path.replace(/(?:\/|^)[^/]+$/,'/?')
					if(!(cr in this.slots.sub)) break
				}
				await began(v,this.slots.sub[cr],{
					name:kuku.new[build.length+1],
					url:path
				})
				this.slots.sub[cr].current=v
			}
		}
		this.loadbar.anima({opacity:0}).then(()=>this.loadbar.style.display='none')
		history&&window.history[(first?'replace':'push')+'State']('','','/'+this.url)
	}catch(e){console.error('PAGE',e)}}
	observe(obj){
		if('[[proxy]]' in obj) return obj
		let proxy
		if(Array.isArray(obj)){
			const adding=(k,v,rep=false)=>{
				const obs=this.observe(v)
				obj.splice(k,Number(rep),obs)
				for(const set of proxy['[[mutations]]']){
					const ishere=k in set.hive
					let next
					if(ishere) next=set.hive[k].elem
					else
						if(set.hive.length) next=set.hive[set.hive.length-1].elem.nextSibling
						else next=set.prev?set.prev.elem.nextSibling:set.mlf.up.elem.firstChild
					this.commiexec(set.mlf.comm,{...set.mlf,...this.emptyStruct,bind:obs,elem:undefined,bury:[...set.mlf.bury]},next).then(newel=>{
						if(rep&&ishere) set.hive[k].elem.remove()
						set.hive.splice(k,Number(rep&&ishere),newel)
						if(set.rest) this.samosbor(set.rest,newel,set.tab+1)
					})
				}
				return obs
			}
			proxy=new Proxy(obj,{
				set:(s,k,v)=>{
					if(isNaN(k)){
						s[k]=v
						return true
					} else return adding(k,v,true)
				},
				deleteProperty:(s,k)=>{
					if(!isNaN(k)&&k in s) for(const p in s[k]) delete s[k][p]
					return delete s[k]
				}
			})
			const w8=(str,act,fs)=>{
				const cbs=str.mutaev[act]
				if(cbs) return Promise.all([...cbs].map(v=>{
					if(v.once) cbs.delete(v)
					const obj={name:act}
					if(fs) obj.target=fs
					return v(obj)
				}))
			},
			adds={
				add(v,k){
					if(k===undefined) proxy.push(v)
					else adding(k,v)
				},
				async delete(k){
					if(!(k in proxy)) return
					obj.splice(k,1)
					for(const set of proxy['[[mutations]]']){
						const str=set.hive[k]
						await w8(str,'delete')
						str.elem.remove()
						set.hive.splice(k,1)
					}
				},
				swap(p1,p2,shift){
					const lose=obj[p2]
					obj[p2]=obj[p1]
					if(shift) obj.splice(p1,1)
					else obj[p1]=lose
					proxy['[[mutations]]'].forEach(shift?async set=>{
						const [ds,is]=[p2,p1].map(v=>set.hive[v])
						await w8(ds,'delete')
						ds.elem.remove()
						await w8(is,'swap',ds)
						set.mlf.up.elem.insertBefore(is.elem,ds.elem.nextSibling)
						set.hive[p2]=is
						set.hive.splice(p1,1)
					}:set=>{
						const es=[p1,p2].map(v=>set.hive[v]),
						ns=es.map(v=>v.elem.nextSibling),
						p=set.mlf.up.elem
						es.forEach(async (v,k)=>{
							const num=Math.abs(k-1)
							await w8(v,'swap',es[num])
							p.insertBefore(v.elem,ns[num])
							set.hive[arguments[num]]=v
						})
					})
				}
			}
			for(const k in adds) Object.defineProperty(proxy,k,{value:adds[k]})
			Object.defineProperty(proxy,'[[mutations]]',{value:[]})
		} else{
			const doit=(k,s)=>{
				if(!muts[k]) return
				;(doit.que||(doit.que=[])).push(k)
				if(doit.delay) clearTimeout(doit.delay)
				else doit.was={...s}
				doit.delay=setTimeout(()=>{
					delete doit.delay
					for(const data of manmut) for(const fn of data.mutaev.update) fn({name:'update',was:doit.was,now:s})
					for(const data of doit.que.reduce((a,k)=>(muts[k].forEach(d=>manmut.has(d)||a.push(d)),a),[])){
						const oldone=data.elem
						data.elem=undefined
						this.commiexec(data.comm,data,false,true).then(()=>{
							for(const v of [...oldone.childNodes]) if(v.nodeType!=Node.TEXT_NODE){
								if(v.mlf) v.mlf.bury.no=true
								data.elem.appendChild(v)
							}
							data.bury.no=true
							oldone.replaceWith(data.elem)
						})
					}
					delete doit.que
					delete doit.was
				},5)
			},
			muts={},
			manmut=new Set()
			proxy=new Proxy(obj,{
				set(s,k,v){
					doit(k,s)
					s[k]=v
					return v
				},
				deleteProperty(s,k){
					doit(k,s)
					delete s[k]
					return true
				}
			})
			Object.defineProperty(proxy,'[[mutations]]',{value:muts})
			Object.defineProperty(proxy,'[[manualmutate]]',{value:manmut})
		}
		Object.defineProperty(proxy,'[[proxy]]',{value:true})
		return proxy
	}
	preload(what,...items){
		return Promise.all(items.map(route=>{
			let res
			switch(what){
				case 'img': res=route in this.cache.img||new Promise(r=>{
					const img=new Image(),
					fin=()=>{
						this.cache.img.push(route)
						r(true)
					}
					img.onerror=()=>r(false)
					img.src=route
					img.complete?fin():img.onload=fin
				})
				break
				case 'pie':{
					const pie=this.cache.pies[route],
					p={route}
					if(pie){
						if(!pie.tpl) p.only='tpl'
						else if(!pie.styl) p.only='styl'
					}
					if(!pie||p.only){
						res=fetch.easy('pie.api',p).then(v=>(p.only?pie[p.only]=v[p.only]:this.cache.pies[route]={tpl:v.tpl,styl:v.styl},v))
						if(pie) pie[p.only]=res
						else this.cache.pies[route]={tpl:res,styl:res}
					}
				}break
				case 'garb':{
					const pie=this.cache.pies[route]
					if(!pie||!pie.styl){
						res=fetch.easy('pie.api',{route,only:'styl'}).then(v=>(pie?pie.styl=v.styl:this.cache.pies[route]={styl:v.styl},v))
						if(pie) pie.styl=res
						else this.cache.pies[route]={styl:res}
					}
				}break
				case 'mod':
					if(!this.cache.mods[route]) res=this.cache.mods[route]=fetch.easy('mod.api',route).then(v=>this.cache.mods[route]=v)
				break
			}
			return res
		}))
	}
	apply(...args){
		const [line,el]=args.align(String,[Element,Object])
		return this.commiexec(line,el instanceof Element?el.mlf||(el.mlf={elem:el,...this.emptyStruct}):el,false)
	}
	build(...args){
		return this.samosbor(...args.align(String,[Element,Object]))
	}
	async commiexec(commiline,data,insert,nopie){try{
		const parse=!commiline.length?[{}]:Array.isArray(commiline)?commiline:(()=>{
			const contsym='.#+?><!%*&|~^',
			rgx=new RegExp(`^ *(?:[${contsym}(]|$)`),
			bs='•',
			nbs=v=>v.str[v.pos-1]!=bs||v.str[v.pos-2]==bs,
			eof=v=>{
				if(!nbs(v)) return
				const ltr=v.flags.has('ltr')
				if('\'"`'.includes(v.sym)) v.flags[ltr?'delete':'add']('ltr')
				else if(!ltr){
					if(v.sym=='{') v.lvl?v.lvl+=1:v.lvl=1
					else if(v.sym=='}')
						if(v.lvl) v.lvl-=1
						else return true
				}
			},
			csc=(v,sch)=>{
				if(sch) for(const sym in sch) if(v.sym==sym&&nbs(v)) return sch[sym]()
				const inc=v.flags.has('incap')
				if((!inc||v.sym==')')&&nbs(v)){
					const off=Number(inc)
					if(rgx.test(v.str.slice(v.pos+off))){
						v.stage=v.struct.length
						return [true,off]
					}
					if(v.flags.has('rec')&&v.sym==']') return false
				}
				return null
			},
			fns=[
				v=>{
					const ws=v.str.slice(v.pos).match(/^ +/)
					return [true,ws?ws[0].length:0]
				},
				v=>[true,v.sym=='('?v.flags.add('incap')&&1:0],
				v=>{
					if(contsym.includes(v.sym)) return ['sym',true]
					if(!v.pos||v.pos==1&&v.flags.has('incap')) return [true,0]
					return v.flags.has('rec')&&v.sym==']'?false:null
				},
				v=>{
					if(v.sym==bs&&nbs(v)) return
					if(v.flags.has('mods')) return v.sym==']'||'mods'
					if(v.sym=='['&&nbs(v)) v.flags.add('mods')
					else return [0,true]
				},
				v=>{
					if(v.sym==bs&&nbs(v)) return
					if(v.flags.has('funct'))
						if(eof(v)){
							v.stage=v.struct.length
							return true
						} else return 'funct'
					if(v.sym=='{'&&nbs(v)) v.flags.add('funct')
					else return [0,true]
				},
				v=>{
					if(v.sym==bs&&nbs(v)) return
					if(v.flags.has('pars'))
						if(eof(v)){
							v.flags.delete('pars')
							const ltr=v=>{
								const is='\'"`'.includes(v.sym)&&nbs(v)
								if(is) v.flags.add('ltr')
								return [true,Number(is)]
							},
							p=(n,s)=>v=>{
								if(v.flags.has('ltr')){
									if('\'"`'.includes(v.sym)&&nbs(v)&&v.str[v.pos+1]==s){
										v.flags.delete('ltr')
										return [true,2]
									} else return n
								}
								return v.sym==s||n
							}
							v.res.pars=this.scrut(v.res.pars,
								ltr,
								p('key',':'),
								ltr,
								p('val',',')
							).reduce((a,v)=>(a[v.key]=v.val,a),{})
							return
						} else return 'pars'
					const c=csc(v,{
						'@':()=>(v.sym=bs,'key'),
						'{':()=>{v.flags.add('pars')},
						'=':()=>true
					})
					if(c!==null) return c
					return 'key'
				},
				v=>{
					if(v.sym==bs&&nbs(v)) return
					if(v.flags.has('funct')) return eof(v)||'funct'
					const fr=!v.flags.has('sec')
					if(fr) v.flags.add('sec')
					const c=csc(v,fr&&{
						'@':()=>(v.sym=bs,'value'),
						'{':()=>{v.flags.add('funct')},
						'[':()=>{
							const res=v.res.tpl=this.scrut(['rec'],v.str.slice(v.pos+1),...fns)
							v.pos+=res.obj.pos+1
							return true
						}
					})
					if(c!==null) return c
					return 'value'
				}
			]
			return this.scrut(...fns,commiline)
		})()
		data.comm=parse
		loop:for(const k in parse){
			let index=+k,
			{key,value,sym,mods='',pars,funct,tpl}=parse[index]
			;[key,value]=[key,value].map(v=>v&&(data.bind||data.mods?v.replace(/•(\^|\||\/)?(.+?)•/g,(f,s,v)=>{
				if(s=='/'){
					const [_,mod,body]=v.match(/^(.+?)\/(.+)/)
					if(!data.mods||!(mod in data.mods)) return '[NO SUCH MODULE]'
					let res
					eval(`res=data.mods["${mod}"]`+body)
					return res
				}
				const src=s=='^'?data.core:data.bind,
				val=src[v]
				if(s!='|'){
					const mutas=src['[[mutations]]']
					if(mutas){
						;(mutas[v]||(mutas[v]=new Set())).add(data)
						if('[[react]]' in src) data.bury.push(()=>mutas[v].delete(data))
					}
				}
				return val
			}):v).replace(/•/g,'@'))
			if(!data.elem)
				if(sym||!key){
					if(sym!='^') ;(data.elem=document.createElement('div')).mlf=data
				} else{
					const isSVG=data.up.svg||key.toLowerCase()=='svg'
					if(isSVG) data.svg=true
					else{
						var piepar
						key=key.replace(/@(.+)/,(_,v)=>(piepar=v,''))
						if(key[0]=='-'){
							let c=data
							while(c=c.up) if(c.piename){
								key=c.piename+key
								break
							}
						}
					}
					;(data.elem=document['createElement'+(isSVG?'NS':'')](isSVG?'http://www.w3.org/2000/svg':key,isSVG?key:undefined)).mlf=data
					if(!isSVG&&(key.includes('-')||data.elem.toString()=='[object HTMLUnknownElement]')){
						data.piename=key
						sym='pie'
						let res
						;(data.pie=new Promise(r=>res=r)).resolve=res
						data.slots={}
					}
				}
			if(insert!==false){
				data.up.elem[insert?'insertBefore':'appendChild'](data.elem,insert||undefined)
				insert=false
			}
			if(sym) switch(sym){
				case '.':
					data.elem.classList[mods.includes('-')?'remove':'add'](key)
				break
				case '^':
					if(isNaN(key)){
						const el=data.up.elem.closest(key),
						nd={...el.mlf||(el.mlf={elem:el,...this.emptyStruct})}
						nd.core=data.core
						data=nd
					} else for(let i=Number(key);i>0;i-=1) data=data.up
				break
				case '&':{
					const fn=async v=>{
						if(!v) return v
						const fn=async(type,val,i)=>{
							if(Array.isArray(val)){
								for(const k in val) await fn(type,val[k],k)
								return
							}
							switch(type){
								case 'js':{
									let ret
									if(/^class/.test(val)){
										let cls
										eval('cls='+val)
										ret=new cls(data,pars)
										if(ret.await&&ret.await instanceof Promise) await ret.await
									} else{
										const keys=pars?Object.keys(pars):[],
										vals=pars?Object.values(pars):[]
										ret=await new Function.async(...keys,'arguments',val).call(data,...vals,pars||{})
									}
									data.mods[key]=ret
								}break
								case 'libcss':
								case 'libjs':{
									const id=`mlf-${type}-${key.replace(/\//g,'_')}${~i?'-'+i:''}`
									if(document.getElementById(id)) break
									const se=document.createElement(type=='libjs'?'script':'style')
									se.id=id
									se.innerHTML=val
									document.head.appendChild(se)
								}break
								case 'libstyl':{
									const pref=`mlf-${type}-${key.replace(/\//g,'_')}${~i?'-'+i:''}`
									if(!document.getElementById(pref)){
										const stel=document.createElement('style')
										stel.id=pref
										stel.innerHTML=stylus(this.stylcore+val).render()
										document.head.appendChild(stel)
									}
								}break
							}
						}
						for(const k in v) v[k]&&await fn(k,v[k],-1)
						if(funct) await new Function.async(funct).call(data)
						else if(value) await data.core[value].call(data)
						else if(tpl) await this.commiexec(tpl,data,false)
						return v
					},
					tcm=this.cache.mods,
					p=key in tcm?tcm[key] instanceof Promise?tcm[key].then(fn):fn(tcm[key]):tcm[key]=fetch.easy('mod.api',key).then(v=>tcm[key]=v).then(fn)
					if(!mods.includes('>')) await p
				}break
				case 'pie':
				case '*':{
					const fn=async v=>{
						if(!v) return v 
						const fn=async(type,val,i)=>{
							if(Array.isArray(val)){
								for(const k in val) await fn(type,val[k],k)
								return
							}
							switch(type){
								case 'styl':{
									let pref='mlf-pie-styl-'+(~i?i:'')+key.replace(/\//g,'_')
									if(pars){
										const ps=JSON.stringify(pars)
										pref+='_'+((this.conform[key]||(this.conform[key]=[])).includes(ps)?this.conform[key].indexOf(ps):this.conform[key].push(ps)-1)
									}
									let stel=document.getElementById(pref)
									if(!stel){
										stel=document.createElement('style')
										stel.subjs=new Set()
										stel.id=pref
										val=val.replace(/^/gm,'\t')
										stel.innerHTML=stylus(this.stylcore+'.'+pref+'\n'+(pars?Object.entries(pars).reduce((a,[k,v])=>a.replace(new RegExp(`^(\\s*${k.noregexp}=).*$`,'gm'),'$1'+v),val):val)).render()
										document.head.appendChild(stel)
									}
									data.elem.classList.add(pref)
									if(!stel.subjs.has(data)){
										data.bury.push(()=>{
											for(const stel of data.styles){
												stel.subjs.delete(data)
												if(!stel.subjs.size) stel.remove()
											}
										})
										;(data.styles||(data.styles=new Set())).add(stel)
										stel.subjs.add(data)
									}
								}break
								case 'tpl':{
									const core={}
									await new Function.async(val).call({
										slot:data.elem,
										name:key,
										var:piepar,
										core
									}).then(v=>this.samosbor(v,data,core))
								}break
							}
						}
						for(const k in v) await fn(k,v[k],-1)
						return v
					},
					stop=!mods.includes('>'),
					pie=this.cache.pies[key]||(this.cache.pies[key]={}),
					noslot=()=>data.pie.resolve([])
					let only=false
					for(const v of ['styl','tpl']){
						const tpl=v=='tpl'
						if(tpl&&(nopie||sym!='pie')) break
						if(v in pie){
							if(!pie[v]){
								if(tpl) noslot()
								continue
							}
							const p=pie[v] instanceof Promise?pie[v].then(a=>fn({[v]:a[v]})):fn({[v]:pie[v]})
							if(stop) await p
						} else 
							if(only===false) only=v
							else only=true
					}
					if(only){
						const obj={route:key.replace(/-/g,'/')},
						whole=only===true
						if(!whole) obj.only=only
						const req=fetch.easy('pie.api',obj).then(v=>{
							//if(v==404) return Promise.reject(key+' pie not found')
							if(whole){
								pie.styl=v.styl
								pie.tpl=v.tpl
							} else pie[only]=v[only]
							return v
						}).then(fn)
						if(whole) pie.styl=pie.tpl=req
						else pie[only]=req
						if(whole||only=='tpl') req.finally(()=>pie.tpl||noslot())
						if(stop) await req
					}
				}break
				case '+':{
					let target=data.elem,
					ps=key.split('.')
					if(ps.length>1){
						mods+='.'
						key=ps.splice(-1)[0]
						for(const v of ps) target=target[v]
					}
					if(!value) value=true
					if(mods.includes('.')) target[key]=(mods.includes('=')&&target[key]||'')+value
					else target.setAttribute(key,(mods.includes('=')&&target.getAttribute(key)||'')+value)
				}break
				case '>':
					data.elem.appendChild(document.createTextNode(key))
				break
				case '#':{
					if(mods.includes('<')) data.slots[key]=data
					else if(mods.includes('>')){
						data.elem.remove()
						data=data.slots[key]
					} else{
						this.slots.sub[key]={slot:data.elem}
						data.bury.push(()=>delete this.slots.sub[key])
					}
				}break
				case '!':
					if(mods.includes('?')){
						if(funct){
							const fn=new Function.async('tumb','event','stopEvent',funct)
							;(this.tumbcbs[key]||(this.tumbcbs[key]=[])).push((tumb,e,be)=>fn.call(data,tumb,e,()=>{
								be()
								delete this.tumbcbs[key]
								delete this.tumbs[key]
							}))
							key=false
						} else funct=`mlf.tumbcbs.${value}&&mlf.tumbcbs.${value}.forEach(v=>v(mlf.tumbs.${value}=!mlf.tumbs.${value},event,stopEvent))`
					}
					if(!key) break
					let cb
					if(tpl) cb=()=>this.commiexec(tpl,data,false)
					else{
						const fn=funct?new Function.async('event','stopEvent',funct):data.core[value]
						cb=e=>fn.call(data,e,breaker)
					}
					const mutaev=['swap','delete','update'].includes(key),
					opts={capture:mods.includes('^'),once:mods.includes('1'),passive:mods.includes('*'),...pars},
					breaker=()=>{
						if(mutaev){
							const m=data.mutaev[key]
							m.delete(cb)
							if(!m.size){
								delete data.mutaev[key]
								if(key=='update'&&data.bind) data.bind['[[manualmutate]]'].delete(data)
							}
						} else data.elem.removeEventListener(key,cb,opts)
						data.events[key].delete(breaker)
					}
					if(mutaev){
						if(opts.once) cb.once=true
						;(data.mutaev[key]||(data.mutaev[key]=new Set())).add(cb)
						if(key=='update'&&data.bind) data.bind['[[manualmutate]]'].add(data)
					} else data.elem.addEventListener(key,cb,opts)
					/*switch(key){
						case 'drag':
							data.elem.classList.add('mlf-drag')
							let rr
							const [rel,targ=data.elem]=params?['for','up'].map(n=>{
								let v=params[n]
								if(!v) return
								let a=data
								while(v--) a=a.up
								return a.elem
							}):[],
							posdif={},
							des=targ.style,
							move=e=>{
								e.preventDefault()
								des.left=e.clientX-posdif.x-(rr?rr.left:0)+'px'
								des.top=e.clientY-posdif.y-(rr?rr.top:0)+'px'
							},
							down=e=>{
								e.preventDefault()
								const rect=targ.getBoundingClientRect()
								posdif.x=e.clientX-rect.left
								posdif.y=e.clientY-rect.top
								rr=rel&&rel.getBoundingClientRect()
								document.body.addEventListener('mousemove',move)
							},
							up=e=>{
								document.body.removeEventListener('mousemove',move)
								if(value) (value[0]=='{'?new Function('event','stopEvent','top','left',value.slice(1,-1)):data.core[value]).call(targ,e,breaker,des.top,des.left)
							}
							breaker=()=>{
								data.elem.removeEventListener('mousedown',down)
								data.elem.classList.remove('mlf-drag')
								document.body.removeEventListener('mouseup',up)
							}
							data.elem.addEventListener('mousedown',down)
							document.body.addEventListener('mouseup',up)
						break
						default:
							if(orival[0]=='['){
								const v=orival.slice(1,-1)
								value=()=>this.commiexec(v,data,false)
							} else{
								const fn=value[0]=='{'?new Function('event','stopEvent',value.slice(1,-1)):data.core[value]
								value=e=>fn.call(data,e,breaker)
							}
							const opts={capture:mods['^'],once:mods['1'],passive:mods['*'],...params}
							breaker=()=>data.elem.removeEventListener(key,value,opts)
							data.elem.addEventListener(key,value,opts)
					}*/
					;(data.events[key]||(data.events[key]=new Set())).add(breaker)
				break 
				case '~':
					if(key) data.core[key].call(data,pars)
					else{
						const p=new Function.async(funct).call(data)
						if(!mods.includes('>')) await p
					}
				break
				case '?':{
					let cond
					eval('cond='+key)
					if(mods.includes('|')){
						if(!cond) break loop
					} else if(cond)
						if(tpl) this.commiexec(tpl,data,false)
						else await (funct?new Function.async(funct):data.core[value]).call(data)
				}break
				case '|':{
					data.comm=parse.slice(0,index)
					const comm=parse.slice(index+1)
					if(key) comm[0].key=key
					return await this.commiexec(comm,{...data,...this.emptyStruct,elem:undefined,up:data})
				}break
				case '%':{
					const fn=(path,nor)=>new Promise(r=>{
						if(this.cache.img.includes(path)) r(true)
						else{
							data.elem.style.backgroundImage=''
							nor||data.elem.classList.add('mlf-image_load')
							const img=new Image(),
							fin=()=>{
								this.cache.img.push(path)
								nor||data.elem.classList.remove('mlf-image_load')
								r(true)
							}
							img.onerror=()=>r(false)
							img.src=path
							img.complete?fin():img.onload=fin
						}
					}).then(ok=>ok&&(data.elem.tagName=='IMG'?data.elem.setAttribute('src',path):data.elem.style.backgroundImage=`url('${path}')`))
					if(!('image' in data)) data.image=fn
					data.elem.classList.add('mlf-image')
					if(pars) for(const name in pars){
						const spl=pars[name].split(' ')
						spl.forEach((v,k)=>data.elem.style[`background-${name}${spl.length>1?'-'+(k?'y':'x'):''}`]=v)
					}
					if(mods.includes('!')){
						const obs=new IntersectionObserver(e=>{
							if(!e[0].intersectionRatio) return
							fn(key,mods.includes('#'))
							obs.disconnect()
						},{threshold:0.25})
						obs.observe(data.elem)
					} else{
						const p=fn(key,mods.includes('#'))
						if(mods.includes('|')) await p
					}
				}break
				case '<':{
					data.comm=parse.slice(0,index).concat(parse.slice(index+1))
					const obs=!mods.includes('~')
					let source
					if(funct){
						const res=await new Function.async(funct).call(data)
						if(res){
							source=res
							if(key) data.core[key]=res
						}
					} else source=data.core[key]
					if(Array.isArray(source)){
						if(obs){
							var prev=data.elem.previousSibling
							if(prev) prev=prev.mlf
							source.forEach((v,k,s)=>s[k]=this.observe(v))
						}
						if(!source.length) data.elem.remove()
						const hive=[...source]
						data.hive=hive
						for(const k in hive){
							const v=hive[k]
							if(k<hive.length-1){
								const newel=data.elem.cloneNode(),
								newdata={...data,...this.emptyStruct,bind:v,elem:newel,bury:[...data.bury],hive}
								newel.mlf=newdata
								hive[k]=await this.commiexec(parse.slice(index+1),newdata,data.elem)
							} else{
								data.bind=v
								hive[k]=await this.commiexec(parse.slice(index+1),data,false)
							}
							if(obs&&hive[k].mutaev.update) v['[[manualmutate]]'].add(hive[k])
						}
						if(obs){
							const proxy=this.observe(source)
							if(key) data.core[key]=proxy
							const pos=proxy['[[mutations]]'].push(hive.set={hive,mlf:data,prev})-1
							if('[[react]]' in source){
								const fn=()=>proxy['[[mutations]]'].splice(pos,1)
								fn.paging=true
								data.up.bury.push(fn)
							}
						}
						return hive
					} else{
						data.bind=obs?this.observe(source):source
						if(obs){
							if(data.mutaev.update) data.bind['[[manualmutate]]'].add(data)
							if(key) data.core[key]=data.bind
						}
					}
				}break
			}
		}
		return data
	}catch(e){console.error('COMMIEXEC',e)}}
	async samosbor(tpl,prev=document.body,par3){try{
		let tab=0
		if(typeof par3=='number') tab=par3
		else var core=par3&&this.observe(par3)
		if(!tab){
			const tabs=tpl.match(/^(?:\n|\r)(\t*)/)
			if(tabs) tab=tabs[1].length
		}
		if(prev instanceof Element) prev=prev.mlf||(prev.mlf={elem:prev,...this.emptyStruct})
		const itemsrgxp=new RegExp(`^(\\t{${tab}}|(?:  ){${tab}})(?!\\t| |\\n|$)(?:({[\\s\\S]+?^\\1})|(.+))((?:\n^(?:\t{${tab+1}}|(?:  ){${tab+1}}).+$)+)?`,'gm'),
		tops=[]
		let branch
		while(branch=itemsrgxp.exec(tpl)){
			const [item,tabs,block,inline,nest]=branch,
			data={up:prev,bind:core||prev.bind,core:core||prev.core,slots:prev.slots,...this.emptyStruct}
			tops.push(data)
			let line=block?block.slice(2,-2).replace(/^\s*(.+)(?:\n|\r|$)/gm,(full,val)=>`(${val})`):inline
			if(line[0]=='/') continue
			const result=await this.commiexec(line,data)
			if(Array.isArray(result)&&'set' in result){
				result.set.tab=tab
				result.set.rest=nest
				delete result.set
			}
			if(nest){
				const fn=obj=>{
					const next=()=>this.samosbor(nest,obj,tab+1)
					if(obj.pie) obj.pie.then(next)
					else return next()
				}
				await (Array.isArray(result)?Promise.all(result.map(fn)):fn(result))
			}
		}
		if(prev.pie) prev.pie.resolve()
		return tops
	}catch(e){console.error('SAMOSBOR',e)}}
	get emptyStruct(){
		return {bury:[],events:{},mods:{},stopEvent:this.evst,mutaev:{}}
	}
}
if(window.mlf_initialize) mlf_initialize()