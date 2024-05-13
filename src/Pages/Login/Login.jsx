import { useContext, useEffect } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const { user,loginUser, googleLoginUser, githubLoginUser,setReload ,setUser} =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        navigate(location?.state ? location.state : "/");
    }
}, [user]);

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        
        setReload(true);
        toast.success("User Logged In Successfully.", {
          position: "top-right",
          onClose: () => {
            navigate(location?.state ? location.state : "/");
            location.reload();
          }
        });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          // console.log("invalid email or pass");
          toast.error("Invalid email address or password.", {
            position: "top-right",
          });
        }
      });
  };

  const handleGoogleLogIn = () => {
    googleLoginUser()
      .then((result) => {
        console.log(result.user);
        setReload(true);
        toast.success("User Logged In Successfully.", {
          position: "top-right",
          onClose: () => {
            navigate(location?.state ? location.state : "/");
            location.reload();
          }
        });
      })
      .catch((error) => console.log(error));
  };


  const handleGithubLogIn = () => {
    githubLoginUser()
      .then((result) => {
        console.log(result.user);
        setReload(true);
        toast.success("User Logged In Successfully.", {
          position: "top-right",
          onClose: () => {
            navigate(location?.state ? location.state : "/");
            location.reload();
          }
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-[#F5EAD8] p-4 md:p-20">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="md:justify-self-end">
        <img className="w-full h-full pr-8" src="https://i.ibb.co/N1R56qD/Humaaans-Wireframe.png" alt="" />
      </div>


      <div className="md:justify-self-start bg-[#F2DAAC] rounded-lg p-8 lg:px-36 lg:py-10    ">

      <form onSubmit={handleLogIn} >

      <h2 className="font-bold font-lilita text-[#023373] text-4xl text-center mb-4">
        Sign In
      </h2>
        <div className="form-control mb-4">
          
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="input input-bordered bg-[#FFF4E4]"
            required
          />
        </div>
        <div className="form-control mb-4">
          
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered bg-[#FFF4E4]"
            required
          />
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="hover:bg-black px-12 py-3  mx-auto bg-[#023373] text-white "
          >
            SIGN IN
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center gap-4 mt-4">
        <p>Or Sign In With</p>
        <div className="flex gap-4">
          <button className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base" onClick={handleGoogleLogIn}>
            <FaGoogle></FaGoogle>
          </button>
          <button className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base" onClick={handleGithubLogIn}>
          <FaGithub />
          </button>
        </div>

        <p className="text-center">Do not have an account? <Link className="underline cursor-pointer text-[#023373]" to="/register">Register Now</Link></p>
      </div>

      </div>
      </div>

      

      
      

      
      <ToastContainer />
    </div>
  );
};

export default Login;