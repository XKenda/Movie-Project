import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { logIn } from "../../API/authApi";
import LSpinner from "../components/spinner";

const LogIn = ()=> {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try{
            const res = await logIn(email, password);
            
            if(res.data.success){
                navigate('/')
            }  
        } catch (err) {

            if(err.status === 403){
                navigate('/')
            } else {
                setMessage(err.response.data)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="log-in-con w-full text-white py-20 flex justify-around">
            <form onSubmit={handleSubmit} className="border rounded-2xl py-6 px-4 flex flex-col">
                <div className=" input-con email">
                    <label className="input-label" htmlFor="email">email</label>
                    <input
                    required
                        onChange={(e)=> setEmail(e.target.value)} 
                        id="email" 
                        className="email-input input-field" 
                        type="text"
                        placeholder="email..."
                        />
                </div>
                <div className=" input-con password">
                    <label className="input-label" htmlFor="password">password</label>
                    <input 
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                        id="password" 
                        className="password-input input-field" 
                        type="password"
                        placeholder="password..."
                        />
                </div>

                {
                    message && (
                        <p className=" text-red-500 mt-4 text-sm">{message}</p>
                    )
                }

                <div className="input-con flex justify-center my-5">
                    <button type="submit" className="submit btn bg-blue-400 py-2 px-4 rounded text-black">
                        {
                            isLoading? <LSpinner /> : "Log In"
                        }
                    </button>
                </div>
                <hr />
                <NavLink className="text-center mt-2 cursor-pointer text-blue-500" to={'/sign-up'}>Don't Have An Accouunt?</NavLink>

            </form>
            <Toaster />
        </div>
    )
}

export default LogIn;