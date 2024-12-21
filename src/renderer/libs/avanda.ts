import { Graph } from "@avanda/avandajs";
import { projectDetails } from "../composables/useAppConfig";

const baseUrl = projectDetails.value.baseurl
Graph.setAvandaConfig({
  rootUrl: baseUrl
})
  Graph.setAxiosRequestConfig({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      Authorization: `Bearer`,
    },
  })
console.log('baseUrl', baseUrl)

export const setBearerToken = (token: string) => {
  Graph.setAxiosRequestConfig({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export default Graph; 