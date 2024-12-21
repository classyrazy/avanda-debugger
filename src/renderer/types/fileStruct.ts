type fileStruct = "request" | "folder";
type TreeItem = {
    name: string,
    children: TreeItem[],
}
export  {
    fileStruct,
    TreeItem
};