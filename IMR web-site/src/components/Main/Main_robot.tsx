import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import io from "socket.io-client";
import "react-responsive-modal/styles.css";
import Modal_window from "./Modal_window";

//Multylanguage
import ua from "../translations/ua.json";
import en from "../translations/en.json";

import QR from "../img-components/Controller_QR.svg";

const socket = io("https://server-for-diplom-v2.onrender.com");

type Target = { x: number; y: number };
type Joints = [number, number, number, number, number];
type RobotState = {
  baseAngle: number;
  joints: Joints;
  gripperOpen: boolean;
};

function Start() {
  return (
    <mesh position={[0, -0.2, 0]}>
      <cylinderGeometry args={[1, 1, 0.2, 52]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function Base() {
  return (
    <mesh position={[0, -0.1, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

function Joint() {
  return (
    <mesh>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function Link({ length = 1 }: { length?: number }) {
  return (
    <mesh position={[0, length / 2, 0]}>
      <boxGeometry args={[0.2, length, 0.2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Gripper({ isOpen = true }: { isOpen?: boolean }) {
  const offset = isOpen ? 0.15 : 0.05;
  return (
    <group>
      <mesh position={[-offset, 0.15, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <mesh position={[offset, 0.15, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </group>
  );
}

function solveIK(target: Target, l1: number, l2: number): Joints {
  const x = target.x;
  const y = target.y;

  const r = Math.sqrt(x * x + y * y);
  const maxReach = l1 + l2;
  const minReach = Math.abs(l1 - l2);
  const clampedR = Math.max(minReach, Math.min(maxReach, r));

  const cosAngle2 = (clampedR * clampedR - l1 * l1 * l2 * l2) / (2 * l1 * l2);
  const angle2 = Math.acos(Math.max(-1, Math.min(1, cosAngle2)));

  const k1 = l1 + l2 * Math.cos(angle2);
  const k2 = l2 * Math.sin(angle2);
  const angle1 = Math.atan2(y, x) - Math.atan2(k2, k1);

  const angle3 = 0;

  return [angle1, angle2, angle3, 0, 0];
}

function RobotModel({
  // baseAngle,
  joints,
  gripperOpen,
}: {
  baseAngle: number;
  joints: Joints;
  gripperOpen: boolean;
}) {
  const joint1 = useRef<THREE.Group>(null);
  const joint2 = useRef<THREE.Group>(null);
  const joint3 = useRef<THREE.Group>(null);
  const joint4 = useRef<THREE.Group>(null);
  const joint5 = useRef<THREE.Group>(null);
  const gripper = useRef<THREE.Group>(null);

  useFrame(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const speed = 0.05;
    if (joint1.current) {
      joint1.current.rotation.y = lerp(
        joint1.current.rotation.y,
        joints[0],
        speed
      );
    }
    if (joint2.current) {
      joint2.current.rotation.z = lerp(
        joint2.current.rotation.z,
        joints[1],
        speed
      );
    }
    if (joint3.current) {
      joint3.current.rotation.z = lerp(
        joint3.current.rotation.z,
        joints[2],
        speed
      );
    }
    if (joint4.current) {
      joint4.current.rotation.z = lerp(
        joint4.current.rotation.z,
        joints[3],
        speed
      );
    }
    if (joint5.current) {
      joint5.current.rotation.y = lerp(
        joint5.current.rotation.y,
        joints[4],
        speed
      );
    }
  });

  return (
    <>
      {/* <div style={{ position: "absolute", zIndex: "10000" }}>
        <button onClick={onOpenModal}>Open modal</button>
        <Modal open={open} onClose={onCloseModal} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div> */}
      <group>
        <Start />
        <group ref={joint1}>
          <Base />
          <group ref={joint2}>
            <Joint />
            <Link length={1} />
            <group position={[0, 1, 0]} ref={joint3}>
              <Joint />
              <Link length={1} />
              <group position={[0, 1, 0]} ref={joint4}>
                <Joint />
                <Link length={0.5} />
                <group position={[0, 0.5, 0]} ref={joint5}>
                  <Joint />
                  <Link length={0.5} />
                  <group position={[0, 0.5, 0]} ref={gripper}>
                    <Joint />
                    <Gripper isOpen={gripperOpen} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

interface ForMain_robot {
  language: string;
}

export default function Main_robot({ language }: ForMain_robot) {
  const scene_ref = useRef<HTMLDivElement>(null);
  const loginStr = useRef<HTMLInputElement>(null);
  const passwordStr = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [robotState, setRobotState] = useState<RobotState>({
    baseAngle: 0,
    joints: [0, 0, 0, 0, 0],
    gripperOpen: true,
  });

  useEffect(() => {
    socket.on("robot-state", (state: any) => {
      console.log("📦 Отримано новий стан:", state);
      setRobotState((prev) => ({
        ...prev,
        baseAngle: state.baseAngle || prev.baseAngle,
        joints: state.joints || prev.joints,
        gripperOpen:
          state.gripperOpen !== undefined
            ? state.gripperOpen
            : prev.gripperOpen,
      }));
    });
    return () => {
      socket.off("robot-state");
    };
  }, []);

  const handleCanvasClick = (event: any) => {
    const rect = event.target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const mouse = new THREE.Vector2(x, y);

    // Отримати камеру
    const camera = event.target.__reactThreeFiber?.camera;
    if (!camera) return;

    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera); // Проекція у світовий простір

    // Проекція в площину X-Y (обнулити Z)
    const target = { x: vector.x, y: vector.y };

    const newJoints = solveIK(target, 1, 1);
    const newState = {
      ...robotState,
      joints: newJoints,
    };

    setRobotState(newState);
    socket.emit("update-robot-state", newState);
  };

  function handleSubmit(e: any) {
    e.preventDefault();

    if (
      loginStr.current?.value.trim() === "Admin" &&
      passwordStr.current?.value.trim() === "Admin123"
    ) {
      loginStr.current!.style.border = "3px solid lightgreen";
      passwordStr.current!.style.border = "3px solid lightgreen";
      setTimeout(() => {
        scene_ref.current?.classList.remove("hidden");
        formRef.current?.classList.add("hidden");
        if (loginStr.current) loginStr.current.value = "";
        if (passwordStr.current) passwordStr.current.value = "";
      }, 1000);
    } else {
      loginStr.current!.style.border = "3px solid red";
      passwordStr.current!.style.border = "3px solid red";
      return;
    }
  }

  function handleLogOut() {
    setTimeout(() => {
      scene_ref.current?.classList.add("hidden");
      formRef.current?.classList.remove("hidden");
      if (loginStr.current) loginStr.current.value = "";
      if (passwordStr.current) passwordStr.current.value = "";
    }, 1000);
  }

  return (
    <>
      <div>
        <Modal_window
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="RON's Controller"
          language={language}
        >
          <img className="QR" src={QR} alt="QR-code to controller" />
          <span className="hr-modal"></span>

          <a
            href="https://imr-controller-app.vercel.app/"
            className="instead_qr_link"
            target="_blank"
          >
            <span className="instead_qr_link_cover">
              Open RON's Controller{" "}
            </span>
          </a>
        </Modal_window>
      </div>
      <div className="form_cover">
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            zIndex: "200",
            margin: "10px 0 10px 10px",
          }}
        >
          {language === "ua"
            ? ua.main.login.linkToController
            : en.main.login.linkToController}
        </button>
        <form ref={formRef} onSubmit={handleSubmit} className="valid_form">
          <label>
            Login
            <input ref={loginStr} name="loginSr" type="text" />
          </label>
          <label>
            Password
            <input ref={passwordStr} name="passwordStr" type="password" />
          </label>
          <button>Enter room!</button>
        </form>
      </div>
      <div ref={scene_ref} className="hidden">
        <span
          style={{
            fontSize: "28px",
            textAlign: "center",
            backgroundColor: "yellowgreen",
            display: "block",
            margin: "0 auto",
          }}
        >
          WELCOME TO 3D SCENE WITH VIRTUAL ROBOT <strong>"RON"</strong> HAND
          MANIPULATOR{" "}
          <button className="logOut_btn" onClick={handleLogOut}>
            Log out
          </button>
        </span>
        <Canvas
          style={{
            width: "100%",
            height: "1000px",
            backgroundColor: "lightblue",
          }}
          onClick={handleCanvasClick}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <PerspectiveCamera makeDefault position={[7, 3, 3]} />
          <OrbitControls />
          <RobotModel
            baseAngle={robotState.baseAngle}
            joints={robotState.joints}
            gripperOpen={robotState.gripperOpen}
          />
        </Canvas>
      </div>
    </>
  );
}
