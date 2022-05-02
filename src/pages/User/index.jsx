import { useLocation, useNavigate } from "react-router";
import { PageHeader, Card, Form} from 'antd';

const UserPage = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    return(
        <>
            <PageHeader
                onBack={() => navigate(-1)}
                title={`Details: ${location.state.data.first_name}`}
            />
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: '5vw'
            }}>
                <Card style={{
                    width: '25vw',
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderRadius: 30
                }}>
                    <Form>
                        {
                            delete location.state.data['id']
                        }
                        {
                            Object.keys(location.state.data).map((item)=>
                                <>
                                    <Form.Item
                                        label= {item.replace('_',' ').toUpperCase()}
                                        name= {item.replace('_',' ').toUpperCase()}
                                    >
                                        {location.state.data[item]}
                                    </Form.Item>
                                </>
                            )
                        }
                    </Form>
                </Card>
            </div>
        </>
    )
}
export default UserPage;