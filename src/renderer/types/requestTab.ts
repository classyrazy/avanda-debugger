import requestType from "./requestType";
import { requestInnerTabs } from "./appStyleTypes";
type RequestTabType = {
    type: requestType,
    id: string,
    name: string,
    current_req_tab_model?: requestInnerTabs
}
export default RequestTabType;