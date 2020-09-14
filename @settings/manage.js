export flags={
	default:'mylife', //project on which user will fall if sub domain not provided or if he not match any of not ignored project
	fixed:false, //user can fall only on this project regard sub domain
	ignore:['test','img'] //not reachable for user projects
}
export bases={ //base:[projects]
	test:['test','img','rerg','chat'],
	rg:['rg']
}