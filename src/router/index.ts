import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("@/views/About.vue"),
        },
        {
            path: "/user",
            component: () => import("@/views/User.vue"),
        },
        {
            path: "/workflows",
            component: () => import("@/views/WorkflowList.vue"),
        },
        {
            path: "/:workflow",
            component: () => import("@/views/Workflow.vue"),
        },
        {
            path: "/contact",
            component: () => import("@/views/Contact.vue"),
        },
        {
            path: "/tokens",
            component: () => import("@/views/Tokens.vue"),
        },
        {
            path: "/discovery",
            component: () => import("@/views/Discovery.vue"),
        }
    ]
})

export default router
