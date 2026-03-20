import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Student = () => {

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
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading} />
        </>
    )
};

export default Student;