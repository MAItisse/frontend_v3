export interface TextInput {
    type: "text",
    placeholder: string,
}

export interface ImageInput {
    type: "image"
}

export interface NumberInput {
    type: "number"
}

export type InputType = TextInput | ImageInput | NumberInput;

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
        icon: "theme-light-dark",
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
    "qrcode": {
        name: "Qr Image",
        icon: "qrcode",
        endpoint: "startQrCode",
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
                type: "text",
                placeholder: "64"
            },
            {
                name: "right",
                key: "right",
                type: "text",
                placeholder: "64"
            },
            {
                name: "up",
                key: "up",
                type: "text",
                placeholder: "64"
            },
            {
                name: "down",
                key: "down",
                type: "text",
                placeholder: "64"
            },
        ]
    },
    "FaceSwap": {
        name: "FaceSwap Image",
        icon: "face-recognition",
        endpoint: "startImageFaceSwap",
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
        inputs: [
            {
                name: "Base Image",
                key: "targetPicture",
                type: "image"
            },
            {
                name: "width",
                key: "width",
                type: "text",
                placeholder: "64"
            },
            {
                name: "down",
                key: "down",
                type: "text",
                placeholder: "64"
            },
        ]
    },
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
    },
}
