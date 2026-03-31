import { Button, Card, Checkbox, Form, Input, Layout, Typography, message } from "antd"
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'; // Thêm icon cho đẹp
import { useNavigate } from "react-router-dom";
import FitImage from '../assets/FIT.png';
import api from "../api/axiosInstance";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
      
        const hideLoading = message.loading('Đang xác thực...', 0);
        try {
            const res = await api.post('/user/login', values);

            localStorage.setItem('token', res.data.accessToken);
            hideLoading();
            message.success('Đăng nhập thành công!');

            navigate("/students");

        } catch (error: any) {
            hideLoading();
            console.log('Login failed:', error.response?.data);
            message.error(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                backgroundColor: "rgb(18, 105, 167)",
                color: "#fff",
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 10 // Đảm bảo header luôn nằm trên
            }}>
                <img width="40px" src={FitImage} alt="Logo" style={{ marginRight: 15 }} />
                <Title level={3} style={{ color: '#fff', margin: 0, fontWeight: 400 }}>
                    NEU Virtual Online
                </Title>
            </Header>

            <Content style={{ position: 'relative', overflow: 'hidden' }}>
                {/* 1. LỚP NỀN ẢNH (Bị mờ) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scale(1.1)', // Phóng to nhẹ để tránh viền trắng khi blur
                    zIndex: 2
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: '100%',
                    padding: '40px 20px'
                }}>
                    {/* FORM */}
                    <Card
                        style={{
                            width: 450, 
                            borderRadius: 16, 
                            // HIỆU ỨNG KÍNH MỜ (Glassmorphism) cho Card
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(10px)', // Mờ phần nền ngay dưới Card
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                            border: '1px solid rgba(255, 255, 255, 0.1)', // Viền trắng mảnh
                        }}
                        bodyStyle={{ padding: '40px 30px' }} // Tăng padding bên trong Card
                    >
                        {/* Tiêu đề custom bên trong Card body */}
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <Title level={2} style={{ color: '#fff', marginBottom: 10 }}>Đăng Nhập</Title>
                            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16 }}>
                                By <a href="https://github.com/XTruong291">XTruong291</a>
                            </Text>
                        </div>

                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="on"
                            size="large" // Tăng kích thước các input cho dễ bấm
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không đúng định dạng!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />}
                                    placeholder="Địa chỉ Email "
                                    style={{ borderRadius: 8 }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />}
                                    placeholder="Mật khẩu"
                                    style={{ borderRadius: 8 }}
                                />
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox style={{ color: '#fff' }}>Ghi nhớ</Checkbox>
                                </Form.Item>
                                <a href="#forgot" style={{ color: '#fff', opacity: 0.8 }}>Quên mật khẩu?</a>
                            </div>

                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    icon={<LoginOutlined />}
                                    style={{
                                        height: 50,
                                        borderRadius: 8,
                                        fontSize: 18,
                                        fontWeight: 600,
                                        backgroundColor: "rgb(18, 105, 167)", // Màu xanh đồng bộ với Header
                                        borderColor: "rgb(18, 105, 167)"
                                    }}
                                >
                                    ĐĂNG NHẬP
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Content>
        </Layout>
    )
}
export default Login;