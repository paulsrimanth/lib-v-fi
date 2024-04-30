import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Adminregister from "./admin/Adminregister";
function PowerPage() {
  const [token, Settoken] = useState("");
  const [adduserclick, setAdduserclick] = useState(false);
  const [gemail, setemail] = useState("");
  const [poweruserid, Setpoweruserid] = useState("");
  const [data, Setdata] = useState([]);
  function GetToken() {
    console.log("decoding");
    const decodedjwt = jwtDecode(localStorage.getItem("token")).sub;
    setemail(decodedjwt);
    console.log(localStorage.getItem("token"));
    Settoken(localStorage.getItem("token"));
    console.log("jwtdecoded:" + jwtDecode(localStorage.getItem("token")).sub);
    //setemail(jwtDecode(localStorage.getItem("token")).sub);
    setemail(decodedjwt);
    console.log(gemail);
    getpower();
  }
  const poweruserbody = {
    email: gemail,
  };
  const adminsbody = {
    id: poweruserid,
  };
  async function getpower() {
    //api call
    const powerdata = await fetch("http://localhost:8080/getpowerdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Authorization, Cache-Control,Content-Type",
        AllowCredentials: "true",
        ExposedHeaders: "Authorization",
      },
      body: JSON.stringify(poweruserbody),
    });
    const res = await powerdata.json();
    console.log(res);
    console.log(res.id);
    const resid = res.id;
    const sresid = res.id + "";
    console.log(typeof (resid + ""));
    console.log(resid + "");
    Setpoweruserid(sresid);
    console.log(poweruserid);
    //console.log(res);
    // console.log(powerdata.json().stringify());
    // powerdata.json().then((res) => console.log(res));
  }
  async function DisplayAdmins() {
    const admins = await fetch("http://localhost:8080/getadmins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Authorization, Cache-Control,Content-Type",
        AllowCredentials: "true",
        ExposedHeaders: "Authorization",
      },
      body: JSON.stringify(adminsbody),
    });
    const gotadmins = await admins.json();
    //console.log(data);
    Setdata(gotadmins);
    //console.log(admins);
    // console.log(admins);
    console.log(gotadmins);
    // Setdata(gotadmins);
    //console.log(gotadmins);
    //console.log(data);
  }

  return (
    <>
      <div>
        <div>HELLO user</div>
        <div>
          <button onClick={() => setAdduserclick(!adduserclick)}>
            ADD ADMIN
          </button>
        </div>
        <div>
          <button>ADD USER</button>
        </div>
        <div>
          {adduserclick ? (
            <Adminregister
              adduserclick={adduserclick}
              poweruserid={poweruserid}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <button onClick={() => GetToken()}>get token</button>
        </div>
        <div>
          <button onClick={() => DisplayAdmins()}>GET ADMINS</button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>firstname</th>
              <th>lastname</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.aid}>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </>
  );
}

export default PowerPage;
