
window.onload = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => addTask(task.text, task.completed));
  };
  

  document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskText = document.getElementById('new-task').value.trim();
    if (taskText) {
      addTask(taskText, false); 
      document.getElementById('new-task').value = '';
      showNotification('Task added successfully!');
    }
  });
  
  
  function addTask(text, isCompleted) {
    const taskList = document.getElementById('task-list');
  
  
    const li = document.createElement('li');
    li.textContent = text;

    if (isCompleted) {
      li.classList.add('completed');
    }

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks(); 
      showNotification('Task updated successfully!');
    });
  

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      li.remove(); 
      saveTasks(); 
      showNotification('Task deleted successfully!');
    });
  
   
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
  
    taskList.appendChild(li);
  
  
    saveTasks();
  }
  

  function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#task-list li')).map(task => ({
      text: task.firstChild.textContent,
      completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
  

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
  