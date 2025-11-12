import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, DatePicker, Select, Button, Modal, message } from "antd";
import dayjs from "dayjs";

interface IEmployee {
  id?: number;
  name: string;
  dob: string;
  gender: string;
  email: string;
  address: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  employee?: IEmployee | null;
  onSave: (emp: IEmployee) => void; // thêm prop onSave
}

const CreateEditEmployees = ({ open, onClose, employee, onSave }: Props) => {
  const [formInstance] = Form.useForm();
  const { control, handleSubmit, reset } = useForm<IEmployee>({
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        ...employee,
        dob: employee.dob, // giữ định dạng string "YYYY-MM-DD"
      });
    } else {
      reset({
        name: "",
        dob: "",
        gender: "",
        email: "",
        address: "",
      });
    }
  }, [employee, reset]);

  const onSubmit = (data: IEmployee) => {
    const empData: IEmployee = {
      ...data,
      dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : "",
      id: employee?.id, // giữ id nếu là sửa
    };
    onSave(empData); // gọi hàm onSave từ parent
    message.success(employee ? "Cập nhật nhân viên thành công!" : "Thêm nhân viên thành công!");
    onClose();
  };

  return (
    <Modal
      title={employee ? "✏️ Sửa nhân viên" : "➕ Thêm nhân viên mới"}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={formInstance} onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Họ và tên" required>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="Nhập họ và tên" />}
          />
        </Form.Item>

        <Form.Item label="Ngày sinh" required>
          <Controller
            name="dob"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                value={field.value ? dayjs(field.value) : undefined}
                style={{ width: "100%" }}
                onChange={(date) =>
                  field.onChange(date ? dayjs(date).format("YYYY-MM-DD") : "")
                }
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Giới tính" required>
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Chọn giới tính"
                options={[
                  { value: "Male", label: "Nam" },
                  { value: "FeMale", label: "Nữ" },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Email" required>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="Nhập email" />}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ" required>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input.TextArea {...field} placeholder="Nhập địa chỉ" />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {employee ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateEditEmployees;
