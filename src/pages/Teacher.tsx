import { Button, message, Popconfirm, Table, Tabs } from "antd";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useState } from "react";

const Teacher = () => {
    const [data, setData] = useState<Teacher[]>([]);
        const [loading, setLoading] = useState(false);
        const [page, setPage] = useState<number>(1);
        const [limit, setLimit] = useState<number>(10);
        const [total, setTotal] = useState<number>(1);





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

    const handleDeleteStudent = async (teacaherId: string) => {
        try {
            await axios.delete(`http://103.166.183.82:4040/api/v1/student/${teacaherId}`, {
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
            render: (_: any, record: Teacher) => (
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
            ),
        },
    ];

    return (
        <MainLayout>
            <Tabs
                items={[{
                    key: '1',
                    label: <h2>Quản lý sinh viên</h2>,
                    children: <Button type="primary">Thêm mới</Button>,
                }]}
                style={{ marginBottom: 20 }}
            />
            <Table/>
        </MainLayout>
    )
}
export default Teacher;