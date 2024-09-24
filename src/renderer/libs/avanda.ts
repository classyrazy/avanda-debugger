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


export default Graph; 