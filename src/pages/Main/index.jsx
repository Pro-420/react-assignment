import { useNavigate } from 'react-router-dom';
import {
    Table,
    Card,
    Modal,
    Input
} from 'antd';
import {
    SearchOutlined
}from '@ant-design/icons';
import axios from 'axios';
import '../../styles/common.css';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';

const MainPage = () =>{
    const navigate = useNavigate();
    const [isValue, setIsValue] = useState(null);
    const [isData, setIsData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const getData = () =>{
        axios({
            url: "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json",
            method: 'GET'
        }).then(response=>{
            if(response.status===200){
                setIsData(response.data)
            }
        }).catch(e=>{
            setIsModalVisible(true)
            setModalMessage("Server is not Responding")
        })
    }
    useEffect(()=>{
        getData()
    },[])

    const [isColumn] = useState([
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: (a, b) => a.first_name.length - b.first_name.length,
            render: (text,record) =>{ 
                return(
                    <p onClick={()=>{handleUser(record)}}>{text}</p>
                )
            }
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            sorter: (a, b) => a.last_name.length - b.last_name.length,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Web',
            dataIndex: 'web',
            key: 'web',
            sorter: (a, b) => a.web.length - b.web.length,
            render: (text) =>{ 
                return(
                    <a href={text}>{text}</a>
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
        },
    ])

    const handleUser = (record) =>{
        navigate(
            `/users/${record.id}`,
            {
            state:{
                data: record
            }
        })
    }
    
    const handleSearch = () => {
        const text = isValue.charAt(0).toUpperCase() + isValue.slice(1);
        let data = []
        Object.keys(isData).map((item)=>
            {
                if(isData[item].first_name===text){
                    data.push(isData[item])
                }
            }
        )
        if(data.length===0){
            if(isValue.length!==0){
                setIsModalVisible(true)
                setModalMessage(`Data for this name: ${text} is not present`)
            }
            getData()
        }else{
            setIsData([...data])
        }
    }

    return(
        <>
            <Modal
                visible={isModalVisible} 
                onOk={()=>{setIsModalVisible(false)}} 
                onCancel={()=>{setIsModalVisible(false)}}
            >
                <p>{modalMessage}</p>
            </Modal>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: '5vw'
            }}>
                <Card  style={{
                        width: 1000,
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderRadius: 30,
                    }}
                >
                    <p style={{fontSize: "xxx-large"}}>Users</p>
                    <div style={{
                        display: 'flex'
                    }}>
                        <Input 
                            style={{marginLeft:'4vw',width: '25vw'}} 
                            placeholder='Search by First Name'
                            onChange={(event)=>setIsValue(event.target.value)}
                        />
                        <button onClick={handleSearch}><SearchOutlined /></button>
                    </div>
                    <div className="listingPage">
                        <Table
                            className="tablebody"
                            columns={isColumn}
                            dataSource={isData}
                            pagination={true}
                        />
                    </div>
                </Card>
            </div>
        </>
    )
}

export default MainPage;