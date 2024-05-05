export interface TextInput {
    type: "text",
    placeholder: string,
}

export interface ImageInput {
    type: "image"
}

export type InputType = TextInput | ImageInput;

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
    },
    "similar": {
        name: "Similar Image",
        icon: "image-edit",
        endpoint: "startSimilarImages",
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image",
            },
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "Cute girl"
            }
        ]
    },
    "combine": {
        name: "Combine Images",
        icon: "folder-multiple-image",
        endpoint: "startCombineImages",
        inputs: [
            {
                name: "Image 1",
                key: "image1Url",
                type: "image",
            },
            {
                name: "Image 2",
                key: "image2Url",
                type: "image",
            },
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "Cute girl"
            }
        ]
    },
    "retheme": {
        name: "Retheme Image",
        icon: "image-edit",
        endpoint: "startRethemeImage",
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image",
            },
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "Painting"
            }
        ]
    },
}
