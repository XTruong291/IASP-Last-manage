import { Button, Form, Input, message, Modal, Popconfirm, Table, Tabs } from "antd";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const Teacher = () => {
    const [data, setData] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState<number>(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();



    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://103.166.183.82:4040/api/v1/teacher/pageable", {
                params: { page, limit },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response, ' res');
            setTotal(response.data.total);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Lấy dữ liệu thất bại!");
        }
        setLoading(false);
    };
    // console.log(data, 'data')

    const handleDeleteTeacher = async (teacaherId: string) => {
        try {
            await axios.delete(`http://103.166.183.82:4040/api/v1/teacher/${teacaherId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            message.success("Xóa giảng viên thành công!");
            // Nếu xóa bản ghi cuối cùng của 1 trang (trừ trang 1), lùi lại 1 trang
            if (data.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                fetchData();
            }
        } catch (error) {
            console.error("Error deleting student:", error);
            message.error("Có lỗi xảy ra khi xóa sinh viên!");
        }
    };

    const handleAddTeacher = async (values: any) => {
        setLoading(true);
        try {
            await axios.post("http://103.166.183.82:4040/api/v1/teacher", values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            message.success("Thêm giảng viên thành công!");
            setIsModalOpen(false);
            form.resetFields();
            fetchData();
        } catch (error) {
            console.error("Error adding student:", error);
            message.error("Có lỗi xảy ra khi thêm giảng viên!");
        }
    }


    interface Teacher {
        _id: string;
        fullName: string;
        email: string;
        department: string;
        identityCode: string;
        phoneNumber: string;
    }

    const columns = [
        {
            title: "Họ tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Lớp hành chính",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Mã giảng viên",
            dataIndex: "identityCode",
            key: "identityCode",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "",
            key: "action",
            render: (_: any, record: Teacher) => (
                <Popconfirm
                    title="Xóa sinh viên"
                    description={`Bạn có chắc chắn muốn xóa sinh viên ${record.fullName} không?`}
                    // 3. Trỏ đúng vào record._id khi click xóa
                    onConfirm={() => handleDeleteTeacher(record._id)}
                    okText="Đồng ý"
                    cancelText="Hủy"
                >
                    <Button type="text" danger>Xóa</Button>
                </Popconfirm>
            ),
        },
    ];


    useEffect(() => {
        fetchData()
    }, [])
    return (
        <MainLayout>
            <div style={{ border: "1px solid", padding: 24, borderRadius: 10, margin: 10 }}>
                <Tabs
                    items={[{
                        key: '1',
                        label: <h2>Quản lý giảng viên</h2>,
                        children: <Button type="primary" onClick={() => { setIsModalOpen(true) }}>Thêm mới</Button>,
                    }]}
                    style={{ marginBottom: 20 }}
                />
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={() => form.submit()}
                    onCancel={() => { setIsModalOpen(false) }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddTeacher}
                    >

                        <Form.Item name="fullName" label="Họ tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                            <Input placeholder="Nhập họ và tên" />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không đúng định dạng!' }]}>
                            <Input placeholder="Nhập địa chỉ email" />
                        </Form.Item>
                        <Form.Item name="department" label="Lớp hành chính" rules={[{ required: true, message: 'Vui lòng nhập lớp hành chính!' }]}>
                            <Input placeholder="Nhập lớp hành chính" />
                        </Form.Item>
                        <Form.Item name="identityCode" label="Mã sinh viên" rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}>
                            <Input placeholder="Nhập mã giảng viên" />
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </MainLayout>
    )
}
export default Teacher;