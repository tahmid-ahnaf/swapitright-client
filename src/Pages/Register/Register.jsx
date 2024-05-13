import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { registerUser, setUser, user, setReload } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location?.state ? location.state : "/");
    }
  }, [user]);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleTogglePassword = (passorConfirmpass) => {
    if (passorConfirmpass === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleTermsandConditions = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!/^(?=.*[a-z])/.test(password)) {
      setError("Password must have at least an lowercase letter");
      return;
    }

    if (!/^(?=.*[A-Z])/.test(password)) {
      setError("Password must have at least an uppercase letter");
      return;
    }


    if (!termsAccepted) {
      setError("You must accept terms and conditions");
      return;
    }

    setError("");

    console.log(name, email, password, photoURL);
    registerUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            setUser({ ...result.user, displayName: name, photoURL: photoURL });
            setReload(true);
            // toast.success("User Created Successfully.", {
            //   position: "top-right",
            // });
          })
          .catch((error) => {
            console.log(error);
          });
        // logoutUser();

        // navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-[#F5EAD8] p-4 md:p-20  rounded-lg border-4">
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:justify-self-end">
        <img className="w-full h-full" src="https://i.ibb.co/N1R56qD/Humaaans-Wireframe.png" alt="" />
      </div>

      <div className="md:justify-self-start bg-[#F2DAAC] rounded-lg p-8 lg:px-36 lg:py-10">
      <form
        onSubmit={handleRegister}
      >
        <h2 className="font-black text-4xl font-lilita text-[#023373] text-center mb-4">
          Sign Up
        </h2>

        <p className=" text-lg text-center mb-4">Already have an account? <Link className="font-semibold" to="/login">Sign In</Link></p>
        <div className="form-control mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="input input-bordered bg-[#FFF4E4]"
            required
          />
        </div>
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
            type="url"
            name="photoURL"
            placeholder="Enter your photo URL"
            className="input input-bordered bg-[#FFF4E4]"
            required
          />
        </div>
        <div className="form-control mb-4">
          <div className="flex gap-2 items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input w-full input-bordered bg-[#FFF4E4]"
              required
              >
                
              </input>

            {showPassword ? (
              <FiEye onClick={() => handleTogglePassword("password")}></FiEye>
            ) : (
              <FiEyeOff
                onClick={() => handleTogglePassword("password")}
              ></FiEyeOff>
            )}
          </div>
        </div>

        {error && <small className="text-red-800">{error}</small>}
        <div className="form-control mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              className="checkbox"
              onClick={handleTermsandConditions}
            />
            <span className="text-lg">Accept Terms & Conditions</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="hover:bg-black px-16 py-3 w-min mx-auto bg-[#023373] text-white"
          >
            CREATE
          </button>
        </div>
      </form>
      </div>
      </div>
      

      
    </div>
  );
};

export default Register;
