<template>
    <ul class="todo-list__data">
        <li class="todo-list__data-item" v-for="item in data" :key="item.id">
            <p v-if="isUpdateCtx !== item.id">
            <span
                    class="todo-list__data-item-value"
                    :class="[item.status !== 'todo' ? 'todo-list__data-item-ed' : '',]"
                    @dblclick.stop="handleShowUpdateContext(item)"
            >
                {{ item.context }}
            </span>
            <!-- 完成 -->
            <span
                    class="todo-list__data-item-complete"
                    v-show="item.status === 'todo'"
                    @click="handleClickItem(item, 'complete')"
            >
                √
            </span>
            <!-- 删除 -->
            <span
                    class="todo-list__data-item-del"
                    v-show="item.status !== 'history'"
                    @click="handleClickItem(item, 'history')"
            >
                x
            </span>
            </p>
            <p v-else>
                <!-- 修改 -->
                <input
                        type="text"
                        v-model="item.context"
                />
                <span
                        v-show="isUpdateCtx === item.id"
                        @click="handleConfirmUpdate(item)"
                >
                确定
            </span>
            <span
                    v-show="isUpdateCtx === item.id"
                    @click="handleCancelUpdate(item)"
            >
                取消
            </span>
            </p>
        </li>
    </ul>
    <!--空状态-->
    <div class="todo-list__empty" v-if="data.length === 0">
        {{emptyCtx[active]}}
    </div>
    <div
            class="todo-list__clear"
            v-if="active === 'history' && data.length !== 0"
            @click="handleClearHistory"
    >
        清空历史
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { dataItem } from '../../../constant/interfaces';
    import {
        updateTodoListDataItemCtx,
        updateTodoListDataItemStatus,
        clearTodoListDataHistory
    } from '../../../service';

    export default defineComponent({
        name: 'data-list',
        props: {
            active: {
                type: String,
            },
            data: {
                type: Array,
                default: () => [],
            },
        },
        emits: ['handleClearHistory'],
        setup(props, ctx) {
            const isUpdateCtx = ref(-99);

            const emptyCtx = {
                'todo': '暂时没什么事情干，吃饱了找点事情干吧！',
                'complete': '都没什么事情干嘛？完成的事情，怎么空空如也！',
                'history': '事事顺心，心想事成！'
            }

            const handleClickItem = (item: dataItem, status: string) => {
                item.status = status;
                updateTodoListDataItemStatus(item.id, item.status);
            };

            const handleShowUpdateContext = (item: dataItem) => {
                if (item.status === 'todo') {
                    isUpdateCtx.value = item.id;
                }
                item['defaultVal'] = item.context;
            };

            const handleCancelUpdate = (item: dataItem) => {
                isUpdateCtx.value = -99;
                item.context = item.defaultVal;
            };

            const handleConfirmUpdate = (item: dataItem) => {
                isUpdateCtx.value = -99;
                updateTodoListDataItemCtx(item.id, item.context);
            };

            const handleClearHistory = () => {
                clearTodoListDataHistory()
                ctx.emit('handleClearHistory')
            }

            return {
                isUpdateCtx,
                emptyCtx,
                handleClickItem,
                handleShowUpdateContext,
                handleCancelUpdate,
                handleConfirmUpdate,
                handleClearHistory,
            };
        },
    });
</script>
