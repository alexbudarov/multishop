import { Layout } from "react-admin";
import { TopAppBar } from "./app-bar/TopAppBar";
import { MainMenu } from "./menu/MainMenu";

export const AdminLayout = (props: any) => {
  return <Layout {...props} menu={MainMenu} appBar={TopAppBar} />;
};
