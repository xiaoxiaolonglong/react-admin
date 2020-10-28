/*
包含 n 个接口请求函数的模块
每个函数返回 promise
*/
import ajax from './ajax'
// 登陆
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
// 获取分类列表
export const categoryList = ({parentId}) => ajax('/manage/category/list', {parentId}, 'GET')
//添加一集或二级分类
export const addCategory = ({parentId,categoryName}) => ajax('manage/category/add', {parentId,categoryName}, 'POST')
//修改一集或二级分类
export const updateCategory = ({categoryId,categoryName}) => ajax('manage/category/update', {categoryId,categoryName}, 'POST')