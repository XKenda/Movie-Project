import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../API/authApi";
import toast , { Toaster } from "react-hot-toast";


const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(success){
            toast("Account created Successfully!")
            navigate('/log-in')
        }
    },[success])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const  {data}  = await signUp(firstName, lastName, email, password, Number(age));

        if (data.success){
            setSuccess(true)
        }
        } catch (err) {
            setMessage(err.response.data)
            setSuccess(false)
        }
    };


    return (
        <div className="sign-up-con text-white py-20 flex justify-around">
            <form onSubmit={handleSubmit} className="border rounded-2xl py-6 px-4 flex flex-col">
                <div className=" input-con firstname">
                    <label className="input-label" htmlFor="firstname">First name:</label>
                    <input 
                    required
                        onChange={(e)=> setFirstName(e.target.value)}
                        id="firstname" 
                        className="first-name-input input-field" 
                        type="text"
                        placeholder="username.."
                        />
                </div>
                <div className=" input-con last-name">
                    <label className="input-label" htmlFor="last-name">last name:</label>
                    <input 
                    required
                        onChange={(e)=> setLastName(e.target.value)}
                        id="last-name" 
                        className="last-name-input input-field" 
                        type="text"
                        placeholder="last name.."
                        />
                </div>
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
                <div className=" input-con age">
                    <label className="input-label" htmlFor="age">Age</label>
                    <input 
                    required
                        onChange={(e)=> setAge(e.target.value)}
                        type="number" 
                        className=" age input-field" 
                        max={100} 
                        min={5} 
                        name="age" 
                        id="age"  />
                </div>

                {message && (
                    <p className="mt-4 text-sm">{message}</p>
                )}

                <div className="input-con flex justify-center my-5">
                    <button type="submit" className="submit btn bg-blue-400 py-2 px-4 rounded text-black">
                        Sign up
                    </button>
                </div>
                <hr />
                <NavLink className="text-center mt-2 cursor-pointer text-blue-500" to={'/log-in'}>Already have an account?</NavLink>


            </form>
            <Toaster />
        </div>
    )
}

export default SignUp;