import React, { useEffect, useState } from 'react'
import MainContent from "./MainContent";
import LeftPanel from "./LeftPanel";
import  "../styles/DashBoard.css"


export default function DashBoard() {
  const [sideMenuItems, setMenuState] = useState([
    {name:"Home",class:"active", id:1},   
    {name:"Estimations",class:"inactive", id:2},
    {name:"Orders",class:"inactive", id:3},
    {name:"Deliveries",class:"inactive", id:4},
    {name:"Payments",class:"inactive", id:5}
    
  ])
  const handleMenuClick = (item) => {
    console.log(item)
    const items = sideMenuItems.map((elem) =>{
      if(elem.id === item.id){ elem.class = 'active';return elem}
      else{elem.class = 'inactive';return elem}      
    });   
    setMenuState(items)
  }
  useEffect(()=>{

  },[sideMenuItems])
  return (
    <div className='dashboard'>
      <LeftPanel menulist={sideMenuItems} handleMenuClick={handleMenuClick} />
      <MainContent selecteditem={sideMenuItems.find(menu => menu.class==='active')} />
    </div>
  )
}
