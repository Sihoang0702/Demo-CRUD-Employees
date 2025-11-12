import { Button, Table, Popconfirm, message } from "antd";
import type { TableColumnsType } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import CreateEditEmployees from "../utils/ModalCreatEdit";
import { useState, useEffect } from "react";

interface IEmployee {
    id?: number;
    name: string;
    dob: string;
    gender: string;
    email: string;
    address: string;
}

// Fake initial data
const initialEmployees: IEmployee[] = [
    {
        "id": 1,
        "name": "Nguyễn Văn A",
        "dob": "1998-01-04",
        "gender": "Male",
        "email": "nguyenvana@gmail.com",
        "address": "Hà Nội"
    },
    {
        "id": 2,
        "name": "Trần Thị B",
        "dob": "1999-02-03",
        "gender": "Female",
        "email": "tranthib@gmail.com",
        "address": "Hải Phòng"
    },
    {
        "id": 3,
        "name": "Phạm Văn C",
        "dob": "1997-03-12",
        "gender": "Male",
        "email": "phamvanc@gmail.com",
        "address": "Nam Định"
    },
    {
        "id": 4,
        "name": "Lê Thị D",
        "dob": "1996-04-21",
        "gender": "Female",
        "email": "lethid@gmail.com",
        "address": "Nghệ An"
    },
    {
        "id": 5,
        "name": "Hoàng Văn E",
        "dob": "1995-05-30",
        "gender": "Male",
        "email": "hoangvane@gmail.com",
        "address": "Thanh Hóa"
    },
    {
        "id": 6,
        "name": "Nguyễn Thị F",
        "dob": "1998-06-17",
        "gender": "Female",
        "email": "nguyenthif@gmail.com",
        "address": "Đà Nẵng"
    },
    {
        "id": 7,
        "name": "Trần Văn G",
        "dob": "1994-07-09",
        "gender": "Male",
        "email": "tranvang@gmail.com",
        "address": "Huế"
    },
    {
        "id": 8,
        "name": "Phan Thị H",
        "dob": "1993-08-25",
        "gender": "Female",
        "email": "phanthih@gmail.com",
        "address": "Cần Thơ"
    },
    {
        "id": 9,
        "name": "Vũ Văn I",
        "dob": "2000-09-11",
        "gender": "Male",
        "email": "vuvani@gmail.com",
        "address": "Quảng Ninh"
    },
    {
        "id": 10,
        "name": "Đặng Thị J",
        "dob": "1999-10-03",
        "gender": "Female",
        "email": "dangthij@gmail.com",
        "address": "Lào Cai"
    },
    {
        "id": 11,
        "name": "Ngô Văn K",
        "dob": "1997-11-14",
        "gender": "Male",
        "email": "ngovank@gmail.com",
        "address": "Bắc Giang"
    },
    {
        "id": 12,
        "name": "Bùi Thị L",
        "dob": "1996-12-01",
        "gender": "Female",
        "email": "buithil@gmail.com",
        "address": "Hà Nam"
    },
    {
        "id": 13,
        "name": "Phùng Văn M",
        "dob": "1995-01-22",
        "gender": "Male",
        "email": "phungvanm@gmail.com",
        "address": "Thái Bình"
    },
    {
        "id": 14,
        "name": "Tạ Thị N",
        "dob": "1994-02-15",
        "gender": "Female",
        "email": "tathin@gmail.com",
        "address": "Hưng Yên"
    },
    {
        "id": 15,
        "name": "Đỗ Văn O",
        "dob": "1993-03-09",
        "gender": "Male",
        "email": "dovano@gmail.com",
        "address": "Ninh Bình"
    },
    {
        "id": 16,
        "name": "Mai Thị P",
        "dob": "1992-04-28",
        "gender": "Female",
        "email": "maithip@gmail.com",
        "address": "Phú Thọ"
    },
    {
        "id": 17,
        "name": "Nguyễn Văn Q",
        "dob": "1991-05-13",
        "gender": "Male",
        "email": "nguyenvanq@gmail.com",
        "address": "Hà Tĩnh"
    },
    {
        "id": 18,
        "name": "Trịnh Thị R",
        "dob": "1998-06-07",
        "gender": "Female",
        "email": "trinhthir@gmail.com",
        "address": "Bắc Ninh"
    },
    {
        "id": 19,
        "name": "Phạm Văn S",
        "dob": "1999-07-29",
        "gender": "Male",
        "email": "phamvans@gmail.com",
        "address": "Hà Nội"
    },
    {
        "id": 20,
        "name": "Lê Thị T",
        "dob": "1997-08-17",
        "gender": "Female",
        "email": "lethit@gmail.com",
        "address": "Đà Lạt"
    },
    {
        "id": 21,
        "name": "Hoàng Văn U",
        "dob": "1995-09-20",
        "gender": "Male",
        "email": "hoangvanu@gmail.com",
        "address": "Buôn Ma Thuột"
    },
    {
        "id": 22,
        "name": "Đinh Thị V",
        "dob": "1996-10-05",
        "gender": "Female",
        "email": "dinhthiv@gmail.com",
        "address": "Kon Tum"
    },
    {
        "id": 23,
        "name": "Nguyễn Văn W",
        "dob": "1998-11-16",
        "gender": "Male",
        "email": "nguyenvanw@gmail.com",
        "address": "Đà Nẵng"
    },
    {
        "id": 24,
        "name": "Phan Thị X",
        "dob": "1999-12-25",
        "gender": "Female",
        "email": "phanthix@gmail.com",
        "address": "Cà Mau"
    },
    {
        "id": 25,
        "name": "Trần Văn Y",
        "dob": "1997-01-30",
        "gender": "Male",
        "email": "tranvany@gmail.com",
        "address": "Hà Nội"
    },
    {
        "id": 26,
        "name": "Vũ Thị Z",
        "dob": "1998-02-14",
        "gender": "Female",
        "email": "vuthiz@gmail.com",
        "address": "Hải Dương"
    },
    {
        "id": 27,
        "name": "Phạm Văn AA",
        "dob": "1999-03-22",
        "gender": "Male",
        "email": "phamvanaa@gmail.com",
        "address": "Hòa Bình"
    },
    {
        "id": 28,
        "name": "Lê Thị BB",
        "dob": "1995-04-09",
        "gender": "Female",
        "email": "lethibb@gmail.com",
        "address": "Bình Dương"
    },
    {
        "id": 29,
        "name": "Hoàng Văn CC",
        "dob": "1996-05-27",
        "gender": "Male",
        "email": "hoangvancc@gmail.com",
        "address": "TP.HCM"
    },
    {
        "id": 30,
        "name": "Nguyễn Thị DD",
        "dob": "1997-06-15",
        "gender": "Female",
        "email": "nguyenthidd@gmail.com",
        "address": "Kiên Giang"
    },
    {
        "id": 6097,
        "name": "Hoang Nguyen Si",
        "dob": "2025-11-11",
        "gender": "Male",
        "email": "doantran.web@gmail.com",
        "address": "Cau Giay"
    },
    {
        "id": 793,
        "name": "Hoang Nguyen Si",
        "dob": "2025-11-12",
        "gender": "Male",
        "email": "d@gmail.com",
        "address": "Cau Giay"
    },
    {
        "id": 404,
        "name": "Hoang Nguyen Si",
        "dob": "2025-11-05",
        "gender": "Male",
        "email": "emailUser1727@gmail.com",
        "address": "Cau Giay"
    }
]
// "users": [
//     {
//         "email": "admin@gmail.com",
//         "password": "$2a$10$lpxtife2P8UPW4gZ1YLoGeBMKlZewINZ.GPSAKHFtv4bo0/ZAz3l.",
//         "id": "1"
//     },
//     {
//         "email": "user@gmail.com",
//         "password": "$2a$10$YewSIwfCpM1K04evyvOVvu68CrctaE4.UiKd1GGbkN49z82CYHHA6",
//         "id": "2"
//     }
// ]

const ListEmployee = () => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);

    // Fake fetch data
    useEffect(() => {
        setTimeout(() => {
            setEmployees(initialEmployees);
            setLoading(false);
        }, 500); // giả lập loading
    }, []);

    // Fake delete
    const handleDelete = (id: number) => {
        setEmployees(employees.filter(emp => emp.id !== id));
        message.success("Xóa nhân viên thành công (fake)!");
    };

    // Fake add/edit
    const handleSave = (emp: IEmployee) => {
        if (emp.id) {
            setEmployees(employees.map(e => (e.id === emp.id ? emp : e)));
            message.success("Cập nhật nhân viên thành công!");
        } else {
            const newEmp = { ...emp, id: employees.length + 1 };
            setEmployees([newEmp, ...employees]);
            message.success("Thêm nhân viên thành công!");
        }
        setOpenModal(false);
        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll lên đầu
    };


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
            title: "Địa chỉ",
            dataIndex: "address",
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
                        onConfirm={() => {
                            if (record.id !== undefined) handleDelete(record.id);
                        }}

                    >
                        <Button danger>Xóa <DeleteOutlined /></Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    if (loading) return <div>Đang tải... <LoadingOutlined /></div>;

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
                dataSource={employees.map((item) => ({ ...item, key: item.id }))}
                bordered
            />

            <CreateEditEmployees
                open={openModal}
                onClose={() => setOpenModal(false)}
                employee={selectedEmployee}
                onSave={handleSave} // truyền hàm lưu
            />
        </div>
    );
};

export default ListEmployee;
