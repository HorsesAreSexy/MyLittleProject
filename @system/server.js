'use strict'
import mimes from './mimes.js'
import Rarity from './rara/this.js -A'
const hangs={},
bases={},
setts={},
track={},
HTTParse=async(conn,track)=>{
	const res={
		head:{},
		body:'',
		url:'',
		method:'',
		type:''
	},
	act={
		top(v){
			if(v=='\r'){
				const spl=top.split(' ')
				;['method','type','url'].forEach((v,k)=>res[v]=spl[k])
				skip=1
				caret=act.key
			} else top+=v
		},
		get key(){
			let q=''
			return v=>{
				switch(v){
					case '\r':
						skip=3
						caret=act.msg
					break
					case ':':
						skip=1
						res.head[prop=q]=''
						caret=act.val
					break
					default:
						q+=v.toLowerCase()
					break
				}
			}
		},
		val(v){
			if(v=='\r'){
				skip=1
				caret=act.key
			} else res.head[prop]+=v
		},
		get msg(){
			const cl=res.head['Content-Length']
			if(cl) return v=>{
				res.body+=v
				if(res.body.length==cl) done=true
			}
			done=true
		}
	},
	buf=new Uint8Array(1)
	let prop,top,skip,skipper,done,lng=0,caret=act.top
	while(!done){
		if(++lng>setts.limits.bytesQ||++track.b>setts.limits.bytes){
			ban(conn.remoteAddr)
			conn.close()
			return true
		}
		await Deno.read(conn.rid,skip?skipper=new Uint8Array(skip+1):buf)
		const sym=new TextDecoder().decode(skip?skipper.slice(skip):buf)
		if(skip) skip=0
		caret(sym)
	}
	return res
}
{
	const sf=['domains','models','dbFuncts','limits','manage'],
	imp=async name=>setts[n]=await import('../@settings/'+name+'.js --reload').then(v=>v.default||v,()=>false)
	sf.forEach(imp)
	let nope
	for await(const e of Deno.watchFs('../@settings')){
		const path=e.paths[0]
		if(nope==path) continue
		nope=path
		setTimeout(()=>nope=false,10)
		const name=path.match(/[^\/]+(?=\.js$)/)[0]
		if(sf.includes(name))
			if(e.kind=='remove') setts[name]=false
			else imp(name)
	}
}
const projects=Deno.readDirSync('../')
.filter(({name,isDirectory})=>!isDirectory||!['@system','@global','@settings'].includes(name)||setts.manage.flags.ignore.includes(name))
.reduce((a,{name})=>{
	const inside=Deno.readDirSync('../'+name).filter(({isDirectory})=>!isDirectory)
	a[name]={
		cover:inside.find(v=>/^cover\./.test(v)),
		desc:inside.includes('desc.txt')&&Deno.readTextFileSync('../'+name+'/desc.txt')
	}
	return a
},{})
class Response{
	constructor(conn){
		this.conn=conn
	}
	get top(){
		return 'HTTP/1.1 200 Sexy\r\n'
	}
	async file(path,ext){
		if(ext=='styl'){
			const so=await Deno.stat('../'+path+'.styl').catch(()=>false)
			if(!so) return this.error(404,'Unfound')
			const sc=await Deno.stat('../'+path+'.css').catch(()=>false)
			if(!sc||sc.mtime!=so.mtime){
				const css=(await import('./stylus.js').then(v=>v.default))(await Deno.readTextFile('core.styl')+'\n'+await Deno.readTextFile('../'+path+'.styl'))
				Deno.writeTextFile('../'+path+'.css',css)
				await this.conn.write(this.top+'Content-Type: text/css; charset=utf-8\r\n\r\n'+css)
				this.conn.close()
			} else ext='css'
		}
		let msg=this.top+'Transfer-Encoding: chunked\r\nConnection: keep-alive\r\n\r\n'
		const type=mime.find(v=>v[1].includes(ext))
		if(type) msg+='Content-Type: '+type+'; charset=utf-8\r\n'
		await this.conn.write(msg)
		const file=await Deno.open('../'+path+'.'+ext).catch(()=>false)
		if(!file&&(ext!='js'||!(file=await Deno.open('../'+path+'/this.js').catch(()=>false)))) return this.error(404,'Unfound')
		const buf=new Uint8Array(100),
		dec=new TextDecoder().decode
		let len
		while((len=Deno.read(file.rid,buf))!==null) await this.conn.write(len+'\r\n'+dec(buf)+'\r\n')
		await this.conn.write('0')
		this.conn.close()
		Deno.close(file.rid)
	}
	async html(val){
		await this.conn.write(this.top+'Content-Type: text/html; charset=utf-8\r\n\r\n'+val)
		this.conn.close()
	}
	async obj(obj){
		await this.conn.write(this.top+'Content-Type: application/json; charset=utf-8\r\n\r\n'+JSON.stringify(obj))
		this.conn.close()
	}
	async plain(text){
		await this.conn.write(this.top+'Content-Type: text/plain; charset=utf-8\r\n\r\n'+text)
		this.conn.close()
	}
	async error(code,text){
		await this.conn.write('HTTP/1.1 '+code+' '+text+'\r\n\r\n')
		this.conn.close()
	}
}
async function hnd(conn){
	const ip=conn.remoteAddr,
	ttrack=(track[ip]||(track[ip]={b:0,q:0,t:setTimeout(()=>delete track[ip],setts.limits.interval)}))
	if(ttrack.ban) return conn.close()
	if(++ttrack.q>setts.limits.queries){
		clearTimeout(track[ip].t)
		track[ip].ban=setTimeout(()=>delete track[ip],setts.limits.ban)
		conn.close()
		return
	}
	const req=await HTTParse(conn,ttrack)
	if(await req.parse()) return
	let domain,hosts,project
	{const host=req.head.host
	if(!host||setts.domains&&!Object.entries(setts.domains).some(([name,v])=>{
		if(!v) return
		const pos=host.search(name)
		if(~pos){
			domain=name
			hosts=host.slice(0,pos-1).split('.')
			if(typeof v=='string') project=proj
			return true
		}
	})) return conn.close()}
	if(!hosts) hosts=[]
	if(!project) project=setts.manage.flags.fixed||hosts.length&&hosts[hosts.length-1] in projects&&hosts.pop()||setts.manage.flags.default
	const send=new Response(conn)
	if(/^\/(?:(?:@system\/rara|@settings)\/|[^\/]+?\.(?!api))/.test(req.url)) return send.error(403,'Forbidden')
	let [url,path,file,ext,params]=req.url.replace(/(?<=^\/)@(file)?(?=\/)/,(_,f)=>f?'@system/rara/files':project).match(/^\/(.+?\/)?(?:([^\/]+?)\.(.+?))?(?:\?([^\/]+))?$/)
	if(file){
		if(path){
			if(req.url=='/favicon.ico') url='/'+project+req.url
			params.split('&').reduce((a,v)=>{
				const [b,p]=v.split('=')
				a[b]=p
				return a
			},{})
			send.file(path+file,ext)
			/*if(params) for(const n in params){
				switch(n){
					case 'size':{
						if(!['jpg','jpeg','png','webp','tiff','gif','svg'].includes(ext[2].toLowerCase())) break
						const s=require('sharp')
						file=await s(file).resize(...params[n].split('x').map(v=>v=='0'?null:+v)).toBuffer()
					}break
				}
			}*/
		} else{
			const body='{['.includes(req.body[0])?JSON.parse(req.body):req.body
			;({
				here(api){
					if(api!='listen'){
						if(!((this.token=body.t) in hangs)) return send.error(400,'Unconnected')
						this.user=hangs[this.token]
						if(this.user.conn.remoteAddr!=ip) return send.error(400,'Unrecognized')
					}
					if(['db','login','logout'].includes(api)){
						const bs=setts.manage.bases,
						cave=Object.keys(bs).find(v=>bs[v].includes(project))
						bg:{
							if(cave){
								if(!(cave in bases))
									if(cave in models){
										const b=bases[cave]=new Rarity(cave)
										b.dbFuncts=dbFuncts
										b.model=models[cave]
									} else bases[cave]=false
								if(this.cave=cave[bases]) break bg
							}
							return send.error(400,'Unbased')
						}
					}
					this[api]()
				},
				async db(){
					const la=body.l&&!this.user.data
					la&&await this.cave.login(this.user,body.l)
					this.cave.query(body.s,this.user,{tally:body.o,project}).then(v=>send.obj(la?[v,Number('data' in this.user)]:v),err=>send.error(500,err.message||err))
				},
				login(){
					this.cave.login(this.user,body.l,body.p).then(send.plain,()=>send.error(500,'Login failed'))
				},
				logout(){
					this.user.data?this.cave.query(db=>db[this.cave.usnav.ledge].refer(this.user.data.id).set({[this.cave.usnav.token]:''}),this.user,{gm:true}).then(v=>{
						delete this.user.data
						send.obj(v)
					},()=>send.error(500,'Logout failed')):send.plain('true')
				},
				clear(){
					if('cuteye' in this.user){
						this.user.cuteye()
						delete this.user.events
					}
					conn.close()
				},
				sub(){
					;(this.user.events||(this.body.events=new Set())).add(body.e)
				},
				unsub(){
					if(!this.user.events) return
					this.user.events.delete(body.e)
					if(!this.user.events.size) delete this.user.events
				},
				dis(){
					hangs.forEach(v=>v.events&&v.events.has(body.e)&&v.write(body.v))
				},
				listen(){
					;(hangs[body]={
						conn,
						ping(){
							this._timer=setTimeout(this.write,6e4)
						},
						write(text){
							this.conn.write(text).then(()=>{
								clearTimeout(this._timer)
								this.ping()
							},()=>{
								if('cuteye' in this) this.cuteye()
								if('bury' in this) for(const v of this.bury) v()
								delete hangs[body]
							})
						}
					}).ping()
				}
			}).here(file)
		}
	} else send.html(`<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/@system/mlf.css">
	<script defer type="text/javascript" src="/@system/mlf.js"></script>
	<script>mlf_initialize=()=>{
		delete mlf_initialize
		mlf.domain='${domain}'
		mlf.token='${btoa(Math.round(Math.random()*10e5)+(''+Date.now()).slice(-5)).replace(/=+$/,'')}'${project?'':`
		mlf.crossway=[${Object.entries(projects).map(([name,v])=>`{name:'${name}',cover:'${v.cover||''}',desc:'${v.desc||''}'}`)}]`}
		mlf.page(${project?project+url:'@global/@crossway'})
	}
	if(window.mlf) mlf_initialize()</script>
	<link id="mlf-anchor">
</head><body></body></html>`)
}
async function* usher(port){
	const l=Deno.listen({port})
	while(true) yield await l.accept()
}
for await(const conn of usher(80)) hnd(conn)