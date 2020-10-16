import { getLocalData, setLocalData } from "../utils";
import { TODO_LIST_DATA } from "../constant";
import { dataItem } from "../constant/interfaces";

/**
 * 获取本地存储数据
 */
export const getTodoListData = () => getLocalData(TODO_LIST_DATA);

/**
 * 更新本地存储数据
 * @param val 值
 */
export const updateTodoListData = (val: Array<dataItem>) => {
	setLocalData(TODO_LIST_DATA, val);
};

/**
 * 更新单个的状态
 * @param val 单个
 */
export const updateTodoListDataItemStatus = (id: number, status: string) => {
	const data = getTodoListData() || [];
	data.forEach((item: dataItem) => {
		if (item.id === id) item.status = status;
	});
	updateTodoListData(data);
};

/**
 * 更新单个的内容
 * @param val 单个
 */
export const updateTodoListDataItemCtx = (id: number, ctx: string) => {
	const data = getTodoListData() || [];
	data.forEach((item: dataItem) => {
		if (item.id === id) item.context = ctx;
	});
	updateTodoListData(data);
};

/**
 * 清除历史记录
 */
export const clearTodoListDataHistory = () => {
	let data = getTodoListData() || [];
	data = data.filter((item: dataItem) => item.status !== 'history')
	updateTodoListData(data);
}

export default {
	getTodoListData,
	updateTodoListData,
	updateTodoListDataItemStatus,
	updateTodoListDataItemCtx,
	clearTodoListDataHistory,
};
