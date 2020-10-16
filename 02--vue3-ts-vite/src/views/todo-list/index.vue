<template>
<div class="todo-list">
    <!--添加代办-->
    <add-todo-item @handleAddTodo="handleAddTodo" />
    <!--导航-->
    <todo-list-nav v-model:active="active" />
    <!--数据展示-->
    <data-list :data="activeData" :active="active" @handleClearHistory="handleClearHistory" />
</div>
</template>

<script lang="ts">
import {
    computed,
    ref
} from "vue";
import {
    getTodoListData,
    updateTodoListData
} from "../../service";
import {
    dataItem,
    navItem
} from "../../constant/interfaces";
import AddTodoItem from "./components/add-todo-item.vue";
import TodoListNav from "./components/todo-list-nav.vue";
import DataList from "./components/data-list.vue";

export default {
    name: "todo-list",
    components: {
        AddTodoItem,
        TodoListNav,
        DataList,
    },
    setup() {
        const dataList = ref < Array < dataItem >> (getTodoListData() || []);

        let active = ref("todo");

        const activeData = computed(() =>
            dataList.value.filter((item) => item.status === active.value)
        );

        // 添加代办
        const handleAddTodo = (item: dataItem) => {
            dataList.value.unshift(item);
            updateTodoListData(dataList.value);
        };

        // 清空历史
        const handleClearHistory = () => {
            dataList.value = dataList.value.filter((item: dataItem) => item.status !== 'history')
        }

        return {
            dataList,
            active,
            activeData,
            handleAddTodo,
            handleClearHistory,
        };
    },
};
</script>

<style lang="scss">
@import "./todo-list.scss";
</style>
