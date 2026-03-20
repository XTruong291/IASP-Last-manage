import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { UsergroupAddOutlined } from "@ant-design/icons";
import FitImage from '../assets/FIT.png'


const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const navigate = useNavigate();

    const items = [
        {
            key: "/students",
            label: "Quản lý sinh viên",
            icon: <UsergroupAddOutlined />,
        },
    ];

    return (
        <Layout>
            <Header style={{ color: "#fff", display: 'flex', alignItems: 'center', gap: 100 }}>
                <div>
                    <img width="50px" style={{ display: "flex", alignItems: "center", marginLeft: 20 }} src={FitImage} alt="vsfgfrfer" />
                </div>
                <h2>Dash Board</h2>
            </Header>

            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        items={items}
                        onClick={({ key }) => navigate(key)}
                    />
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content>
                        {/* 👇 Chỗ này mới thay đổi */}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;