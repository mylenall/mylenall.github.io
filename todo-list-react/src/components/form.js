import React from 'react';

const Form = props =>  (
    <div>
        <form onSubmit={props.gettingTaskMethod}>
        <input type="text" name="city" placeholder="task"/>
        <button>add</button>
      </form>
    </div>
)
export default Form;