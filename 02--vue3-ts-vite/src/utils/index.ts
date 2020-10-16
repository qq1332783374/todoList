/**
 * 设置本地存储
 * @param name
 * @param value
 */
export const setLocalData = (name: string, value: any) => {
	localStorage.setItem(name, JSON.stringify(value));
};

/**
 * 获取本地存储数据
 * @param name
 */
export const getLocalData = (name: string) => {
	const res = localStorage.getItem(name);
	return res ? JSON.parse(res) : null;
};

/**
 * 生成随机数字id
 */
export const randomId = () => Math.ceil(Math.random() * 10000);

export default {
	setLocalData,
	getLocalData,
	randomId,
};
