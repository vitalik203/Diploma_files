import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./App.scss";
const socket = io("https://server-for-diplom-v2.onrender.com"); // або localhost:5000 для локального запуску

function App() {
  const [joints, setJoints] = useState([0, 0, 0, 0, 0]);

  // const [closePage, setClosePage] = useState(false);
  const [onlineUser, setOnlineUser] = useState(false);

  const loginStr = useRef(null);
  const passwordStr = useRef(null);
  const formCoverRef = useRef(null);
  const buttonSendRef = useRef(null);

  const dataRef = useRef(null);
  // useEffect(() => {
  //   window.addEventListener("pagehide", () => {
  //     setClosePage(true);
  //   });
  // });

  // Оновлення локального стану і надсилання на сервер
  const updateJoint = (index, delta) => {
    const newJoints = [...joints];
    newJoints[index] += delta;

    setJoints(newJoints);
    socket.emit("update-joints", newJoints);
  };

  useEffect(() => {
    if (buttonSendRef.current) {
      buttonSendRef.current.disabled = onlineUser;
    }
  }, [onlineUser]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      loginStr.current?.value.trim() === "Admin" &&
      passwordStr.current?.value.trim() === "Admin123"
    ) {
      loginStr.current.style.border = "3px solid lightgreen";
      passwordStr.current.style.border = "3px solid lightgreen";
      setTimeout(() => {
        formCoverRef.current?.classList.add("hidden");
        dataRef.current?.classList.remove("hidden");
        if (loginStr.current) loginStr.current.value = "";
        if (passwordStr.current) passwordStr.current.value = "";
        setOnlineUser(true);
      }, 1500);
    } else {
      loginStr.current.style.border = "3px solid red";
      passwordStr.current.style.border = "3px solid red";
      return;
    }
  }

  useEffect(() => {
    // Слухати поточний стан з сервера
    socket.on("robot-state", (state) => {
      if (state.joints) {
        setJoints(state.joints);
      }
    });

    return () => {
      socket.off("robot-state");
    };
  }, []);

  return (
    <>
      <div ref={formCoverRef} className="form_cover">
        <form onSubmit={handleSubmit} className="valid_form">
          <label>
            Login
            <input ref={loginStr} name="loginStr" type="text" />
          </label>
          <label>
            Password
            <input ref={passwordStr} name="passwordStr" type="password" />
          </label>
          <button ref={buttonSendRef}>Enter room!</button>
        </form>
      </div>
      <div ref={dataRef} className="data_wrapper hidden">
        <h1 className="text-2xl font-bold mb-6">RON's Controller</h1>
        {["Основа", "Плече1", "Плече2", "Плече3", "Плече4"].map(
          (label, idx) => (
            <div key={idx} className="controll_el_wrapper">
              <span className="controll_el_title">{label}</span>
              <button
                onClick={() => updateJoint(idx, -Math.PI / 18)}
                className="controll_el_btn"
              >
                -
              </button>
              <span className="controll_el_value">
                {Number(joints[idx]).toFixed(2)} rad
              </span>
              <button
                onClick={() => updateJoint(idx, Math.PI / 18)}
                className="controll_el_btn"
              >
                +
              </button>
            </div>
          )
        )}
        ©2025 Department of Intelligent Mechatronics and Robotics <br />
        Developed by Zaluskii Vitalii <br />
        All rights reserved
      </div>
    </>
  );
}

export default App;
