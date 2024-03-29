
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Col, Row, Card, Spin, List, Input, Switch, Divider, Button } from 'antd';
import { UserOutlined, TableOutlined, CalendarOutlined, ReloadOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import hotpot from './asset/hotpot.png';
import { AuthContext } from "../contexts/AuthContext";
import SubMenu from 'antd/es/menu/SubMenu';
import { useNavigate } from 'react-router-dom';

//import Table from './Tables';
import axios from 'axios';
import { URL } from '../contexts/url';

//import { URL } from '../contexts/url';








function Home() {
    const nav = useNavigate();
    const [ban, setban] = useState([]);

    const [loading, setLoading] = useState(false)
    const { Logout } = useContext(AuthContext);
    const { Header, Content ,Footer} = Layout;
    const [timban, setTimban] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        try {
            if (timban) {
                // Filter the list of tables based on the user's input
                setban(ban.filter((table) => table.ID.includes(timban)));
              } else {
                // Reset the list of tables to show all
                getBan();
                alert(' hiển thị tất cả bàn đang có khách')
              }
            
        } catch (error) {
           alert('không tìm thấy bàn '+timban) 
        }
        
      };
    useEffect(() => {
        getBan();
        //setLoading(true);
        // getBanIDcontrong();
        // getBanIDsudung();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
          getBan();
        }, 10000); 
      
        return () => clearInterval(intervalId); 
      }, []);


    const getBan = async () => {
        // console.log(`${URL}api/v1/tables`);
        try {
            const response = await axios.get(`${URL}/api/v1/tables/all`)

            if (response.data.statusCode === 200) {
                setban(response.data.data);
                console.log("okee", response.data.data);

            }

        } catch (error) {
            console.log('error: ', error);
        }
    }
    const getBanIDsudung = async () => {
        try {
            const response = await axios.get(`/api/v1/tables/status/false`)

            if (response.data.message === "Read Table by employeeId and status success: congrats!") {
                setban(response.data.data);
            }
             console.log("ok",JSON.parse(response.data.data));

        } catch (error) {
            
            console.log('error: ', error);
        }
        
    }
    const getBanIDcontrong = async () => {
        try {
            const response = await axios.get(`/api/v1/tables/status/true`)

            if (response.data.message === "Read Table by employeeId and status success: congrats!") {
                setban(response.data.data);
            }
            // console.log('con trong')
            console.log("ok",response.data.data);

        } catch (error) {
            
            console.log('error: ', error);
        }
        
    }
    
    //const { Header, Content } = Layout;


    const handlelogout = async () => {
        await Logout()
        window.location.reload(false);
    }
    // const onMenuClcik = (item) => {
    //     nav(`${item.key}`)
    // }
    
    return (

        <Layout style={{ background: '#ffffff', padding: 0, height: 80,width: "100%" }}>
            
            <Header style={{ background: '#ffffff', padding: 0, height: 80, width: "100%" }}>
                <div style={{ float: 'left', marginLeft: 20, marginRight: 20 }}>
                    <img src={hotpot} alt="" height={90} width={90} />


                </div>



                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}


                    
                    mode="horizontal" style={{ lineHeight: '64px', }}>

                    <Menu.Item style={{ marginRight: 50 }}>
                        <HomeOutlined onClick={() => {
                            getBan();
                            nav("/");
                        }} style={{ fontSize: '25px', color: '#111111', marginRight: 5 }}></HomeOutlined>
                        Trang chủ
                    </Menu.Item>
                 



                    <Menu.Item
                        onClick={() => {
                            setLoading(true)
                            getBan();
                            setTimeout(() => {
                                setLoading(false);
                            }, 1000);
                           

                        }}
                        key="/" style={{ marginRight: 1100 }} >
                        <ReloadOutlined style={{ fontSize: '25px', color: '#111111', marginRight: 3 }} />
                        Làm mới</Menu.Item>
                    <Menu.Item>

                    </Menu.Item>

                        {/* <div style={{right:0}}> */}
                    <Menu.Item onClick={()=>{
                        nav('Blog');
                    }} style={{ float: 'right', right:0 , }}>

                        <UserOutlined /> Nhân Viên
                    </Menu.Item>

                    <Menu.Item  onClick={()=>{
                        nav('Admin');
                    }} style={{ float: 'right',right:0, color: 'red' }} >

                        <a onClick={handlelogout} >
                            Đăng xuất</a>

                        <LogoutOutlined style={{ fontSize: '20px', color: 'red', marginLeft: 3, }} />

                    </Menu.Item>
                    {/* </div> */}


                </Menu>



            </Header>
            <div  style={{width:"30%",alignSelf:'flex-end',height:100,margin:5}} >
            <form 
           
            onSubmit={handleSearch}>
              <input
                type="number"
                pattern="[0-9]+"
                style={{width:"30%",alignSelf:'flex-end',height:40,margin:5,paddingLeft:5}}
                value={timban}
                onChange={(e) => setTimban(e.target.value)}
                placeholder="  Tìm kiếm tên bàn là số "
                
            
              />
              <button
              style={{height:40}}
              type="submit">Tìm kiếm</button>
            </form>
            </div>
            
            <Footer style={{marginTop:'50%',width:'100%'}} >
                <div style={{float:'left'}}>
            <a1>BẾP NHÀ HÀNG LẨU XUÝT XOA</a1>
            <br></br>
            <h>Chức năng:
            <br></br>
                Nhận Đơn Theo Bàn
                <br></br>
                Từ chối Đơn Theo Bàn
                <br></br>
               Xác Nhận Món Ăn Đã Ra Theo Đơn
            </h > 
            </div>

            {/* <div style={{textAlign:'center',color:'red'}}>
                <h1>LÀM VIỆC VỚI CÁI TÂM HƯỚNG VỀ KHÁCH HÀNG</h1>
            </div> */}
            <div style={{float:'right'}}>
            {/* <a1>BẾP NHÀ HÀNG LẨU XUÝT XOA</a1> */}
            <br></br>
            <a>Liên Hệ:
            <br></br>
                @fda.offical
                <br></br>
                fda.contact
                <br></br>
                0364015071  
            </a> 
            </div>
            </Footer>
            
        </Layout>
    


    );
}

export default Home
