import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { UsergroupAddOutlined } from "@ant-design/icons";
import FitImage from '../assets/FIT.png';

const { Header, Sider, Content } = Layout;

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
const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();


    // Bạn có thể đổi mã màu này thành màu hex mà dự án bạn đang dùng (VD: #141414 hoặc #001529)
    const siderBackgroundColor = "#001529";

    return (
        // Thêm minHeight: '100vh' để Layout bao phủ toàn màn hình
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor:"rgb(18, 105, 167)",  color: "#fff", display: 'flex', alignItems: 'center', gap: 20, padding: 0 }}>
                <div>
                    <img width="50px" style={{ display: "flex", alignItems: "center", marginLeft: 20 }} src={FitImage} alt="Logo" />
                </div>
                <h2>NEU Virtural Online</h2>
            </Header>

            <Layout>
                <Sider style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={items}
                        onClick={({ key }) => navigate(key)}
                        defaultSelectedKeys={["/students"]}
                        selectedKeys={[window.location.pathname]}
                        style={{
                            background: 'transparent',
                            width: 200// Để Menu trong suốt và ăn theo màu của Sider
                        }}
                    />
                </Sider>

                <Layout >
                    <Content style={{ margin: 0 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;