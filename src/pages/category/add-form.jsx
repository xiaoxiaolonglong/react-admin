import React from 'react'
import {Form, Input, Select, Modal, message} from 'antd'

import {addCategory} from '../../api'

const Option = Select.Option;


//新增分类组件
const AddForm = ({categoryList,showAdd,hideAdd}) => {
    const [form] = Form.useForm()
    // 弹窗确认按钮
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                add(values);
                // 重置表单
                form.resetFields();
                // 关闭表单
                hideAdd()
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    // 新增
    const add = async (values) => {
        let result = await addCategory(values)
        if(result.status === 0) {
            // 提示登录成功
            message.success('新增成功', 2)
        } else {
            // 登录失败, 提示错误
            message.error(result.msg)
        }
    }
    //弹窗取消按钮
    const handleCancel = () => {
        form.resetFields();
        hideAdd();
    }
    return (
        <Modal title="添加分类"
               visible={showAdd}
               onOk={handleOk}
               onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                initialValues={{parentId: "0"}}
            >
                <Form.Item name="parentId" label="" rules={[{required: true}]}>
                    <Select
                        placeholder="选择分类"
                        allowClear
                    >
                        <Option value="0">一级分类</Option>
                        {
                            categoryList.map((item, index) => {
                                return <Option key={index} value={item._id}>{item.name}</Option>
                            })
                        }

                    </Select>
                </Form.Item>

                <Form.Item
                    label=""
                    name="categoryName"
                    rules={[{required: true, message: '必须输入分类名称'}]}
                >
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddForm;