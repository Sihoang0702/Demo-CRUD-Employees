import {  useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom"
type User = {email: string, password: string}
const Signin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {mutate} = useMutation({
      mutationFn: async(user: User) => {
        try {
          const response = await axios.post(`http://localhost:3000/register`, user)
          return response.data
        } catch (error) {
          console.log(error)
        }       
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["USER"]
        })
        navigate("/products")
        alert("Bạn đã thêm sản phẩm thành công")
        reset()
    }
  })  
  const {register, handleSubmit, formState: {error}, reset} =useForm({
    defaultValues:{
      email: "",
      password: ""
    }
  })
  const onSubmit: SubmitHandler<User> = (data) => {
    // console.log(data)
    mutate(data)
  }
  return (
    <div>
     
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="form-label">Email</div>
        <input className="form-control" type="email" {...register('email') } placeholder="Email" />
      </div>
      <div className="form-group">
        <div className="form-label">Password</div>
        <input className="form-control" type="password" {...register('password') } placeholder="mật khẩu" />
      </div>
      <button className="btn btn-primary">Đăng ký</button>

      </form>
      
     
    </div>
  )
}

export default Signin