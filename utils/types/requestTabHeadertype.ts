import requestType from "./requestType";
import { requestInnerTabs } from "./appStyleTypes";
type RequestTabheadeType = {
    type: requestType,
    fileName: string,
    id: string,
    name: string,
    current_req_tab_model?: requestInnerTabs
}
export default RequestTabheadeType;