import React,{Component} from 'react'
import {Form, Input, Select, Modal} from 'antd'

const Option = Select.Option;

//新增分类组件
const AddForm = ({categoryList,showAdd,hideAdd}) => {
    const [form] = Form.useForm()
    const onGenderChange = (data) => {

    }
    // 弹窗确认按钮
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log(values);
                // 重置表单
                form.resetFields();
                // 关闭表单
                hideAdd()
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
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
                initialValues={{category: "0"}}
            >
                <Form.Item name="category" label="" rules={[{required: true}]}>
                    <Select
                        placeholder="选择分类"
                        onChange={onGenderChange}
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
                    name="name"
                    rules={[{required: true, message: '必须输入分类名称'}]}
                >
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddForm;