/*--- todolist 原生JavaScript版 v0.1 ---*/
/**
 * @author tanshangbiao1
 * @date 2019/08/30
 */

window.onload = load;

/**
 * 加载本地存储数据
 * @return {Array} []
 * */
function loadData() {
	let collection = localStorage.getItem('todo');
	if (collection != null) {
		return JSON.parse(collection);
	} else return [];
}

/**
 * 用于保存本地存储数据
 * @param { Array } data 
 */
function saveData(data) {
	localStorage.setItem('todo', JSON.stringify(data));
}

/**
 * 节点数据初始化
 * */
function load() {
	let todoList = document.getElementById('todolist');
	let doneList = document.getElementById('donelist');
	let todocount = document.getElementById("todocount");
	let donecount = document.getElementById("dontcount");
	let collection = localStorage.getItem('todo');
	if (collection !== null) {
		let data = JSON.parse(collection);
		let todoCount = 0;
		let doneCount = 0;
		let todoStr = '';
		let doneStr = '';
		data.forEach(function(item) {
			if (item.isDone) {
				doneStr +=
					`
					<li>
						<input type="checkbox" name="done" />
						<p id="p-${item.id}">${item.content}</p>
						<a href="javascript:delItem(${item.id})">-</a>
					</li>
				`;
				doneCount++;
			} else {
				todoStr +=
					`
					<li>
						<input type="checkbox" name="done" />
						<p id="p-${item.id}">${item.content}</p>
						<a href="javascript:delItem(${item.id})">-</a>
					</li>
				`;
				todoCount++;
			};
		});

		todoList.innerHTML = todoStr;
		todocount.innerHTML = todoCount;
		doneList.innerHTML = doneStr;
		donecount.innerHTML = doneCount;
	} else {
		todocount.innerHTML = 0;
		todoList.innerHTML = '';
		donecount.innerHTML = 0;
		doneList.innerHTML = '';
	}
}

/**
 * 添加代办事项 
 */
function addTodo() {
	let todoItem = document.getElementById('todoitem');
	if (todoItem.value === '') {
		alert('请输入代办');
	} else {
		let data = loadData();
		let todo_obj = {
			id: data.length + 1,
			content: todoItem.value,
			isDone: false
		};
		data.push(todo_obj);
		saveData(data);
		// 表单重置
		document.getElementById('form').reset();

		// 加载节点
		load()
	}
}

/**
 *  删除代办事项
 * */
function delItem(_id) {
	let data = loadData()
	data = data.filter(function(item) {
		return item.id !== _id
	})
	saveData(data)
	load()
}
