const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')
const taskCountSpan = document.getElementById('taskCount');
const taskComplete = document.getElementById('comTask')
const activeTask = document.getElementById('active')
const addBtn = document.getElementById('addbtn')

 function updateTaskCount() {
      const totalTasks = listContainer.querySelectorAll('li').length;
      taskCountSpan.innerHTML = totalTasks;
    }

function completed() {
  const finished = listContainer.querySelectorAll('li.checked').length;
  taskComplete.innerHTML = finished;
}

function current(){
        const total = parseInt(taskCountSpan.innerHTML)
        const completed = parseInt(taskComplete.innerHTML)
        const pending = total - completed
        activeTask.innerHTML = pending
    }


   function addTask(){
      if(inputBox.value === ""){
                alert('you must write something!')
        }
        else {
            let li = document.createElement('li');
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);
            let span = document.createElement('span')
            span.innerHTML = '\u00d7'
            li.appendChild(span)
        }
        inputBox.value = ''
        updateTaskCount()
        completed()
        current()
        saveData()
   }

   listContainer.addEventListener('click', function(e){
    if (e.target.tagName === 'LI'){
        e.target.classList.toggle('checked')
        updateTaskCount()
        completed()
        current()
        saveData()
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove()
        updateTaskCount()
        completed()
        current()
        saveData()
    }
   })


   inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

   function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
   }

   function showTask(){
    listContainer.innerHTML = localStorage.getItem("data")
   }

   showTask();

//    localStorage.clear('data')
