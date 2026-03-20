import { Breadcrumb, Button, Image, Layout, Menu, Table, theme, type MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import FitImage from '../assets/FIT.png'
import { icons } from "antd/es/image/PreviewGroup";

import { StarOutlined, StarFilled, StarTwoTone, UsergroupAddOutlined } from '@ant-design/icons';
import { Group } from "antd/es/radio";
import { useEffect, useState } from "react";
import axios from "axios";


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '1',
        label: 'Quản lý sinh viên',
        icon: <UsergroupAddOutlined />
    }
]




const Dashboard = () => {

    interface Student {
        key: string;
        name: string;
        email: string;
        class: string;
        studentId: string;
        phoneNumber: string;
    }

    const [data, setData] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Lớp hành chính",
            dataIndex: "class",
            key: "class",
        },
        {
            title: "Mã sinh viên",
            dataIndex: "studentId",
            key: "studentId",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },

    ];

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get("http://103.166.183.82:4040/api/v1/user/info/me",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )

            const user = response.data;

            const formatData = [{
                key: user.id,
                name: user.name,
                email: user.email,
                class: user.class,
                studentId: user.studentId,
                phoneNumber: user.phoneNumber,
            }];

            setData(formatData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchData()
    }, [])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
                <div>
                    <img width="50px" style={{ display: "flex", alignItems: "center", marginLeft: 20 }} src={FitImage} alt="vsfgfrfer" />
                </div>
                <h2>Dash Board</h2>

            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={items}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <div>
                        <div>
                            <h3>Quản lý sinh viên</h3>
                        </div>
                        <div style={{ marginTop: 20, marginBottom: 20 }}>
                            <Button type="primary">
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Table
                            columns={columns}
                            dataSource={data}
                            loading={loading} />
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
export default Dashboard;