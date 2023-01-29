

export const useAppDataOption  = () => {
    const collectionOption = reactive([
        {
            label: "New Request"
        },
        {
            label: "New Folder"
        },
        {
            label: "Rename"
        },
        {
            label: "Delete"
        },
    ])

    const requestOption = reactive([
        {
            label: "New Nested Function"
        },
        {
            label: "Rename"
        }
    ])
    return {
        collectionOption,
        requestOption
    }
}