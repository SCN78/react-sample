import React, { useEffect, useRef, useState } from 'react'
import OrderService from '../services/OrderService'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../styles/Orders.css'
import { Input } from '@mui/material';

export default function Orders() {   
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter,setFilter] = useState('');
  const[orderList,setOrders] = useState([])
  const[disorderList,setDispOrders] = useState([])
  const [inputName,setInputName] = useState('')
  const [inputumber,setInputumber] = useState('')
  const columns = [
      "OrderID","CustomerName","CustomerNumber","OrderFromBranch","OrderNetCost"
  ]  

  const filterByNumber = (e) =>{
    setInputName('')
    setInputumber(e.target.value)
    if(e.target.value.length > 0){
      const _orders = orderList.filter((o)=> o.CustomerNumber.includes(e.target.value))
      setDispOrders(_orders)      
    } 
    else{
      setDispOrders(orderList) 
    }     
  }

  const filterByName = (e) =>{
    setInputumber('')
    setInputName(e.target.value)
    if(e.target.value.length > 0){
      const _orders = orderList.filter((o)=> o.CustomerName.includes(e.target.value))
      setDispOrders(_orders)      
    } 
    else{
      setDispOrders(orderList) 
    }     
  }

  const handleChangePage = (event,newPage) => {
    console.log(event)
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => { 
    setRowsPerPage(event.target.value);
    setPage(0);
  };
   
    useEffect(() => {   
      const getOrders =   async ()=>{
        const ord = await OrderService.getOrders()
        convertKeyObject(ord)
      }
      getOrders()       
       
     }, []);    
    const fetchOrders = async () =>{      
      const ord = await OrderService.getOrders()//.then((res)=>{console.log(res)})
      convertKeyObject(ord)
    }
    const convertKeyObject = (data)=>{
      let rowsList = []
      Object.entries(data).forEach(([key, value]) => {
        rowsList.push(
              {               
                "OrderID":key,
                "CustomerName":value.CustomerName,
                "CustomerNumber":value.CustomerNumber,
                "OrderFromBranch":value.OrderFromBranch,               
                "OrderNetCost":value.OrderNetCost
              })      
          })        
          setOrders(rowsList) 
          setDispOrders(rowsList)
    }
  return (    
    <div style={{padding:'20px'}}>
      <div className='searchdiv' style={{border:'1px solid black',minHeight:'50px',marginbottom:'20px'}}>
      <Input className='col-md-6' placeholder="Customer Name" value={inputName} onChange={filterByName}/>
      <Input className='col-md-6' placeholder="Customer Number" value={inputumber}  onChange={filterByNumber} />
      </div>
      <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" className='ordertable altercolor'>
              <TableHead>
                <TableRow >
                  {columns.map((column, index) => (
                    <TableCell key={index} style={{backgroundcolor:'red'}}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>                
                {disorderList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {Object.entries(row).map((e, index) => {
                          return (
                            <TableCell key={index}>
                              {e[1]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={disorderList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  )
}
