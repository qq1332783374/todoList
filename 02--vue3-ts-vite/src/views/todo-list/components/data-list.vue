<template>
<ul class="todo-list__data">
    <li class="todo-list__data-item" v-for="item in data" :key="item.id">
        <p v-if="isUpdateCtx !== item.id">
            <!-- 代办展示的值 -->
            <span class="todo-list__data-item-value" v-show="item.status === 'todo'" @dblclick.stop="handleShowUpdateContext(item)">{{ item.context }}</span>
            <!-- 完成 / 删除 的值 -->
            <del v-show="item.status !== 'todo'">{{ item.context }}</del>
            <!-- 完成 -->
            <span class="todo-list__data-item-complete" v-show="item.status === 'todo'" @click="handleClickItem(item, 'complete')">√</span>
            <!-- 删除 -->
            <span class="todo-list__data-item-del" v-show="item.status !== 'history'" @click="handleClickItem(item, 'history')">x</span>
        </p>
        <p v-else>
            <!-- 修改 -->
            <input type="text" v-model="item.context" />
            <span v-show="isUpdateCtx === item.id" @click="handleConfirmUpdate(item)">确定</span>
            <span v-show="isUpdateCtx === item.id" @click="handleCancelUpdate(item)">取消</span>
        </p>
    </li>
</ul>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from "vue";
import {
    dataItem
} from "../../../constant/interfaces";
import {
    updateTodoListDataItemCtx,
    updateTodoListDataItemStatus,
} from "../../../service";

export default defineComponent({
    name: "data-list",
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    setup(props, ctx) {
        const isUpdateCtx = ref(-99);

        const handleClickItem = (item: dataItem, status: string) => {
            item.status = status;
            updateTodoListDataItemStatus(item.id, item.status);
        };

        const handleShowUpdateContext = (item: dataItem) => {
            isUpdateCtx.value = item.id;
            item["defaultVal"] = item.context;
        };

        const handleCancelUpdate = (item: dataItem) => {
            isUpdateCtx.value = -99;
            item.context = item.defaultVal;
        };

        const handleConfirmUpdate = (item: dataItem) => {
            isUpdateCtx.value = -99;
            updateTodoListDataItemCtx(item.id, item.context);
        };

        return {
            isUpdateCtx,
            handleClickItem,
            handleShowUpdateContext,
            handleCancelUpdate,
            handleConfirmUpdate,
        };
    },
});
</script>
