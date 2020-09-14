export default class{
	constructor(model,poolfn){
		this.model=model
		this.watch={}
		for(const k in model) this.watch[k]={}
		this.poolfn=poolfn
	}
	clear(user){
		for(const table in this.watch){
			const v=this.watch[table]
			for(const src in v){
				const dest=v[src]
				if(dest.hangs.delete(user)&&!dest.hangs.size) delete v[src]
			}
		}
	}
	add(user,tally,sql,result){
		const twt=this.watch[sql.table]
		if(!sql.single){
			const fakearr=[],
			fn=(k,v,del)=>{
				no.res.push(del?'d'+k:no.curact+k+JSON.stringify(v))
				return true
			},
			pool=this.poolfn(new Proxy(fakearr,{
				set:(s,k,v)=>{
					s[k]=v
					if(go&&!isNaN(k)) fn(k,v)
					return true
				}
			}),sql,this.model[sql.table].fields)
			fakearr.splice=(...args)=>{
				if(args[2]&&go){
					fn(args[0],args[2])
				}
				return Array.prototype.splice.apply(fakearr,args)
			}
			fakearr.pop=(...args)=>{
				if(go){
					const last=fakearr.length-1
					fn(last,fakearr[last],true)
				}
				return Array.prototype.pop.apply(fakearr,args)
			}
			let go=false
			result.forEach(v=>pool(v))
			go=true
			var no={tally,result:fakearr,res:[],pool,renew:narr=>{
				go=false
				while(fakearr.length) fakearr.pop()
				for(const v of Array.isArray(narr)?narr:[narr]) fakearr.push(v)
				go=true
			}}
		}
		;(twt[sql.source]||(twt[sql.source]={hangs:new Map(),sql})).hangs.set(user,no||{tally,result})
		if(!('eye' in user)) user.cuteye=()=>this.clear(user)
	}
	valcomp(one,two){
		if(typeof one!=typeof two) return false
		if(typeof one=='object'){
			if(Array.isArray(one)){
				if(!Array.isArray(two)||one.length!=two.length) return false
				return one.every((v,k)=>this.valcomp(v,two[k]))
			}
			return ['keys','values'].every(n=>this.valcomp(...[one,two].map(Object[n])))
		}
		return one==two
	}
	compare(old,ne){
		const ia=Array.isArray(ne)
		if(!ia) ne=[ne]
		const ml=Math.max(ne.length,old.length)-1,
		a=[]
		let k=0
		do{
			const nr=ne[k],
			or=old[k]
			if(!or) a.push('i'+k+JSON.stringify(nr))
			else if(!nr){
				const l=a.length-1,
				r=a[l]
				if(r[0]=='s'&&r[3]==k) a[l]='p'+r.slice(1)
				else a.push('d'+k)
			} else if(!this.valcomp(nr,or)){
				const ig=[],
				fn=o=>!(o?old:ne).slice(k+1).some((v2,k2)=>{
					if(ig.includes(k2)) return
					const res=this.valcomp(o?nr:or,v2)
					if(res){
						k2+=k+1
						a.push('s'+(o?k2:k)+'-'+(o?k:k2))
						ig.push(o?k:k2)
						const r=old[k]
						old[k]=old[k2]
						old[k2]=r
						k-=1
					}
					return res
				})
				if(fn(true)&&fn()) a.push('u'+(ia?k:'')+JSON.stringify(Object.entries(nr).reduce((a,[k,v])=>((!(k in or)||!this.valcomp(or[k],v))&&(a[k]=v),a),{})))
			}
		} while(++k<=ml)
		return a.join('')
	}
	event(table,action,data,add){
		const twt=this.watch[table]
		switch(action){
			case 'update':
				var isupd=true
			case 'delete':
				for(const iter in data){
					const id=data[iter]
					for(const k in twt){
						const {sql,hangs}=twt[k]
						for(const [user,ph] of hangs){
							const {tally,result}=ph
							if(isupd&&sql.sort.length>1&&sql.sort.some(v=>v in add[iter])){
								sql.rmk().then(nr=>{
									const s=nr&&typeof nr!='string'&&this.compare(result,nr)
									if(!s) return
									ph.renew(nr)
									user.con.send(tally+s)
								})
								continue
							}
							if(isupd||!sql.crop){
								const k=result.findIndex(v=>v.id==(isupd?id.id:id))
								if(!~k) continue
							}
							const v=result[k]
							if(isupd){
								var rep=add[iter]
								for(const prop in rep) if(prop in v) v[prop]=rep[prop]
								sql.guard('get').then(res=>res&&typeof res!='string'&&user.con.send(tally+'u'+(sql.single?'':k)+JSON.stringify(rep)))
							} else{
								if(sql.limit){
									sql.rmk().then(nr=>{
										const s=nr&&typeof nr!='string'&&this.compare(result,nr)
										if(!s) return
										ph.renew(nr)
										user.con.send(tally+s)
									})
									continue
								}
								result.splice(k,1)
								user.con.send(tally+'d'+k)
							}
						}
					}
				}
			break
			case 'insert':
			case 'restore':
				for(const k in twt){
					const {sql,hangs}=twt[k]
					for(const [user,ph] of hangs){
						const {tally,result}=ph
						if(sql.crop) sql.rmk().then(nr=>{
							const s=nr&&typeof nr!='string'&&this.compare(result,nr)
							if(!s) return
							ph.renew(nr)
							user.con.send(tally+s)
						})
						else data.reduce((p,v)=>p.then(async a=>{
							const g=await sql.guard('get',v)
							if(g&&typeof g!='string') a.push(v)
							return p
						}),Promise.resolve([])).then(data=>{
							ph.curact=action[0]
							data.forEach(v=>(!sql.select||sql.select(...sql.params.map(k=>v[k])))&&ph.pool(v))
							if(ph.res.length){
								user.con.send(tally+ph.res.join(''))
								ph.res=[]
							}
						})
					}
				}
			break
		}
	}
}