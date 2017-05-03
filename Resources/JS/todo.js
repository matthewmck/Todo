var text = document.getElementById('text');
var check = document.getElementById('check');
var list = document.getElementById('list');
var task = document.getElementsByClassName('task');
var remove = document.getElementsByClassName('remove');
var edit = document.getElementsByClassName('edit');
var li = document.getElementsByTagName('li');

//Check if user enetered todo, if true execute addItem.
text.addEventListener('keypress', function(e) {
	if (e.which == 13) {
		if (text.value == '') {
			check.innerHTML = "Please enter todo";
		} else {
			addItem()
			text.value = '';
			check.innerHTML = '';
		}
	}
});

function toggleFinish (finishedTask) {
	Array.prototype.forEach.call(task, function(thisTodo){
		var attribute = thisTodo.getAttribute('contenteditable');

		if (attribute == 'false' && finishedTask == thisTodo) {
			thisTodo.classList.toggle('finished');
		};
	});
}

function editTodo (edit){
	var editTask = edit.parentElement.firstChild;
	editTask.setAttribute('contenteditable', 'true');
	editTask.focus();

	//If the user presses enter stop edit. 
	editTask.addEventListener('keypress', function (e) {
		if (e.which == 13) {
			this.setAttribute('contenteditable', 'false');
		} else {
			this.setAttribute('contenteditable', 'true');
		}
	});
}

function deleteTodo (thisTodo){
	var li = thisTodo.parentElement;
	list.removeChild(li);
}

function addItem () {
	//Create Elements.
    var newLi = document.createElement("li");
    var todoSpan = document.createElement('span');
    var editSpan = document.createElement("span");
	var deleteSpan = document.createElement("span");
	var editIcon = document.createElement('i');
	var deleteIcon = document.createElement('i');

	//Grab new todo from textbox.
    var textNode = document.createTextNode(text.value);
	
    //Add class values to new elements.
	todoSpan.className = "task"
	editSpan.className = "edit";
	deleteSpan.className = "remove";
	editIcon.className = 'fa fa-pencil-square-o';
	deleteIcon.className = 'fa fa-trash';

	//Set attributes to new elements.
	todoSpan.setAttribute('contenteditable', 'false');
	todoSpan.setAttribute('onclick', 'toggleFinish(this)');
	editSpan.setAttribute('onclick', 'editTodo(this)');
	deleteSpan.setAttribute('onclick', 'deleteTodo(this)');

	//Add in values to the new elements.
	todoSpan.appendChild(textNode);
	editSpan.appendChild(editIcon);
	deleteSpan.appendChild(deleteIcon);

	//Add new todo to list.
	var newItem = list.appendChild(newLi);
	newItem.appendChild(todoSpan);
	newItem.appendChild(deleteSpan);
    newItem.appendChild(editSpan);
}
