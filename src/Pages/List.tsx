import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table, Popconfirm, message } from "antd";
import type { TableColumnsType } from "antd";
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import CreateEditEmployees from "../utils/ModalCreatEdit";
import { useState } from "react";

interface IEmployee {
    id: number;
    name: string;
    dob: string;
    gender: string;
    email: string;
    address: string;
}

const ListEmployee = () => {
    const queryClient = useQueryClient();
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);

    const { data, isLoading, isError } = useQuery<IEmployee[]>({
        queryKey: ["EMPLOYEES"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/employees");
            return res.data;
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/employees/${id}`);
        },
        onSuccess: () => {
            message.success("Xóa nhân viên thành công!");
            queryClient.invalidateQueries({ queryKey: ["EMPLOYEES"] });
        },
        onError: () => {
            message.error("Xóa thất bại!");
        },
    });

    const columns: TableColumnsType<IEmployee> = [
        { title: "ID", dataIndex: "id", width: 70 },
        {
            title: "Tên nhân viên",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["ascend", "descend"],
        },
        { title: "Ngày sinh", dataIndex: "dob" },
        {
            title: "Giới tính",
            dataIndex: "gender",
            filters: [
                { text: "Male", value: "Male" },
                { text: "FeMale", value: "FeMale" },
            ],
            onFilter: (value, record) => record.gender === value,
        },
        { title: "Email", dataIndex: "email" },
        {
            title: "Địa chỉ", dataIndex: "address", 
            sorter: (a, b) => a.address.localeCompare(b.address),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedEmployee(record);
                            setOpenModal(true);
                        }}
                    >
                        Sửa <EditOutlined />
                    </Button>

                    <Popconfirm
                        title="Xóa nhân viên"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => mutate(record.id)}
                    >
                        <Button danger loading={isPending}>
                            Xóa <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    if (isLoading) return <div>Đang tải... <LoadingOutlined /></div>;
    if (isError) return <div>Lỗi khi tải dữ liệu!</div>;

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Danh sách nhân viên</h2>
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedEmployee(null);
                        setOpenModal(true);
                    }}
                >
                    Thêm mới nhân viên <PlusOutlined />
                </Button>
            </div>

            <Table<IEmployee>
                columns={columns}
                dataSource={data?.map((item) => ({ ...item, key: item.id })) ?? []}
                bordered
            />

            <CreateEditEmployees
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                employee={selectedEmployee}
            />
        </div>
    );
};

export default ListEmployee;
