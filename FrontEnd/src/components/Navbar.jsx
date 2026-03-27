
import { NavLink } from "react-router-dom";

const Navbar = ({user}) => {


    return (
        <div className="header absolute px-12 py-2 w-full z-20">
            <div className="header-container flex justify-between">
                <NavLink to={'/'} className="header-title text-white sm:text-[20px] md:text-3xl flex flex-col justify-center">Movie Pattreaon</NavLink>
                {
                    user?
                    <div className="user-con gap-10 flex justify-around align-middle">
                        <NavLink to={`/profile`} key={user?.id} className="user-name sm:text-[20px] md:text-3xl text-white flex flex-col justify-center">{user?.firstName}</NavLink>
                        <NavLink to={`/profile`} key={user?.id} className="user-pic"><img className="w-10 rounded-full" src={user?.pic? user.pic : '/profile-pic.jpg'} alt="" /></NavLink>

                    </div>
                        :
                    <nav className="header-nav flex justify-around w-60">
                        <NavLink className="header-btn btn login-btn" to={'/log-in'}>Log In</NavLink>
                        <NavLink className="header-btn btn sign-up" to={'/sign-up'}>Sign Up</NavLink>
                    </nav>
                }   
            </div>
        </div>
    );
};

export default Navbar;
