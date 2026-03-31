import { ConfigProvider, Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FormOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import FitImage from '../assets/FIT.png';

const { Header, Sider, Content } = Layout;
const SIDER_BG = "rgb(245, 245, 245)";

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
    },
    {
        key: "subjects-group",
        label: "Môn học",
        icon: <FormOutlined />,
        children: [
            {
                key: "/subjects",
                label: "Quản lý môn học"
            },
            {
                key: "/chapters",
                label: "Quản lý chương"
            },
        ]
    }
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor: "rgb(18, 105, 167)", color: "#fff", display: 'flex', alignItems: 'center', gap: 20, padding: 0 }}>
                <div>
                    <img width="50px" style={{ display: "flex", alignItems: "center", marginLeft: 20 }} src={FitImage} alt="Logo" />
                </div>
                <h2>NEU Virtural Online</h2>
            </Header>

            <Layout>
                <Sider style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    itemBg: SIDER_BG,
                                    subMenuItemBg: SIDER_BG,
                                    itemSelectedColor: "rgb(18, 105, 167)",
                                    itemSelectedBg: "rgba(18, 105, 167, 0.1)",
                                    itemHoverColor: "rgb(18, 105, 167)",
                                    itemHoverBg: "rgba(18, 105, 167, 0.06)",
                                },
                            },
                        }}
                    >
                        <Menu
                            mode="inline"
                            items={items}
                            onClick={({ key }) => navigate(key)}
                            selectedKeys={[location.pathname]}
                            defaultOpenKeys={["subjects-group"]}
                        />
                    </ConfigProvider>

                </Sider>

                <Layout>
                    <Content style={{ margin: 0 }}>
                        <div style={{ border: "1px solid", padding: 24, borderRadius: 10, margin: 10 }}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;