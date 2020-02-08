import React from 'react';

const List = props =>  (
    <div>
        {props.todoList.map(item => 
        
        <div key={item}>
            Пункт: {item}
        </div>
        
        )
        
        }
    </div>
)
export default List;