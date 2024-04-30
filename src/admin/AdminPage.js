import { useState } from "react";
import CreateUser from "./CreateUser";

function AdminPage() {
  const [adduser, setadduser] = useState(false);

  return (
    <div>
      <button onClick={() => setadduser(!adduser)}>
        {!adduser ? "ADDUSER➕" : "Close❌"}
      </button>
      {adduser ? <CreateUser /> : ""}
    </div>
  );
}

export default AdminPage;
