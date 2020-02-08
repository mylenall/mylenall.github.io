import React from 'react';
import './App.css';
import Info from './components/info'
import Form from "./components/form"
import List from "./components/list"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoList: ["one", "two", "three", "four"] };
  };
  gettingTask = event => {
    event.preventDefault();
    let task = event.target.elements.city.value;

    

  };

  render() {
    return (
      <div>
        <Info/>
        <Form gettingTaskMethod={this.gettingTask}/>
        <List

        todoList={this.state.todoList}
        
        />
      </div>
      
    );
  };
  
}

export default App;
