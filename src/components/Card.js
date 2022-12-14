import React, { useEffect, useRef, useState } from "react";
import EditTask from "../modals/EditTask";

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);
  const [countdown, setCountdown] = useState(15)
  const [check, setCheck] = useState(false)
  const [done, setDone] = useState(false)
  const timerId = useRef()
  console.log(done);
  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown(p => p - 1)
    },1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(()=> {
    if(countdown <= 0){
      clearInterval(timerId.current)
      setCheck(true)
    }
  })

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    if (window.confirm("do you want to delete?")) {
      deleteTask(index);
    } else {
      return;
    }
  };

  return (
    <div class="card-wrapper mr-5">
      <div
        class="card-top"
        style={{ "background-color": colors[index % 5].primaryColor }}
      ></div>
      <div class="task-holder">
        <span
          class="card-header"
          style={{
            "background-color": colors[index % 5].secondaryColor,
            "border-radius": "10px",
          }}
        >
          {taskObj.Name}
        </span>
        <p className="mt-3">{taskObj.Description}</p>
        <p>{taskObj.date}</p>
        <span>{taskObj.time}</span>
        {
          check ? <span>Time has expired</span>:<span>{countdown}</span>
        }

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <input style={{marginRight:"10px"}} type={"checkbox"} onChange={() => setDone(!done)}/>
          {
            done ?
            null
            :
            <i
            class="far fa-edit mr-3"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>
          }
          <i
            class="fas fa-trash-alt"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
