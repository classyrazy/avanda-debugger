import { Body } from "../types/mainRequestType"

export const convertJsonToParam = (payload: string, initialParamsData: Body[]) => {
    try {
        const parsed = JSON.parse(payload)
        const parsedKeys = Object.keys(parsed)
        const validatedArray = []
        for (const key of parsedKeys) {
            const found = initialParamsData.find((item) => item.key === key)
            if (found) {
                found.value = parsed[key]
                found.active = true
                validatedArray.push(found)
            } else {
                validatedArray.push({
                    key,
                    value: parsed[key],
                    active: true,
                })
            }
        }
        return validatedArray
    } catch (error) {
        console.log(error)
    }
}