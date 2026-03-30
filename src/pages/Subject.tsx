import { Button, Popconfirm, Table, Tabs } from "antd";
import MainLayout from "../layouts/MainLayout"
import { useState } from "react";

const Subject = () => {
    interface Subject {
        _id: string;
        name: string;
        subjectCode: string;

    }

    const [data, setData] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [total, setTotal] = useState<number>(1);
    const [isEditing, setIsEditng] = useState<Subject | null>(null);


    const columns = [
        {
            title: "Tên môn học",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mã môn học",
            dataIndex: "subjectCode",
            key: "subjectCode",
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: Subject) => (
                <div>
                    <Button type="text" >Sửa</Button>
                    <Popconfirm
                        title="Xóa sinh viên"
                        description={`Bạn có chắc chắn muốn xóa môn ${record.name} không?`}
                        // 3. Trỏ đúng vào record._id khi click xóa
                        //oncf
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button type="text" danger>Xóa</Button>
                    </Popconfirm>
                </div>

            ),
        },
    ];

    return (
        <MainLayout>
            <Tabs
                items={[{
                    key: '1',
                    label: <h2>Quản lý môn học</h2>,
                    children: <Button type="primary">Thêm mới</Button>,
                }]}
                style={{ marginBottom: 20 }}
            />
            <Table
                columns={columns}
            />
        </MainLayout>
    )
}
export default Subject;