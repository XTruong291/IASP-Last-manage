import {
  Button,
  message,
  Modal,
  Popconfirm,
  Table,
  Tabs,
  Input,
  Form,
} from "antd";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

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
  const [editingSubject, setEditngSubject] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

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
          <Button onClick={() => handleOpenModal(record)}>Sửa</Button>
          <Popconfirm
            title="Xóa sinh viên"
            description={`Bạn có chắc chắn muốn xóa môn ${record.name} không?`}
          
            onConfirm={() => handleDeleteSubject(record._id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="text" danger>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleOpenModal = (subject: Subject) => {
    setEditngSubject(subject);
    editForm.setFieldsValue({
      name: subject.name,
      subjectCode: subject.subjectCode,
    });
    setIsEditModalOpen(true);
  };
  const handleEditSubject = async (values: any) => {
    setLoading(true);
    try {
      await api.put(`/subject/${editingSubject?._id}`, values);
      editForm.resetFields();
      message.success("Sửa môn học thành công");
      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {
      message.error("lỗi");
    }
  };

  const handleDeleteSubject = async (subjectId: string) => {
    try {
      await api.delete(`/subject/${subjectId}`);
      message.success("xóa môn học thành công");
      fetchData();
    } catch (error) {
      message.error("lỗi");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/subject/pageable", {
        params: { page, limit },
      });
      setTotal(response.data.total);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Lấy dữ liệu thất bại!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const handleAddSubject = async (values: any) => {
    setLoading(true);
    try {
      const response = await api.post("/subject", values);
      message.success("thêm môn học thành công");
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      message.error("lỗi");
    }
  };

  return (
    <MainLayout>
      <Tabs
        items={[
          {
            key: "1",
            label: <h2>Quản lý môn học</h2>,
            children: (
              <Button onClick={() => setIsModalOpen(true)} type="primary">
                Thêm mới
              </Button>
            ),
          },
        ]}
        style={{ marginBottom: 20 }}
      />
      <Table
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          onChange: setPage,
        }}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
      <Modal
        title="Thêm môn"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} onFinish={handleAddSubject} layout="vertical">
          <Form.Item
            name="name"
            label="Tên môn học"
            rules={[{ required: true, message: "Vui lòng nhập Môn học!" }]}
          >
            <Input placeholder="Nhập môn học" />
          </Form.Item>
          <Form.Item
            name="subjectCode"
            label="Mã môn học"
            rules={[{ required: true, message: "Vui lòng nhập mã môn học!" }]}
          >
            <Input placeholder="Nhập địa mã môn học" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Sửa môn"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isEditModalOpen}
        onOk={() => editForm.submit()}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Form form={editForm} onFinish={handleEditSubject} layout="vertical">
          <Form.Item
            name="name"
            label="Tên môn học"
            rules={[{ required: true, message: "Vui lòng nhập Môn học!" }]}
          >
            <Input placeholder="Nhập môn học" />
          </Form.Item>
          <Form.Item
            name="subjectCode"
            label="Mã môn học"
            rules={[{ required: true, message: "Vui lòng nhập mã môn học!" }]}
          >
            <Input placeholder="Nhập địa mã môn học" />
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};
export default Subject;
