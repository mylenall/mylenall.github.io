let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.btn-add'),
    todo = document.querySelector('.todo'),
    addImportaint = document.querySelector('.btn-add_importaint'),
    deleteButton = document.querySelector('.btn-delete');

let todoList = [];

if (localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function(){
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        importaint: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

addImportaint.addEventListener('click', function(){
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        importaint: true
    };
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

document.querySelector('ul').onclick = function(e) {
    const btn = e.target.closest('.btn-delete');
    if (!btn) {
      return;
    }
    let deleteId = e.target.getAttribute('id');
    todoList.splice(deleteId,1);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
  }


function displayMessages(){
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
            <label for="item_${i}" class="${item.importaint ? 'important': ''}">${item.todo}</label>
            <button class="btn-delete" id="${i}">Удалить</button>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function(item){
        if (item.todo == valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if (event.ctrlKey){
                todoList.splice(i,1);
            } else {
                item.importaint = !item.importaint;
            }            
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

