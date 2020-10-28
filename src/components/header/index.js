import React, {Component} from 'react'
import {Button,Modal} from 'antd'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import './index.less'
/*
左侧导航组件
*/
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    /**
     * 退出登陆
     * */
    logout = () => {
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                console.log('OK')
                // 移除保存的 user
                storageUtils.removeUser()
                console.log(this.props.history);
                // 跳转到 login
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }
    /* 根据请求的 path 得到对应的标题*/
    getTitle = (path) => {
        let title
        menuList.forEach(menu => {
            if (menu.key === path) {
                title = menu.title
            } else if (menu.children) {
                menu.children.forEach(item => {
                    if (path.indexOf(item.key) === 0) {
                        title = item.title
                    }
                })
            }
        })
        return title
    }
    render() {
        // 得到当前请求的路径
        console.log(this.props.location);
        const path = this.props.location.pathname
        // 得到对应的标题
        const title = this.getTitle(path)
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {this.props.user.username}</span>
                    <Button type="link" onClick={this.logout}>
                        退出
                    </Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        {/*<span>{sysTime}</span>*/}
                        {/*<img src={dayPictureUrl} alt="weather"/>*/}
                        {/*<span>{weather}</span>*/}
                    </div>
                </div>
            </div>
        )
    }
}