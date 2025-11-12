import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, DatePicker, Select, Button, message, Modal } from "antd";
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
}

const CreateEditEmployees = ({ open, onClose, employee }: Props) => {
  const queryClient = useQueryClient();
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
        dob: employee.dob,
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IEmployee) => {
      if (employee?.id) {
        return axios.put(`http://localhost:3000/employees/${employee.id}`, data);
      } else {
        return axios.post("http://localhost:3000/employees", data);
      }
    },
    onSuccess: (res) => {
      if (employee?.id) {
        // Nếu là cập nhật, giữ nguyên cách cũ
        queryClient.invalidateQueries({ queryKey: ["EMPLOYEES"] });
        message.success("Cập nhật thành công!");
      } else {
        // Thêm mới: đưa nhân viên lên đầu danh sách
        queryClient.setQueryData<IEmployee[]>(["EMPLOYEES"], (old = []) => [
          res.data, // dữ liệu mới từ backend
          ...old,
        ]);
        message.success("Thêm mới thành công!");
        // Scroll lên đầu bảng
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      onClose();
    },
    onError: () => {
      message.error("Có lỗi xảy ra!");
    },
  });


  const onSubmit = (data: IEmployee) => {
    mutate({
      ...data,
      dob: dayjs(data.dob).format("YYYY-MM-DD"),
    });
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
          <Controller name="name" control={control} rules={{ required: true }}
            render={({ field }) => <Input {...field} placeholder="Nhập họ và tên" />} />
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
                onChange={(date) => field.onChange(date ? dayjs(date).format("YYYY-MM-DD") : "")} 
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
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Nhập địa chỉ" />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={isPending}>
          {employee ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateEditEmployees;
