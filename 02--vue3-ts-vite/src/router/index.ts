import { createWebHashHistory, createRouter } from 'vue-router';
import ToDoList from '../views/todo-list/index.vue';
import ToDo from '../views/todo-list/page/todo.vue';
import TodoComplete from '../views/todo-list/page/complete.vue';

const history = createWebHashHistory();

export const router = createRouter({
	history,
	routes: [
		{
			path: '/',
			redirect: '/todo-list',
		},
		{
			path: '/todo-list',
			name: 'todo-list',
			component: ToDoList,
			meta: {
				title: '代办事项',
			},
		},
	],
});
