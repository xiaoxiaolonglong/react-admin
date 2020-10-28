import React,{Component} from 'react'
import {Form, Input, Modal} from 'antd'

//函数式组件
const UpdateForm = ({categoryName,showUpdate,hideUpdate}) => {
    const [form] = Form.useForm()
    //设置表单的值(此处可根据接口返回的值设置表单初始值)
    form.setFieldsValue({
        name:categoryName
    })
    // 弹窗确认按钮
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log(values);
                // 重置表单
                form.current.resetFields();
                // 关闭表单
                hideUpdate()
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    //弹窗取消按钮
    const handleCancel = () => {
        form.resetFields();
        hideUpdate();
    }
    return (
        <Modal title="修改分类"
               visible={showUpdate}
               onOk={handleOk}
               onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
            >
                <Form.Item
                    label=""
                    name="name"
                    rules={[{required: true, message: '必须输入分类名称'}]}
                >
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateForm