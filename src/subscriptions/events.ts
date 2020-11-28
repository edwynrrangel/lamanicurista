import AppEventHandler from "./handlers/AppEventHandler";

export default [
  {
    path: "deleteBulkApps",
    handler: AppEventHandler.deleteBulk,
  },
];
