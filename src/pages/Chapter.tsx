import { Button, message, Popconfirm, Table, Tabs } from "antd";
import MainLayout from "../layouts/MainLayout"
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const Chapter = () => {
    interface Chapter {
        _id: string;
        chapterNumber: string;
        name: string;
        subjectId: string;

    }

    const [data, setData] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [total, setTotal] = useState<number>(1);
    const [isEditing, setIsEditng] = useState<Chapter | null>(null);


    const columns = [
        {
            title: "Tên chương",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số chương",
            dataIndex: "chapterNumber",
            key: "chapterNumber",
        },
        {
            title: "Môn học",
            dataIndex: "subjectId",
            key: "subjectId",
            render: (subject : any)=>{
                return subject.name;
            }
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: Chapter) => (
                <div>
                    <Button type="text" >Sửa</Button>
                    <Popconfirm
                        title="Xóa sinh viên"
                        description={`Bạn có chắc chắn muốn xóa môn ${record.name} không?`}

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

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await api.get("/chapter/pageable", {
                params: { page, limit },
            })
            setTotal(response.data.total);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Lấy dữ liệu thất bại!");
        }
    }
    useEffect(() => {
        fetchData()
    }, [page, limit])
    return (
        <MainLayout>
            <Tabs
                items={[{
                    key: '1',
                    label: <h2>Quản lý chương</h2>,
                    children: <Button type="primary">Thêm mới</Button>,
                }]}
                style={{ marginBottom: 20 }}
            />
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
            />
        </MainLayout>
    )
}
export default Chapter;