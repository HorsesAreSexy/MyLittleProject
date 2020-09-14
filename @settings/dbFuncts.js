/*
this - объект с системными данными:
	base - имя базы, с которой была выполнена функция
	project - имя проекта, с которого вызвана функция
	db - геттер, при помощи которого можно выполнять запросы к базе дефолтным синтаксисом
	user - объект с данными о юзере, который вызвал функцию (поля из таблицы в user.data)
	bury - сеттер, который добавляет функцию к массиву user.burry (или создаёт оный), все функции в котором выполняются при обрыве соединения юзера с сервером
	props - появляется только если указать эту функцию внутри .find или .filter при выборке, содержит объект с поле:значение
Параметры те, что были переданы в функцию.
*/
export function someFunction(...args){
	this.bury=()=>this.base.db[this.base.usnav.table].set({location:''})
	return this.base.db[this.base.usnav.table].set({location:args[0]})
}
export function qwe(){
	this.bury=()=>console.log('AZAZAZAZAZAZA')
	console.log('WOAWOAWOWOWOAWOOWOAWO')
	return 'kek'
}
export function cry(){
	return this.new.qwe=='qwe'||'tak, blyet'
}
export function nope(){
	return false
}
export function eyep(){
	return true
}
export async function insertQWE(asd){
	huy()
	return await this.db.test.push({qwe:'qwe',asd})
}