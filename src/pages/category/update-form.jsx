import React,{useEffect} from 'react'
import {Form, Input, message, Modal} from 'antd'

import {updateCategory} from '../../api'

//函数式组件
const UpdateForm = ({id,categoryName,showUpdate,hideUpdate}) => {
    const [form] = Form.useForm()
    //useEffect只能在函数式组件中使用，相当于一个componentDidMount,只有在render之后执行一次，之后不会执行,可以用于请求的发送
    useEffect(()=>{
        //设置表单的值(此处可根据接口返回的值设置表单初始值)
        if(categoryName) {
            form.setFieldsValue({
                categoryName: categoryName
            })
        }
    }, [categoryName])////第二个参数中的数组，就是依赖项，会相当于有状态组件的componentWillReceiveProps,每次执行useEffect前会对date进行一次浅比较

    // 弹窗确认按钮
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                values.categoryId = id
                updateName(values)
                // 重置表单
                form.resetFields();
                // 关闭表单
                hideUpdate()
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    // 修改
    const updateName = async (values) => {
        let result = await updateCategory(values)
        if(result.status === 0) {
            // 提示登录成功
            message.success('修改成功', 2)
        } else {
            // 登录失败, 提示错误
            message.error(result.msg)
        }
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
                    name="categoryName"
                    rules={[{required: true, message: '必须输入分类名称'}]}
                >
                    <Input placeholder='请输入分类名称'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateForm