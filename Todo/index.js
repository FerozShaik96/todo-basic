async function registerUser(event) {
  // event.preventDefault();
  const TodoThings = document.getElementById("todo").value;
  const Description = document.getElementById("description").value;
  const myobj = {
    TodoThings,
    Description,
    isCompleleted: false,
  };
  try {
    let res = await axios.post(
      "https://crudcrud.com/api/0e9b428ffb4e4c34bd6c3b3be17de817/todoTasks",
      myobj
    );
  } catch (err) {
    console.log(err);
  }
  showonScreen(myobj);
}
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const windowData = await axios.get(
      "https://crudcrud.com/api/0e9b428ffb4e4c34bd6c3b3be17de817/todoTasks"
    );

    for (let i = 0; i < windowData.data.length; i++) {
      if (windowData.data[i].isCompleleted === "true") {
        //
        taskCompleted(windowData.data[i]);
      } else {
        showonScreen(windowData.data[i]);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
async function showonScreen(myobj) {
  const parentel1 = document.querySelector(".todoThings");
  const parentEl2 = document.querySelector(".todoCompleted");
  const child = document.createElement("li");
  child.textContent = ` ${myobj.TodoThings} --- ${myobj.Description} `;
  parentel1.appendChild(child);
  const completeBtn = document.createElement("input");
  completeBtn.type = "submit";
  completeBtn.value = "✔ ";
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "submit";
  deleteBtn.value = " ❌";
  child.appendChild(completeBtn);
  child.appendChild(deleteBtn);
  completeBtn.onclick = async () => {
    try {
      const delData = await axios.put(
        `https://crudcrud.com/api/0e9b428ffb4e4c34bd6c3b3be17de817/todoTasks/${myobj._id}`,
        {
          TodoThings: `${myobj.TodoThings}`,
          Description: `${myobj.Description}`,
          isCompleleted: `${(myobj.isCompleleted = true)}`,
        }
      );
    } catch (err) {
      console.log(err);
    }
    const getData = await axios.get(
      `https://crudcrud.com/api/0e9b428ffb4e4c34bd6c3b3be17de817/todoTasks/${myobj._id}`
    );
    parentel1.removeChild(child);
    taskCompleted(getData.data);
  };
  deleteBtn.onclick = async () => {
    try {
      const deleteData = await axios.delete(
        `https://crudcrud.com/api/0e9b428ffb4e4c34bd6c3b3be17de817/todoTasks/${myobj._id}`
      );
      parentel1.removeChild(child);
    } catch (err) {
      console.log(err);
    }
  };
}
async function taskCompleted(myobj) {
  const parentEl2 = document.querySelector(".todoCompleted");
  const child = document.createElement("li");
  child.textContent = ` ${myobj.TodoThings} --- ${myobj.Description} `;
  parentEl2.appendChild(child);
}
