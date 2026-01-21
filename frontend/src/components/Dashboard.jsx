import { useState , useEffect } from "react";
import {useNavigate} from "react-router-dom";
import toast , {Toaster} from "react-hot-toast";

function Dashboard() {

  const navigate = useNavigate();

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [status , setStatus] = useState("pending");
  const [priority , setPriority] = useState("low");
  const [dueDate , setDueDate] = useState("");
  const [tasks , setTasks] = useState([]);
  const [isEditing , setIsEditing] = useState(false);
  const [editID , setEditID] = useState(null);
  const [editTitle , setEditTitle] = useState("");
  const [editDescription , setEditDescription] = useState("");
  const [editStatus , setEditStatus] = useState("pending");
  const [editPriority , setEditPriority] = useState("low");
  const [editDueDate , setEditDueDate] = useState("");
  const [search , setSearch] = useState("");
  const [filterStatus , setFilterStatus] = useState("");
  const [filterPriority , setFilterPriority] = useState("");
  const [fromDate , setFromDate] = useState("");
  const [toDate , setToDate] = useState("");
  const [sortBy , setSortBy] = useState("");
  const [order , setOrder] = useState("asc");
  const [page , setPage] = useState(1);
  const [limit , setLimit] = useState(5);
  const [totalPages , setTotalPages] = useState(1);
  const [deletingTaskId , setDeletingTaskId] = useState(null);

 useEffect(() => {
  fetchTasks();
}, [page]);

useEffect(() => {
  if (page !== 1) {
    setPage(1);
  } else {
    fetchTasks();
  }
}, [search, filterStatus, filterPriority, fromDate, toDate, sortBy, order]);



  const ChangeTitle = (e) => {
    isEditing ? setEditTitle(e.target.value) :
    setTitle(e.target.value);
  }

  const ChangeDesciption = (e) => {
    isEditing ? setEditDescription(e.target.value) :
    setDescription(e.target.value);
  }

  const ChangeStatus = (e) => {
    isEditing ? setEditStatus(e.target.value) : 
    setStatus(e.target.value);
  }

  const ChangePriority = (e) => {
    isEditing ? setEditPriority(e.target.value) : 
    setPriority(e.target.value);
  }

  const ChangeDueDate = (e) => {
    isEditing ? setEditDueDate(e.target.value) :
    setDueDate(e.target.value);
  }

  const fetchTasks = async () => {

    let query = [];

    if(search) query.push(`title=${search}`);
    if(filterStatus) query.push(`status=${filterStatus}`);
    if(filterPriority) query.push(`priority=${filterPriority}`);
    if(fromDate) query.push(`fromDate=${fromDate}`);
    if(toDate) query.push(`toDate=${toDate}`);
    if(sortBy) query.push(`sortBy=${sortBy}`);
    if(order) query.push(`order=${order}`);
    query.push(`page=${page}`);
    query.push(`limit=${limit}`);

    const response = await fetch(`http://localhost:3000/api/tasks?${query.join("&")}`, {
      headers : {
         "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    });
    const result = await response.json();
    setTasks(result?.tasks);
    setTotalPages(result?.meta?.totalPages || 1);

    
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try{

    const res = await fetch('http://localhost:3000/api/tasks' , {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body : JSON.stringify({
        task : {
         title,
         description,
         status,
         priority,
         dueDate 
        }
      }),
    });

    const data = await res.json();

    toast.success("A new task was added" , {
      duration : 3000
    });

    setTitle("");
    setDescription("");
    setStatus("pending");
    setPriority("low");
    setDueDate("");

    fetchTasks();

  }

  catch {
    toast.error("there was some problem adding the task",
      {
        duration : 3000
      }
    )
  }
    
  }

  async function HandleDelete(taskId) {

    const confirm = window.confirm("Do you really want to delete the task ?");

    if(confirm) {

      setDeletingTaskId(taskId);
    
    try {

    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}` , {
      method : "DELETE",
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      } 
    });

    const data = await response.json();
   

    if(response.ok){
      setTasks(tasks.filter((task) => {
        return task._id !== taskId
      }));
    }


    toast('your task was deleted' , {
      duration : 4000,
      position : 'top-center',
      icon : '👍'
    });
  }
  catch{
    toast.error("There was some problem deleting your task" , {
      duration : 3000
    });
    setDeletingTaskId(null);
  }
    

  }
  }


 const HandleEdit = (task) => {
  setEditID(task._id);
  setEditTitle(task.title);
  setEditDescription(task.description);
  setEditStatus(task.status);
  setEditPriority(task.priority);
  setEditDueDate(task.dueDate?.split("T")[0]);
 setIsEditing(true);



 }
  
 

 const HandleUpdateTask = async (e) => {
  e.preventDefault();

  try {

  if(isEditing === true) {
     const editTask = {
        title : editTitle,
        description : editDescription,
        status : editStatus,
        priority : editPriority,
        dueDate : editDueDate
    }
    const res = await fetch(`http://localhost:3000/api/tasks/${editID}`,{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
         "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body : JSON.stringify({
        task : editTask
      })
    });

    fetchTasks();
    
    setEditTitle("");
    setEditDescription("");
    setEditStatus("pending");
    setEditPriority("low");
    setEditDueDate("");
    setIsEditing(false);

    toast.success("The task was updated",
      {
        duration : 3000
      }
    );

  }
}

catch{

  toast.error("There was an error updating the task" ,
    {
      duration : 3000
    }
  )

}

 }

 function HandleLogOut() {
  localStorage.removeItem('token');
  navigate("/login" , {replace : true});
  
 };


  return(
    <>
    <Toaster/>
   <div>
    <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800 px-6 pt-8 pb-4">Task Manager</h1>
         <button
      onClick={HandleLogOut}
      className="px-8  bg-red-500 hover:bg-red-600 text-white rounded-md max-h-12 mt-6 cursor-pointer "
    >
      Logout
    </button>
</div>
        {/* Form Section */}
        <div className="max-w-full">
        <form className="max-w-6xl mx-auto px-6 py-8 border-b border-gray-200" onSubmit={isEditing ? HandleUpdateTask : HandleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={isEditing ? editTitle : title}
                onChange={ChangeTitle}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={isEditing ? editDescription : description}
                onChange={ChangeDesciption}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white cursor-pointer"
                value={isEditing ? editStatus : status}
                onChange={ChangeStatus}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white cursor-pointer"
                value={isEditing ? editPriority : priority}
                onChange={ChangePriority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={isEditing ? editDueDate : dueDate}
                onChange={ChangeDueDate}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                {isEditing ? "Edit Task" : "Add Task"}
              </button>
            </div>
          </div>
        </form>
</div>
    {/* Filter Priority */}
<div className="max-w-full">
  <div className="grid grid-cols-12">
  <div className="col-span-2">  
  <form className="max-w-sm mx-auto">
    <label htmlFor="priority" className="block mb-2.5 text-sm font-medium text-heading">Filter by priority</label>
    <select id="priority" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 border-default-medium rounded-md text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
    <option defaultValue="">Select Priority</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
    </select>
  </form>
  </div>
      
      {/* search */}
  <div className="col-span-8">
<form className="max-w-md mx-auto" >   
    <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div className="relative top-6 mb-10">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input type="search" id="search" className="block w-full p-3 ps-9 border-gray-300 rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required  value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button type="button" className=" bg-blue-600 hover:bg-blue-800 active:translate-y-0.5 absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none cursor-pointer">Search</button>
    </div>
</form>
</div>
{/* filter status */}
  <div className="col-span-2">
  <form className="max-w-sm mx-auto">
    <label htmlFor="status" className="block mb-2.5 text-sm font-medium text-heading">Filter by Status</label>
    <select id="status" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 rounded-md border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
    <option defaultValue="">Select Status</option>
    <option value="pending">pending</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
    </select>
</form>
</div>
</div>
<div className="grid grid-cols-12 gap-2">
{/* From Date */}

           <div className="flex flex-col col-span-3">
              <label htmlFor="fromDate" className="block mb-2.5 text-sm font-medium text-heading">From Date</label>
              <input
                id="fromDate"
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

{/* To Date  */}

            <div className="flex flex-col col-span-3">
              <label htmlFor="toDate" className="block mb-2.5 text-sm font-medium text-heading">To Date</label>
              <input
                id="toDate"
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

    {/* sort by */}
      <div className="col-span-3">
      <form className="max-w-sm mx-auto">
        <label htmlFor="sortBy" className="block mb-2.5 text-sm font-medium text-heading">Sort By</label>
        <select id="sortBy" className="block w-full border-gray-300 rounded-md px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option defaultValue="">Select Sort By</option>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="status">Status</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
        </select>
      </form>
      </div>

      {/* order */}
      <div className="col-span-3">
       <form className="max-w-sm mx-auto">
        <label htmlFor="order" className="block mb-2.5 text-sm font-medium text-heading">Order</label>
        <select id="order" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 rounded-md border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
        </select>
      </form>
      </div>
</div>
</div>
    {/* table */}

        <div className="max-w-6xl mx-auto px-6 py-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">All Tasks</h2>
  
  {tasks.length === 0 ? (
    <div className="text-center py-8 text-gray-600">No tasks yet. Add your first task above!</div>
  ) : (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Edit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Delete</th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap capitalize text-sm font-medium text-gray-900">{task.title}</td>
              <td className="px-6 py-4 text-sm capitalize text-gray-700">{task.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 capitalize inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${task.status === 'completed' ? 'bg-green-100 text-green-800 min-w-2.5' : 
                    task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 min-w-2.5' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {task.status === "in_progress" ? "In Progress" : task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 capitalize inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                    task.priority === 'medium' ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => HandleEdit(task)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Edit</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                      <button disabled={deletingTaskId === task._id} onClick={() => HandleDelete(task._id)} className= { deletingTaskId === task._id ? "bg-red-400 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed" :"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"}>Delete</button> 
                      
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


    {/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center gap-2 mt-6">
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="px-4 py-2 bg-white border rounded disabled:opacity-50"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`px-4 py-2 rounded ${
          page === i + 1 
            ? 'bg-blue-600 text-white' 
            : 'bg-white border'
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
      className="px-4 py-2 bg-white border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}

      </div>
    </>
  );
}

export default Dashboard;