import React, {Component} from 'react'
import {
    Form,
    Input,
    Button,
    message
} from 'antd'
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import './login.less'

import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api/index'
import storageUtils from '../../utils/storageUtils'

const Item = Form.Item


class Login extends Component {
    /*
    登陆
    */
    /**
     * 自定义表单的校验规则*/
    validator = (rule, value) => {
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            // callback 如果不传参代表校验成功， 如果传参代表校验失败， 并且会提示错误
            return Promise.reject('必须输入密码')
        } else if (length < 4) {
            return Promise.reject('密码必须大于 4 位')
        } else if (length > 12) {
            return Promise.reject('密码必须小于 12 位')
        } else if (!pwdReg.test(value)) {
            return Promise.reject('密码必须是英文、 数组或下划线组成')
        } else {
            return Promise.resolve() // 必须调用 callback
        }
    }
    onFinish = async (user) => {
        let {username,password} = user.user;
        const result = await reqLogin(username,password)
        if(result.status === 0) {
            // 提示登录成功
            message.success('登录成功', 2)
            // 保存用户登录信息
            storageUtils.saveUser(result.data);
            // 跳转到主页面
            this.props.history.replace('/')
        } else {
            // 登录失败, 提示错误
            message.error(result.msg)
        }
    };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render(){
        // 有用户信息跳转到主页
        if (storageUtils.getUser().username) {
            return <Redirect to='/'/>
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h3>用户登陆</h3>
                    <Form className="login-form" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                        <Item name={['user', 'username']} rules={[
                            {required: true, whitespace: true, message: '必须输入用户名'},
                            {min: 4, message: '用户名必须大于 4 位'},
                            {max: 12, message: '用户名必须小于 12 位'},
                            {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、 数组或下划线组成'}
                        ]}>
                            <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                        </Item>
                        <Item name={['user', 'password']} rules={[{validator: this.validator}]}>
                            <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"placeholder="密码"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/* 用
户名/密码的的合法性要求
1). 必须输入
2). 必须大于 4 位
3). 必须小于 12 位
4). 必须是英文、 数组或下划线组成
*/
export default Login