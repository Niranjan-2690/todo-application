import { useState } from "react";

function App(){ 
  
  const [todoInput, setTodoInput] = useState([{title: "", description: "", status: "Not completed"}])
  const [todoData, setTodoData] = useState([])
  const [updateTodo, setUpdateTodo] = useState(false)
  const [filterStatus, setFilterStatus] = useState("All");

  function handleTodos(e){
    setTodoInput({...todoInput, [e.target.id]: e.target.value})
  }
  
  //Adding todos.....................
  function todoDatas(){
    const dataCopy = [...todoData] // Create a copy of the existing list
    dataCopy.push({...todoInput, id: new Date().getTime()}) // Push the new item into the copied list
    setTodoData(dataCopy); // Update the state with the modified list
    setTodoInput({title: "", description: "", status: "Not completed"}); // Reset the input fields
  }

  //Edit todos..........................
  function handleEditTodo(id = 0){
    setUpdateTodo(true)
    const cardCopy = [...todoData] // Create a copy of the modified list
    setTodoInput(cardCopy.find((item)=>item.id === id )) // push to the initial state for update
  }

  //Update todo............
 function handleUpdateTodo(data={}){
  let tododataCopy = [...todoData].filter((item)=>item.id !== data.id)
  tododataCopy.push(data)
  setTodoData(tododataCopy)
 }

 //Delete todo................
 function handleDeleteTodo(id = 0){
    const cardCopy = [...todoData].filter((item)=>item.id !== id) 
    setTodoData(cardCopy)
 }

 // Handle status filter change
 function handleFilterChange(e) {
  setFilterStatus(e.target.value);
}

// Handle status change for a specific todo
function handleFilterStatusChange(e, id) {
  const updatedTodoStatus = todoData.map((item) =>
    item.id === id ? {...item, status: e.target.value} : item
  );
  setTodoData(updatedTodoStatus);
}

// Filtered todo list
const filteredTodos = todoData.filter((item) => {
  if (filterStatus === "All") return true;
  return item.status === filterStatus;
});

  return <div>
          <div className="todo-app">
            <h1>Todo Application</h1>
            <div className="todo-inputs">
              <input type="text" placeholder="Todo name" id= "title" value={todoInput.title} onChange={handleTodos}/>
              <input type="text" placeholder="Todo description" id= "description" value={todoInput.description} onChange={handleTodos}/>
              {!updateTodo ? <button onClick={todoDatas}>Add item</button> : <button onClick={()=>{handleUpdateTodo(todoInput), setUpdateTodo(false), setTodoInput({title: "", description: "", status: "Not completed"})}}>Update item</button>}
            </div>
          </div>
          <div className="todo-heading">
            <h1>My Todos List</h1>
            <div className="todo">
              <label>Status: </label>
              <select onChange={handleFilterChange} value={filterStatus}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not completed">Not completed</option>
              </select>
            </div>
          </div>
          {filteredTodos.map((data, index)=>(
              <div className="todo-contents" key={`${data} - ${index}`}>
                <div className="todo-inputcontents">
                  <h3>Title: {data.title}</h3>
                  <h4>Description: {data.description}</h4>
                      <div className="todo-status">
                        <label>Status:</label>
                        <select value={data.status} onChange={(e) => handleFilterStatusChange(e, data.id)}>
                          <option value="Not completed">Not completed</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                </div>
                <div className="btn">
                  <button className="btnedit" onClick={()=>handleEditTodo(data.id)}>Edit</button>
                  <button className="btndelete" onClick={()=>handleDeleteTodo(data.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
}

export default App;