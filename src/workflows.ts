export interface TextInput {
    type: "text",
    placeholder: string,
}

export type InputType = TextInput;

export interface InputData {
    key: string,
    name: string,
}

type Input = InputData & InputType;

export interface Workflow {
    name: string,
    icon: string,
    endpoint: string,
    inputs: Input[]
}

export const WORKFLOWS: { [name: string]: Workflow } = {
    "create": {
        name: "Create Image",
        icon: "camera-plus",
        endpoint: "startCreateImage",
        inputs: [
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "forest landscape with birds"
            }
        ]
    }
}
