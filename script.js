document.addEventListener("DOMContentLoaded", () => {
  const todo_Input = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const toDoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });

  addTaskBtn.addEventListener("click", () => {
    const taskText = todo_Input.value.trim(); //trim for not considerign the extra spaces
    if (taskText === "") return;

    const newTask = {
      id: Date.now(), //for giving the unique id's in it use date now
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todo_Input.value = ""; //for clearing the input
    console.log(tasks);
  });



  // render means to display the things on the dom
  function renderTask(task) {
    //   console.log(task.text);

    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);   //giving some attribute to li 

    if (task.completed) li.classList.add("completed");  //ek class he style.css me completed me jo add hoga agar hmara task object ka completed true rahega to 
    li.innerHTML = `
    <span>${task.text}</span>
    <button >Delete</button>`;

    li.addEventListener("click",(e)=>{         //if li is clicked then completed class will apply on this we are here avoiding the button clicked 
        if(e.target.tagName==='BUTTON') return;

        task.completed=!task.completed;     //when clicked toggle to true and false and viceversa

        li.classList.toggle('completed');
        saveTask();
    })
    
    
    li.querySelector("button").addEventListener("click",(e)=>{  
     e.stopPropagation();  
    //  method is used to stop the event from propagating (bubbling) up the DOM tree
     tasks=tasks.filter((t) => t.id !== task.id);  // the method we use in array to filter it 
                       // filter out all element and its id should not be equal ot current one as we are deleting 
     li.remove();   // removing the li element
     saveTask();
    })
    toDoList.appendChild(li);   // add it here after adding all li event listeners

   
  }



  
  //function to store in local storage
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //  any name you can use as key        and stringify means convert to strings her this is array
  }
});
