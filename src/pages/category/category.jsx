import React, {Component} from 'react'
import {Card, Table, Space, Button} from 'antd'
import {PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';

import AddForm from './add-form'
import UpdateForm from './update-form'

import {categoryList} from '../../api'

export default class Category extends Component{
    constructor(props){
        super(props)
        this.state = {
            showAdd:false,//添加框的展示和显示
            showUpdate:false,//修改框的展示和显示
            data:[],
            category:{},//修改的数据
            type:"parent",//展示父级分类
            parentId:0,//查询列表的id
        }
    }
    componentDidMount() {
        this.getCategory()
    }

    // 获取分类
    getCategory = async () => {
        let result = await categoryList({parentId:this.state.parentId})
        this.setState({
            data:result.data
        })
    }
    // 查看子分类
    openChildren = (data) => {
        this.setState({
            type:data.name,
            parentId:data._id
        })
        this.getCategory()
    }
    // 关闭子分类
    closeChildren = () => {
        this.setState({
            type:"parent",
            parentId:0
        })
        this.getCategory()
    }
    // 打开添加窗口
    openAdd = () => {
        this.setState({showAdd:true})
    }
    // 隐藏添加窗口
    hideAdd = () => {
        this.setState({showAdd: false})
        this.getCategory()
    }
    // 打开修改窗口
    openUpdate = (data) => {
        this.setState({
            category:data,
            showUpdate:true
        })
    }
    // 隐藏修改窗口
    hideUpdate = () => {
        this.setState({showUpdate: false})
        this.getCategory()
    }
    render() {
        const columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                key: 'action',
                width:300,
                render: (text, record) => (
                    <Space size="middle">
                        <Button type={"link"} onClick={() => this.openUpdate(record)}>修改分类</Button>
                        <Button type={"link"} onClick={() => this.openChildren(record)}>查看子分类</Button>
                    </Space>
                ),
            },
        ]
        // 设置页面title
        const setTtitle = (type) => {
            if(type === "parent"){
                return "一级分类列表"
            }else{
                return (<span><Button type={"link"} onClick={() => this.closeChildren()}>返回上一级</Button><ArrowRightOutlined />  {type}</span>)
            }
        }
        // 添加分类按钮
        const extra = (
            <Button type='primary' onClick={this.openAdd}>
                <PlusOutlined/>添加
            </Button>
        )
        return(
            <Card title={setTtitle(this.state.type)} extra={extra}>
                {/*由于接口返回的数据没有key，使用rowKey指定_id字段为key*/}
                <Table columns={columns} rowKey={"_id"} dataSource={this.state.data} bordered loading={false}/>
                <AddForm categoryList={this.state.data} showAdd={this.state.showAdd} hideAdd={this.hideAdd}/>
                <UpdateForm id={this.state.category._id} categoryName={this.state.category.name} showUpdate={this.state.showUpdate} hideUpdate={this.hideUpdate}/>
            </Card>
        )
    }
}