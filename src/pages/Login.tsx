import { Button, Card, Checkbox, Form, Input, type FormProps } from "antd"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FitImage from '../assets/FIT.png';


const Login = () => {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await axios.post('http://103.166.183.82:4040/api/v1/user/login', values);
            console.log(res, 'response');
            console.log('Login success:', res.data);

            navigate("/students")
            // 👉 lưu token
            localStorage.setItem('token', res.data.accessToken);

        } catch (error: any) {
            console.log('Login failed:', error.response?.data);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div style={{ backgroundColor: "#001529", padding: 10 , display: "flex" ,alignItems: 'center', gap: 30,}}>
                <div>
                    <img width="50px" style={{ display: "flex", alignItems: "center", marginLeft: 20 }} src={FitImage} alt="Logo" />
                </div>
                <h1>NEU Virtural Online</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Card title='Login' variant="borderless" style={{ width: 400 }}>
                    <Form
                        name="basic"

                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on">
                        <Form.Item
                            label="Username"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        {/* 
                        <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

                        <Form.Item label={null} style={{textAlign: "center"}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
}
export default Login;