<template>
<nav class="todo-list__nav">
    <div
            class="todo-list__nav-item"
            v-for="nav in navData"
            :key="nav.id"
            :class="[active === nav.status ? 'todo-list__nav-active' : '']"
            @click="handleNavClick(nav.status)"
    >
        {{ nav.name }}
    </div>
</nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { randomId } from "../../../utils";

export default defineComponent({
    props: {
        active: {
            type: String,
        },
    },
    name: "todo-list-nav",
    setup(props, ctx) {

        const navData = ref([{
                id: randomId(),
                name: "待办",
                status: "todo",
            },
            {
                id: randomId(),
                name: "完成",
                status: "complete",
            },
            {
                id: randomId(),
                name: "历史",
                status: "history",
            },
        ]);

        const handleNavClick = (status: string) => {
            ctx.emit("update:active", status);
        };

        return {
            navData,
            handleNavClick,
        };
    },
});
</script>
