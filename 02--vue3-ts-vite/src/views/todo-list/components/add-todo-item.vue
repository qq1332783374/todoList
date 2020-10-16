<template>
<div class="todo-list__add">
    <input type="text" v-model="todoContext" @keydown.enter="handleAddTodo" />
    <button type="button" @click="handleAddTodo">添加代办</button>
</div>
</template>

<script lang="ts">
import {
    ref,
    defineComponent
} from "vue";

import {
    dataItem
} from "../../../constant/interfaces";
import {
    randomId
} from "../../../utils";

export default defineComponent({
    name: "add-todo-item",
    setup(propr, ctx) {
        const todoContext = ref("");

        const handleAddTodo = () => {
            // 0. 判断数值是否为空
            if (!todoContext.value) return alert("请添加代办");
            // 1. 添加代办
            const item: dataItem = {
                id: randomId(),
                context: todoContext.value,
                defaultVal: todoContext.value,
                status: "todo",
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
