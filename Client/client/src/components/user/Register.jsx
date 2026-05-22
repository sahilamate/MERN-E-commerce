import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const { register } = useContext(AppContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })



    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const { name, email, password } = formData
    const submitHandler = async (event) => {
        event.preventDefault()
        const result = await register(name, email, password)
        
        if(result.success){
            navigate('/login')
        }
        console.log(formData)

        
    }


    return (
        <>
            <div className="container my-5 d-flex justify-content-center">
                <div className="card shadow p-4" style={{ width: "600px", borderRadius: "10px" }}>
                    <h2 className="text-center mb-4 text-primary">User Register</h2>

                    <form onSubmit={submitHandler}>
                        {/* User Name */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-bold">User Name</label>
                            <input
                                name='name'
                                value={formData.name}
                                onChange={onChangeHandler}
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                            />
                        </div>

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
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
