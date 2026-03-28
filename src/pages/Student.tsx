import { Button, Form, Input, message, Modal, Table, Tabs, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

const Student = () => {

    // 1. Cập nhật Interface thêm trường _id
    interface Student {
        _id: string;
        fullName: string;
        email: string;
        department: string;
        identityCode: string;
        phoneNumber: string;
    }

    const [data, setData] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [total, setTotal] = useState<number>(1);
    const [isEditing, setIsEditng] = useState<Student | null>(null);

    const [form] = Form.useForm();
    const [editForm] = Form.useForm();


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOpenEditModal = (student: Student) => {
        setIsEditng(student);
        editForm.setFieldsValue({
            fullName: student.fullName,
            email: student.email,
            department: student.department,
            identityCode: student.identityCode,
            phoneNumber: student.phoneNumber
        })
        setIsEditModalOpen(true);
    }

    const handleEditStudent = async (values: any) => {
        if (!isEditing) return;
        setLoading(true);
        try {
            await axios.put(
                `http://103.166.183.82:4040/api/v1/student/${isEditing._id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            message.success("Cập nhập sinh viên thành công");
            setIsEditModalOpen(false);
            setIsEditng(null);
            editForm.resetFields();
            fetchData();
        } catch (error) {

        }
    }

    const handleDeleteStudent = async (studentId: string) => {
        try {
            await axios.delete(`http://103.166.183.82:4040/api/v1/student/${studentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            message.success("Xóa sinh viên thành công!");
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
            title: "Mã sinh viên",
            dataIndex: "identityCode",
            key: "identityCode",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: Student) => (
                <div>
                    <Button type="text" onClick={() => handleOpenEditModal(record)}>Sửa</Button>
                    <Popconfirm
                        title="Xóa sinh viên"
                        description={`Bạn có chắc chắn muốn xóa sinh viên ${record.fullName} không?`}
                        // 3. Trỏ đúng vào record._id khi click xóa
                        onConfirm={() => handleDeleteStudent(record._id)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button type="text" danger>Xóa</Button>
                    </Popconfirm>
                </div>

            ),
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://103.166.183.82:4040/api/v1/student/pageable", {
                params: { page, limit },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setTotal(response.data.total);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Lấy dữ liệu thất bại!");
        }
        setLoading(false);
    };

    const handleAddStudent = async (values: any) => {
        setLoading(true);
        try {
            await axios.post("http://103.166.183.82:4040/api/v1/student", values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            message.success("Thêm sinh viên thành công!");
            setIsModalOpen(false);
            form.resetFields();
            fetchData();

        } catch (error) {
            console.error("Error adding student:", error);
            message.error("Có lỗi xảy ra khi thêm sinh viên!");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page, limit]);

    return (
        <MainLayout>
            <div style={{ border: "1px solid", padding: 24, borderRadius: 10, margin: 10 }}>
                <Tabs
                    items={[{
                        key: '1',
                        label: <h2>Quản lý sinh viên</h2>,
                        children: <Button onClick={() => setIsModalOpen(true)} type="primary">Thêm mới</Button>,
                    }]}
                    style={{ marginBottom: 20 }}
                />
                <Table
                    style={{ border: "1px solid", borderRadius: 10 }}
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    // 4. Set rowKey bằng _id để Ant Design map dữ liệu chuẩn xác
                    rowKey="_id"
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: total,
                        onChange: setPage
                    }}
                />

                <Modal
                    title="Thêm sinh viên"
                    open={isModalOpen}
                    onOk={() => form.submit()}
                    onCancel={() => {
                        setIsModalOpen(false);
                        form.resetFields();
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddStudent}
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
                            <Input placeholder="Nhập mã sinh viên" />
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Sửa sinh viên"
                    open={isEditModalOpen}
                    onOk={() => { editForm.submit() }}
                    onCancel={() => {
                        setIsEditModalOpen(false)
                        setIsEditng(null)
                        editForm.resetFields()
                    }}
                >
                    <Form form={editForm} layout="vertical" onFinish={handleEditStudent}>
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
                            <Input placeholder="Nhập mã sinh viên" />
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </MainLayout>
    );
};

export default Student;