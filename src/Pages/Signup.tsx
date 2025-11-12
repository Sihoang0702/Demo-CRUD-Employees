import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type User = { email: string; password: string };

const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (user: User) => {
      try {
        const response = await axios.post(`http://localhost:3000/signin`, user);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER"] });
      navigate("/products");
      alert("Bạn đã đăng nhập thành công");
      reset();
    },
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    mutate(data);
  };

  // --- style object ---
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6",
    fontFamily: "Inter, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    padding: "2.5rem 3rem",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    width: "380px",
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "#333",
    marginBottom: "1.5rem",
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: "0.4rem",
    fontWeight: 600,
    color: "#444",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.75rem 0.9rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "1rem",
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: 600,
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Đăng nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              {...register("email")}
              placeholder="Email"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Mật khẩu</label>
            <input
              style={inputStyle}
              type="password"
              {...register("password")}
              placeholder="Mật khẩu"
            />
          </div>
          <button style={buttonStyle} type="submit">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
