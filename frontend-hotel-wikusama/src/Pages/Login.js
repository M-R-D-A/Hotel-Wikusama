import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [nameUser, setNameUser] = useState("");
  const [password, setPassword] = useState("");
  const ctx = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(nameUser.data);
    console.log(password.data); 
    axios
      .post("http://localhost:8080/store/user/auth", {
        name_user: nameUser.data,
        password: password.data
      })
      .then((res) => {
        console.log(res.data.data.role);
        var data = res.data.data;
        if(data) {
          ctx.onLogin(data.name_user, data.password, data.role)
        }
        if(data.role === 'resepsionis'){
          window.location.href = '/resp';
        } else {
          window.location.href = '/admin';
        }
      })
      .catch((err) => {
        console.log('gagal');
        console.log(err.message);
      });
  };

  let column = "flex flex-wrap -mx-3 mb-6";

  return (
    <div className="p-10 justify-cneter flex items-center gap-10">
      <div className="container p-10 shadow-lg rounded-xl border-2 w-2/4">
        <form>
          <div className={column}>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700
            text-xs font-bold mb-2"
              >
                Nama
              </label>
              <input
                className="appearance-none block w-full bg-gray-200
                text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Nama"
                onChange={(ev) => setNameUser({ data: ev.target.value })}
              ></input>
            </div>
          </div>
          <div className={column}>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700
            text-xs font-bold mb-2"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200
                text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="password"
                placeholder="Password"
                onChange={(ev) => setPassword({ data: ev.target.value })}
              ></input>
            </div>
          </div>
          <button
                className="rounded-xl p-4 text-white  bg-green-500"
                onClick={handleSubmit}
              >
                submit
              </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
