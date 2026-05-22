import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const { login } = useContext(AppContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        
        email: "",
        password: ""
    })



    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const {  email, password } = formData
    const submitHandler = async (event) => {
        event.preventDefault()
        const result = await login( email, password)
        
        if(result.success){
            navigate('/')
        }
        console.log(formData)

        
    }


    return (
        <>
            <div className="container my-5 d-flex justify-content-center">
                <div className="card shadow p-4" style={{ width: "600px", borderRadius: "10px" }}>
                    <h2 className="text-center mb-4 text-primary">User Login</h2>

                    <form onSubmit={submitHandler}>
                     
                       

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">Email address</label>
                            <input
                                name='email'
                                value={formData.email}
                                onChange={onChangeHandler}
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                aria-describedby="emailHelp"
                            />

                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold">Password</label>
                            <input
                                name='password'
                                value={formData.password}
                                onChange={onChangeHandler}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
