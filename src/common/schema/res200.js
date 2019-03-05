/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 16:39:48 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-03-05 16:41:43
 */
module.exports = {
	$id:'res200',
	type:'object',
	properties: {
		code: { type: 'string' }, // success || fail
		msg: { type: 'string' } //用于提示-错误
  }
}
