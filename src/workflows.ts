export interface Workflow {
    name: string,
    icon: string,
    endpoint: string,
}

export const WORKFLOWS: { [name: string]: Workflow } = {
    "create": {
        name: "Create Image",
        icon: "camera-plus",
        endpoint: "/TODO"
    },
    "retheme": {
        name: "Retheme Image",
        icon: "theme-light-dark",
        endpoint: "/TODO"
    }
}
