import React, {Component} from 'react'
import {Card, Table, Space, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons';

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
        }
    }
    componentDidMount() {
        this.getCategory()
    }

    // 获取一级分类
    getCategory = async () => {
        let result = await categoryList({parentId:0})
        this.setState({
            data:result.data
        })
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
                        <Button type={"link"} onClick={() => openUpdate(record)}>修改分类</Button>
                        <Button type={"link"}>查看子分类</Button>
                    </Space>
                ),
            },
        ]
        // 打开添加窗口
        const openAdd = (data) => {
            this.setState({showAdd:true})
        }
        // 打开修改窗口
        const openUpdate = (data) => {
            this.setState({
                category:data,
                showUpdate:true
            })
        }
        // 添加分类按钮
        const extra = (
            <Button type='primary' onClick={openAdd}>
                <PlusOutlined/>添加
            </Button>
        )
        return(
            <Card title="一级分类列表" extra={extra}>
                {/*由于接口返回的数据没有key，使用rowKey指定_id字段为key*/}
                <Table columns={columns} rowKey={"_id"} dataSource={this.state.data} bordered loading={false}/>
                <AddForm categoryList={this.state.data} showAdd={this.state.showAdd} hideAdd={() => this.setState({showAdd: false})}/>
                <UpdateForm categoryName={this.state.category.name} showUpdate={this.state.showUpdate} hideUpdate={() => this.setState({showUpdate: false})}/>
            </Card>
        )
    }
}