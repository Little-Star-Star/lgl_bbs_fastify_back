let id_add = 0
/**
 *  id 自增
 */

function idAdd(start = 0, step = 1) {
	if(arguments.length > 0) {
		id_add = start
	}
	id_add += (step || 1)
	return id_add
}

module.exports = {
	idAdd:idAdd
}