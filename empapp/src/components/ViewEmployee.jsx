
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddEmployee from './AddEmployee'

const ViewEmployee = () => {
    var [users,setUsers] = useState([])
    var [update,setUpdate]= useState(false)
    var [singleValue,setsingleValue] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3005/view")
        .then((res)=>{
            console.log(res.data)
            setUsers(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    const deleteValue=(id)=>{
        console.log(id)
        axios.delete("http://localhost:3005/remove/"+id).
        then((response)=>{
          alert(response.data)
          window.location.reload(false)
        }).catch((err)=>console.log(err))
    }


    const updateValues=(val)=>{
        console.log("Update")
        setUpdate(true)
        setsingleValue(val)
    }
    
// setUpdate(true):
// This sets the update state variable to true.
// The update state controls whether the component should display the update form (AddEmployee) instead of the employee list.
// When update is true, the component conditionally renders the AddEmployee component to allow the user to edit the selected employee's information.
// Setting Single Value:

// setSingleValue(val):
// This sets the singleValue state variable to the data of the employee that needs to be updated.
// val is the employee object containing details such as name, age, position, and salary.
// This data is passed to the AddEmployee component so that the form can be pre-filled with the current details of the employee.

    var finalJSX =  <TableContainer style={{paddingTop:"80px"}}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Employee_Name</TableCell>
                <TableCell>Employee_Age</TableCell>
                <TableCell>Employee_Position</TableCell>
                <TableCell>Employee_Salary</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {users.map((val,i)=>{
                return(
                    <TableRow>
                        <TableCell>{val.ename}</TableCell>
                        <TableCell>{val.eage}</TableCell>
                        <TableCell>{val.eposition}</TableCell>
                        <TableCell>{val.esalary}</TableCell>
                        <TableCell>
                        <Button
                        onClick={()=>updateValues(val)}  //updateValues(val) ensures that the updateValues function is called with the correct val parameter when the button is clicked.
                        size="small" 
                        variant='contained' 
                        color='warning'>
                        Update
                        </Button>
                        &nbsp; &nbsp;
                        <Button 
                        onClick={()=>deleteValue(val._id)} 
                        size="small" 
                        variant='contained' 
                        color='secondary'>
                        Delete
                        </Button>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    </Table>
    </TableContainer>
    if(update) finalJSX = <AddEmployee data={singleValue} method = 'put'/>

  return finalJSX
  
}

export default ViewEmployee








