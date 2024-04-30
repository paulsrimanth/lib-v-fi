import { useState } from "react";

function Adminregister({ adduserclick, poweruserid }) {
  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [powerid, Setpowerid] = useState("");
  const admindetails = {
    powerId: powerid,
    firstname,
    lastname,
    email,
    password,
  };
  async function Admincreation() {
    Setpowerid(poweruserid);
    console.log(poweruserid);
    console.log(powerid);
    const adminres = await fetch("http://localhost:8080/adminregister", {
      method: "POST",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admindetails),
    });
    if (adminres.ok) {
      console.log("registration succesfull");
      console.log(adminres);
    }
  }

  return (
    <div>
      <div>
        <form>
          <div>
            <input
              type="text"
              placeholder="first name"
              value={firstname}
              onChange={(e) => {
                Setfirstname(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="last name"
              value={lastname}
              onChange={(e) => {
                Setlastname(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="email address"
              value={email}
              onChange={(e) => {
                Setemail(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                Setpassword(e.target.value);
              }}
            ></input>
          </div>
        </form>
        <div>
          <button onClick={() => Admincreation()}>ADD ☑</button>
        </div>
        <div>
          <div>{email}</div>
          <div>{password}</div>
        </div>
      </div>
    </div>
  );
}

export default Adminregister;
