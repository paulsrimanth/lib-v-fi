import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mainpage.css";
import Captcha from "./Captcha";
function LoginForm() {
  const navigate = useNavigate();
  const [email, Setemail] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, seterrors] = useState({
    emailerror: "",
    passworderror: "",
  });
  const powerdetails = {
    email,
    password,
  };
  async function PowerLogin() {
    const loginres = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Authorization, Cache-Control,Content-Type",
        AllowCredentials: "true",
        ExposedHeaders: "Authorization",
        //"Content-Type, Authorization",
      },
      body: JSON.stringify(powerdetails),
    });

    if (loginres.ok) {
      console.log("poweruser found");
      const responsetoken = await loginres.json();
      console.log(responsetoken);

      localStorage.setItem("token", responsetoken.token);
      navigate("/pp", { replace: true });
    }
    if (!loginres.ok) {
      const adminlogin = await fetch("http://localhost:8080/loginadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Authorization, Cache-Control,Content-Type",
          AllowCredentials: "true",
          ExposedHeaders: "Authorization",
          //"Content-Type, Authorization",
        },
        body: JSON.stringify(powerdetails),
      });

      if (adminlogin.ok) {
        console.log("admin found");
        const responsetoken = await adminlogin.json();
        console.log(responsetoken);

        localStorage.setItem("token", responsetoken.token);
        navigate("/adminlogin", { replace: true });
      }
      if (!adminlogin.ok) {
        const userlogin = await fetch("http://localhost:8080/loginuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers":
              "Authorization, Cache-Control,Content-Type",
            AllowCredentials: "true",
            ExposedHeaders: "Authorization",
            //"Content-Type, Authorization",
          },
          body: JSON.stringify(powerdetails),
        });

        if (userlogin.ok) {
          console.log("userfound");
          const responsetoken = await userlogin.json();
          console.log(responsetoken);
          console.log("userfound");
          console.log(userlogin);
          localStorage.setItem("token", responsetoken.token);
          navigate("/userlogin", { replace: true });
        }
        if (!userlogin.ok) {
          console.log("user not found");
        }
      }
    }
  }
  //errors
  function emailchange(evalue) {
    Setemail(evalue);
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(evalue).valueOf()) {
      seterrors({
        ...errors,
        emailerror: "",
      });
    } else {
      seterrors({
        ...errors,
        emailerror: "enter valid email",
      });
    }
  }
  function passwordchange(evalue) {
    SetPassword(evalue);
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        .test(evalue)
        .valueOf()
    ) {
      seterrors({
        ...errors,
        passworderror: "",
      });
      console.log(errors.emailerror);
    } else {
      seterrors({
        ...errors,
        passworderror: "",
      });
    }
  }

  return (
    <div className="login-body">
      <div className="login-from">
        <div className="login-outer">
          <div className="login">
            <form>
              <div className="input-field">
                <input
                  className="inputs"
                  type="text"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => {
                    emailchange(e.target.value);
                  }}
                ></input>
              </div>

              <div className="input-field">
                <input
                  className="inputs"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    passwordchange(e.target.value);
                    // SetPassword(e.target.value);
                  }}
                ></input>

                {errors.passworderror && (
                  <small style={{ color: "red", width: "10px" }}>
                    {errors.passworderror}
                  </small>
                )}
              </div>
              <div>
                <Captcha />
              </div>
              <div className="btn-div">
                <button onClick={() => PowerLogin()}>submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
