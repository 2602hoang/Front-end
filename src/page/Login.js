import React, { useContext, useEffect, useState } from "react";
import './Login.css'
import hotpot from './asset/hotpot.png';
import { Button, Card, Flex, Form, Input, Layout, Menu, Modal, Select } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { DownloadOutlined, GoogleOutlined, LoadingOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";

function Login() {
    const [form] = Form.useForm();
     const location = useLocation();
    const [err, setErr] = useState("");
     const [payload, setPayload] = useState({
        email: '',
        password: '',
       
    })
    const nav = useNavigate();
    const { Login, errorLogin, setErrorLogin,Regiter } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const showModal = () => {
        setIsModalOpen(true);
    };
   
    
   
    // const handleOk = () => {
    //     handleSubmit();
    // };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
      const HandleRegiter = async () => {
        const { email, password } = form.getFieldValue();
        try {

            const LoginData1 = await Regiter({
                email: email,
                password: password
            })

        } catch (error) {
             
            setErrorLogin('Thông tin không chính xác 11')
        }
    }




    const HandleLogin = async () => {
        const { email, password } = form.getFieldValue();
        try {

            const LoginData = await Login({
                email: email,
                password: password
            })
            if ((!LoginData.success)) {
            }
            else {
                nav("/");
            }

        } catch (error) {

            setErrorLogin('Thông tin không chính xác')
        }
    }
    

    return (
        <Layout

        // style={{display:'flex',}}
        >
            {/* <div style={{height:'70%',backgroundColor:'#FFFF99'}}> */}


            <Header style={{ alignItems: 'center', backgroundColor: '#FFFfff', textAlign: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#3B5998', fontSize: 50 }}>CHÀO MỪNG ĐẾN VỚI WEBSITE QUẢN LÝ NHÀ HÀNG </span>
            </Header>
            {/* </div> */}
            {/* <div  style={{}}>   */}
            <div style={{ backgroundColor: '#FFF' }}>
                <Content style={{ borderWidth: 5, height: '60%', margin: '0% 10% 4% 10%', }}>
                    {/* <div style={{borderWidth:50,borderColor:'black'}}> */}
                    <Card
                        style={{ justifyContent: 'center', alignSelf: 'center', borderRadius: 80, borderWidth: 10, backgroundColor: '#FFF', width: '100%', borderColor: 'black', borderStyle: 'double' }}
                        hoverable
                    >
                        <Flex
                            style={{ justifyContent: 'center', alignSelf: 'center', backgroundColor: '#FFF', width: '100%', }} >



                            {/* <br></br> */}
                            {/* <Card style={{ marginRight:100 }}> */}

                            <img src={hotpot} alt="" height={600} width={500} style={{ width: '40%', marginRight: "20%" }} />
                            {/* </Card> */}

                            <Card
                                hoverable
                                style={{ margin: "50px 0px 50px 10%", borderRadius: 80, borderWidth: 3, backgroundColor: '#00FF66', width: '30%' }}>
                                <Form form={form} onFinish={HandleLogin}  >
                                    <h3> Đăng nhập để sử dụng ứng dụng </h3>
                                    <br></br>
                                    <Form.Item
                                        style={{
                                            height: 60,
                                            padding: 10,

                                        }}
                                        rules={[
                                            {

                                                required: true,
                                                type: "string",
                                                message: "Vui Lòng không để trống ",

                                            },
                                        ]}
                                        label={<span style={{ fontWeight: "bold", marginRight: 30 }}>Email</span>} name={"email"}>
                                        <Input style={{ height: 40 }} placeholder="Nhập email " />
                                    </Form.Item>
                                    <Form.Item
                                        style={{
                                            height: 60,
                                            padding: 10,
                                        }}
                                        rules={[
                                            {

                                                required: true,
                                                message: "Vui Lòng không để trống",
                                            },
                                        ]}
                                        label={<span style={{ fontWeight: "bold", marginRight: 5 }}>Password</span>} name={"password"}>
                                        <Input.Password
                                            style={{ height: 40 }}
                                            placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Button
                                        block
                                        style={{ marginLeft: '40%', width: '50%', justifyContent: 'center', alignSelf: 'center' }}
                                        type="primary" htmlType="submit">Đăng Nhập</Button>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: 5,
                                            color: 'red'
                                        }}>{errorLogin}</div>



                                    {/* <a 
                                block
                                    style={{marginLeft:'40%',width:'50%',marginTop:10,backgroundColor:'red',justifyContent:'center',alignSelf:'center'}} 
                                    type="primary" htmlType="submit">Đăng Ký</a> */}
                                    <div style={{ textAlign: 'center' }}>____________________________________________________________</div>
                                    <div style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                        <h5 style={{ textAlign: 'center' }}>(Nếu chưa có tài khoản có thể đăng ký)</h5>
                                        <Button
                                            onClick={
                                                showModal
                                            }
                                            style={{ marginLeft: '25%', width: '50%', backgroundColor: '#FF0000' }} type="default" >
                                            Đăng Ký</Button>

                                    </div>
                                </Form>

                            </Card>
                            <Modal title="Đăng Ký Tài Khoản" style={{ textAlign: 'center', color: 'red' }} open={isModalOpen} onOk={HandleRegiter} onCancel={handleCancel}>
                                <Form
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 30 }}
                                layout="horizontal"
                                
                                    style={{ maxWidth: 800 }}
                                
                                >
                                     {/* <Form.Item
                                        style={{
                                            height: 60,
                                            padding: 10,

                                        }}
                                        rules={[
                                            {

                                                required: true,
                                                type: "string",
                                                message: "Vui Lòng không để trống ",

                                            },
                                        ]}
                                        label={<span style={{ fontWeight: "bold", marginRight: 5 }}>Tên</span>} name={"name"}>
                                        <Input style={{ height: 40 }} placeholder="Nhập tên " />
                                    </Form.Item> */}
                                    <Form.Item
                                        style={{
                                            height: 60,
                                            padding: 10,

                                        }}
                                        rules={[
                                            {

                                                required: true,
                                                type: "string",
                                                message: "Vui Lòng không để trống ",

                                            },
                                        ]}
                                        label={<span style={{ fontWeight: "bold", marginRight: 5, }}>Email</span>} name={"email"}>
                                        <Input style={{ height: 40 }} placeholder="Nhập email " />
                                    </Form.Item>
                                    <Form.Item
                                        style={{
                                            height: 60,
                                            padding: 10,
                                        }}
                                        rules={[
                                            {

                                                required: true,
                                                type: "string",
                                                message: "Vui Lòng không để trống",
                                            },
                                        ]}
                                        label={<span style={{ fontWeight: "bold", marginRight: 5}}>Password</span>} name={"password"}>
                                        <Input.Password
                                            style={{ height: 40 }}
                                            placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{
                                            height: 60,
                                            padding: 10,
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                type: "string",
                                                message: "Vui Lòng không để trống",
                                            },
                                        ]}
                                        label={<span style={{ fontWeight: "bold", marginRight: 5 }}>REpassword</span>} name={"repassword"}>
                                        <Input.Password
                                            style={{ height: 40 }}
                                            placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    {/* <Form.Item
                                    style={{
                                        height: 60,
                                        padding: 10,
                                    }}
                                    rules={[
                                        {

                                            required: true,
                                            message: "Vui Lòng không để trống",
                                        },
                                    ]}
                                    label={<span style={{ fontWeight: "bold", marginRight: 5 }}>Quyền</span>} name={"role"}>
                                            <Select>
                                            <Select.Option value="1">Quản Lý</Select.Option>
                                            <Select.Option value="2">Nhân Viên</Select.Option>
                                            <Select.Option value="3">Bếp</Select.Option>
                                            </Select>
                                    </Form.Item> */}

                                </Form>

                            </Modal>




                        </Flex>
                    </Card>
                    {/* </div> */}
                </Content>
            </div>
            {/* </div> */}

            {/* <div style={{height:'20%',marginTop:50}}> */}
            {/* <Card style={{alignSelf:'center', backgroundColor: '#00FF66',width:'80%',margin:'0 10% 0 10%'}}> */}
            <Footer
                style={{ backgroundColor: '#00FF66', width: '100%', }}
            >
                <div style={{ float: 'left' }}>
                    <a1>BẾP NHÀ HÀNG LẨU XUÝT XOA</a1>


                    <br></br>
                    Nhận Đơn Theo Bàn
                    <br></br>
                    Từ chối Đơn Theo Bàn
                    <br></br>
                    Xác Nhận Món Ăn Đã Ra Theo Đơn

                </div>

                {/* <div style={{textAlign:'center',color:'red'}}>
                <h1>LÀM VIỆC VỚI CÁI TÂM HƯỚNG VỀ KHÁCH HÀNG</h1>
            </div> */}
                <div style={{ float: 'right' }}>
                    {/* <a1>BẾP NHÀ HÀNG LẨU XUÝT XOA</a1> */}
                    <br></br>
                    <a1>Liên Hệ:
                        <br></br>
                        <GoogleOutlined />
                        &emsp;: vuhuyhoangboj@gmail.com
                        <br></br>
                        <PhoneOutlined />
                        &emsp;: 0917789964
                    </a1>
                </div>
            </Footer>
            {/* </Card> */}
        </Layout>

    )
}
export default Login