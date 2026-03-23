import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { UsergroupAddOutlined } from "@ant-design/icons";
import FitImage from '../assets/FIT.png';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const items = [
        {
            key: "/students",
            label: "Quản lý sinh viên",
            icon: <UsergroupAddOutlined />,
        },
        {
            key: "/teachers",
            label: "Quản lý giảng viên",
            icon: <UsergroupAddOutlined />,
        }
    ];

    // Bạn có thể đổi mã màu này thành màu hex mà dự án bạn đang dùng (VD: #141414 hoặc #001529)
    const siderBackgroundColor = "#001529";

    return (
        // Thêm minHeight: '100vh' để Layout bao phủ toàn màn hình
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ color: "#fff", display: 'flex', alignItems: 'center', gap: 100, padding: 0 }}>
                <div>
                    <img width="50px" style={{ display: "flex", alignItems: "center", marginLeft: 20 }} src={FitImage} alt="Logo" />
                </div>
                <h2>Dash Board</h2>
            </Header>

            <Layout>
                {/* Ép màu nền cho Sider */}
                <Sider width={200} style={{ background: siderBackgroundColor }}>
                    <Menu
                        mode="inline"
                        theme="dark" // Dùng theme="dark" của antd để Menu tự động chuyển chữ trắng, nền tối
                        items={items}
                        onClick={({ key }) => navigate(key)}
                        style={{
                            background: 'transparent', // Để Menu trong suốt và ăn theo màu của Sider
                            borderRight: 0             // Xóa đường viền thừa bên phải Menu
                        }}
                    />
                </Sider>

                <Layout style={{ padding: '24px' }}>
                    <Content style={{ margin: 0 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;