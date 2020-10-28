import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Menu } from 'antd';

import './index.less'

import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
/*
左侧导航组件
*/
export default class LeftNav extends Component {
    // submenu keys of first level
    rootSubmenuKeys = [];

    state = {
        openKeys: [],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Menu
                mode="inline"
                theme="dark"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
            >
                {
                    menuList.map((item,index) => {
                        if(item.children){
                            this.rootSubmenuKeys.push('sub'+index);
                            // 有二级菜单
                            return (
                                <SubMenu key={'sub'+index} icon={item.icon} title={item.title}>
                                    {
                                        item.children.map((child,childIndex) => {
                                            return (
                                                <Menu.Item key={'sub'+index+'-child'+childIndex} icon={child.icon}>
                                                    <Link to={child.key}>{child.title}</Link>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        }else{
                            // 无二级菜单
                            return (
                                <Menu.Item key={'main'+index} icon={item.icon}>
                                    <Link to={item.key}>{item.title}</Link>
                                </Menu.Item>
                            )
                        }
                    })
                }
            </Menu>
        );
    }
}