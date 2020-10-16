<template>
<div class="todo-list__add">
    <h2>ToDos</h2>
    <input
            type="text"
            v-model="todoContext"
            @keydown.enter="handleAddTodo"
            placeholder="请输入待办事项"
    />
</div>
</template>

<script lang="ts">
import moment from "moment";
import { ref, defineComponent } from "vue";

import { dataItem } from "../../../constant/interfaces";
import { randomId } from "../../../utils";

export default defineComponent({
    name: "add-todo-item",
    setup(propr, ctx) {
        const todoContext = ref("");

        const handleAddTodo = () => {
            // 0. 判断数值是否为空
            if (!todoContext.value) return alert("请添加待办");
            // 1. 添加待办
            const item: dataItem = {
                id: randomId(),
                context: todoContext.value,
                defaultVal: todoContext.value,
                status: "todo",
                createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            };
            // 2. 事件传递
            ctx.emit("handleAddTodo", item);
            // 3. 清空 value
            todoContext.value = "";
        };

        return {
            todoContext,
            handleAddTodo,
        };
    },
});
</script>
