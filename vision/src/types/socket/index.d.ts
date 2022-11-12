import { ChartName } from './../index.d';

export interface SocketSendData{
    action: "fullScreen" | "getData" | "themeChange";
    socketType: string;
    chartName: string;
    value?: any;
}