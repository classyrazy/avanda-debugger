import requestType from "@/utils/types/requestType";
import { stringify, v4 as uuidv4 } from 'uuid'

export const useCreateNewRequest = () => {
    // {
    //     name: "folde`r 1",
    //     children: [
    //         {
    //             name: "sub-folder 1",
    //             children: [
    //                 { name: "sub-sub-folder 1" },
    //                 { name: "sub-sub-folder 2" }
    //             ]
    //         },
    //         { name: "sub-folder 2" }
    //     ]
    // },
    type Request = {
        type: requestType,
        body: object,
        headers: object,
        response: object,
        id: string,
        name: string,

    }
    const appData = reactive({
        currentTab: ""
    })
    let tree = reactive([
        {
            name: "Authentication",
            children: [
                {
                    name: "Signup",
                    children: [
                        { name: "Signup Admin" },
                        { name: "Signup User" }
                    ]
                },
                { name: "Login", children: [{ name: "Login Admin" }, { name: "Login User", }] }
            ]
        }
    ])
    const requests = reactive<Request[]>([
        {
            type: "get",
            name: "request 1",
            body: {},
            headers: {},
            response: {},
            id: "jikfkf",
        },
        {
            type: "post",
            name: "request 2",
            body: {},
            headers: {},
            response: {},
            id: "jikffhjdkfbjdfdbkf",
        },

    ]);
    const newRequests = reactive<Request[]>([])
    const createNewRequest = (name: string, type: requestType) => {
        const requestId = uuidv4()
        newRequests.push({
            type: type,
            name: name,
            body: {
                details: "body details"
            },
            headers: {},
            response: {},
            id: `new-${requestId}`

        })
        console.log({requests, newRequests})


    }
    return { tree, createNewRequest, requests,newRequests }
}