import React from 'react'
import Deliveries from './Deliveries';
import Estimations from './Estimations';
import Home from './Home';
import Orders from './Orders';
import Payments from './Payments';

export default function MainContent(props) {
    const componentNames = {
        Home: Home,
        Estimations: Estimations,
        Orders: Orders,
        Deliveries:Deliveries,
        Payments:Payments
    };    
    var SomeComponent = componentNames[props.selecteditem.name];
    return (
        <div className='maincontent'>
            {props.selecteditem && props.selecteditem.name}
            <SomeComponent />
        </div>
    )
}
