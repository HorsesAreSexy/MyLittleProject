this.core.fn1=function(){
	const els=this.elem.childNodes
	els[1].style.height=400-els[0].clientHeight+'px'
}
this.core.fn2=function(){
	this.elem.childNodes[1].style.height='400px'
}
return `
	.item.note
		>Select
		>your
		>project
		.adv>powered by MLF
	.item <[~]_items !click={mlf.subdom='@name@'} (?'@desc@'=[!mouseover=fn1 !mouseout=fn2])
		.desc>@desc@
		.cover ?'@cover@'=[%@cover@] |.name |.cont>@name@
`