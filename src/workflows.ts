export interface TextInput {
    type: "text",
    placeholder: string,
}

export interface ImageInput {
    type: "image",
}

export interface NumberInput {
    type: "number",
}
export interface DropdownInput {
    type: "dropdown",
    options: { [key: string]: string },
}

export type InputType = TextInput | ImageInput | NumberInput | DropdownInput;

export interface InputData {
    key: string,
    name: string,
}

type Input = InputData & InputType;

export interface Workflow {
    name: string,
    icon: string,
    endpoint: string,
    inputs: Input[],
    type?: "llm" | "alphabet",
    tags?: string[]
}

export const WORKFLOWS: { [name: string]: Workflow } = {
    "create": {
        name: "Create Image",
        icon: "camera-plus",
        endpoint: "startCreateImage",
        tags: ["image", "img"],
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
        tags: ["image", "img"],
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
        tags: ["image", "img"],
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
        icon: "theme-light-dark",
        endpoint: "startRethemeImage",
        tags: ["image", "img"],
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
    "relight" :{
        name: "Relight Image",
        icon: "format-color-fill",
        endpoint: "startRelightImage",
        tags: ["image", "img"],
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image",
            },
            {
                name: "xLocation (0-512)",
                key: "xLocation",
                type: "number"
            },
            {
                name: "yLocation (0-512)",
                key: "yLocation",
                type: "number"
            },
            {
                name: "height (0-512)",
                key: "height",
                type: "number"
            },
            {
                name: "width (0-512)",
                key: "width",
                type: "number"
            },
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "Painting"
            }
        ]
    },
    "qrcode": {
        name: "Qr Image",
        icon: "qrcode",
        endpoint: "startQrCode",
        tags: ["image", "img"],
        inputs: [
            {
                name: "QR Code Data (URL, text)",
                key: "url",
                type: "text",
                placeholder: "deepnarration.matissetec.dev/QrCode"
            },
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "dog park"
            }
        ]
    },
    "outpaint": {
        name: "Outpaint Image",
        icon: "vector-rectangle",
        endpoint: "startOutpaintImages",
        tags: ["image", "img", "extend"],
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
                placeholder: "Awesome forest view"
            },
            {
                name: "left",
                key: "left",
                type: "number",
            },
            {
                name: "right",
                key: "right",
                type: "number",
            },
            {
                name: "up",
                key: "up",
                type: "number",
            },
            {
                name: "down",
                key: "down",
                type: "number",
            },
        ]
    },
    "FaceSwap": {
        name: "FaceSwap Image",
        icon: "face-recognition",
        endpoint: "startImageFaceSwap",
        tags: ["image", "img"],
        inputs: [
            {
                name: "Base Image",
                key: "personPicture",
                type: "image"
            },
            {
                name: "Target Image",
                key: "targetPicture",
                type: "image"
            },
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "with an awesome smile"
            }
        ]
    },
    "StickerBomb": {
        name: "StickerBomb Image",
        icon: "sticker-emoji",
        endpoint: "startStickerBomb",
        tags: ["image", "img"],
        inputs: [
            {
                name: "Base Image",
                key: "imageUrl",
                type: "image"
            }
        ]
    },
    "BackgroundRemovalImage": {
        name: "Background Removal Image",
        icon: "image-minus-outline",
        endpoint: "startImageBackgroundRemoval",
        tags: ["image", "img", "removebg", "remove"],
        inputs: [
            {
                name: "Base Image",
                key: "imageUrl",
                type: "image"
            }
        ]
    },
    "BackgroundExtenderGif": {
        name: "Background Extender Gif",
        icon: "image-size-select-large",
        endpoint: "startBackgroundExtenderGif",
        tags: ["extend", "gif"],
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image"
            },
            {
                name: "width",
                key: "width",
                type: "number",
            },
            {
                name: "down",
                key: "down",
                type: "number",
            },
        ]
    },/*
    "SpinMeGif": {
        name: "Spin image Gif",
        icon: "rotate-360",
        endpoint: "startSpinMe",
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image"
            }
        ]
    },*/
    "story": {
        name: "Story Generator",
        icon: "book-open-variant-outline",
        endpoint: "createStory",
        type: "llm",
        tags: ["text", "txt"],
        inputs: [
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "Dogs having fun at a water park"
            }
        ]
    },
    "poem": {
        name: "Poem Creator",
        icon: "book",
        endpoint: "createPoem",
        type: "llm",
        tags: ["text", "txt"],
        inputs: [
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "Dogs having fun at a water park"
            }
        ]
    },
    "describeImage": {
        name: "Extend Image Description",
        icon: "magnify-expand",
        endpoint: "describeImage",
        type: "llm",
        tags: ["text", "txt"],
        inputs: [
            {
                name: "Initial prompt",
                key: "prompt",
                type: "text",
                placeholder: "Dogs having fun at a water park"
            }
        ]
    },
    "characterBackground": {
        name: "Create Character Background",
        icon: "account-edit",
        endpoint: "characterBackground",
        type: "llm",
        tags: ["text", "txt"],
        inputs: [
            {
                name: "Character class",
                key: "class",
                type: "text",
                placeholder: "Monk"
            },
            {
                name: "username",
                key: "username",
                type: "text",
                placeholder: "matissetec"
            }
        ]
    },
    "createModel": {
        name: "Create Model",
        icon: "printer-3d",
        endpoint: "startCreateModel",
        tags: ["3d"],
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image",
            },
        ]
    },
    "createDancer": {
        name: "Create Dancer",
        icon: "human-female-dance",
        endpoint: "startDancerGif",
        tags: ["3d"],
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image",
            },
            {
                name: "Dancer",
                key: "danceChosen",
                type: "dropdown",
                options: {
                    dance1: "dance1",
                    dance2: "dance2",
                    dance3: "dance3",
                    dance4: "dance4",
                    ChickenDance: "Chicken Dance",
                    dance8: "dance8",
                    dance9: "dance9",
                    the_carolton: "The Carolton",
                    WaveDance: "Wave Dance",
                    dance12: "dance12",
                    macarena: "Macarena"
                }
            }

        ]
    },
    "funTyper": {
        name: "Fun Typer",
        icon: "keyboard",
        endpoint: "startAlphabetImages",
        tags: ["text", "txt"],
        type: "alphabet",
        inputs: [
            {
                name: "Prompt",
                key: "prompt",
                type: "text",
                placeholder: "Dogs"
            }
        ]
    }
}
