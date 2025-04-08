import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
function Crud() {
  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const handlesubmit = async ()=>{
    const data = {name:name,email:email,password:password}
    const response  = await axios.post("http://localhost:5000/create",data);
    getDataFromBackend()
    setname("")
    setemail("")
    setpassword("")
  }

  const [result,setresult] = useState([])
  useEffect(()=>{
      getDataFromBackend()
  },[])

  const getDataFromBackend = async()=>{
      const response = await axios.get("http://localhost:5000/read")
      const result = response.data
      setresult(result)
  }
  const deleteThisRow = async (id)=>{
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      getDataFromBackend()
  }
  const updateThisRow = async(item)=>{
    setname(item.name)
    setemail(item.email)
    setpassword(item.password)


  }

  return (
    <div>
      <h1>C for CREATE</h1>
        <label>Enter Name</label>
        <input value={name} type='text' onChange={(e)=>setname(e.target.value)}></input>
        <br></br>
        <label>Enter email</label>
        <input value={email} type='email' onChange={(e)=>setemail(e.target.value)}></input>
        <br></br>
        <label>Enter password</label>
        <input value={password} type='password' onChange={(e)=>setpassword(e.target.value)}></input>
        <br></br>
        <button onClick={handlesubmit}>submit</button>
        
      <div>
        <h1>READ</h1>
        <table border="1">
            <thead>

            <tr>
                <th>
                    NAME
                </th>
                <th>
                    EMAIL
                </th>
                <th>
                    PASSWORD
                </th>
                <th>
                    ID
                </th>
                <th>
                    UPDATE
                </th>
                <th>
                    DELETE
                </th>
            </tr>
            </thead>
            <tbody>

        {
            result.map((item,index)=>(
                <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item._id}</td>
                <td><button onClick={()=>updateThisRow(item)}>update</button></td>
                <td><button onClick={()=>deleteThisRow(item._id)}>delete</button></td>
                </tr>
            ))
        }
        </tbody>
        </table>
    </div>
    </div>
  )
}

export default Crud;