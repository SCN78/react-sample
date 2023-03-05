import React from 'react'


export default function LeftPanel(props) {
    return (
        <div className='sidebar'>
            <div className='menubuttongroup'>
                {props.menulist.map((item) =>
                    <button className={item.class} key={item.id} onClick={() => props.handleMenuClick(item)}>
                        {item.name}
                    </button>
                )}
            </div>
        </div>
    )
}
