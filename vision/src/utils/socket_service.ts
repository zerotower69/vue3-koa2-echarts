import { SocketSendData } from "@/types/socket"

export default class SocketService {
    /**
     * 单例设计模式
     */

    static instance :SocketService|null = null 

    ws: WebSocket | null = null
    
    //存储回调函数
    callbackMapping: Record<string, any> = {}
    
    //标识是否连接成功了
    connected = false
    //记录重试的次数
    sendRetryCount = 0
    //重新连接尝试的次数
    connectRetryCount=0
    static get Instance() {
        if (!this.instance) {
            this.instance =new SocketService()
        }
        return this.instance; //确保拿到的都是同一个实例对象
    }

    //定义一个连接服务器的方法
    connect() {
        if (!window.WebSocket) {
            return console.log('您的浏览器不支持WebSocket!')
        }
        this.ws = new WebSocket('ws://192.168.2.87:9998'); //然后在main.ts中引入使用

        //连接成功的事件
        this.ws.onopen = () => {
            //console.log("连接服务端成功了！");
            this.connected = true
            this.connectRetryCount = 0; //重新连接次数重置为0
        }

        //1.连接服务端失败
        //2.当连接成功后，服务器关闭的情况
        this.ws.onclose = () => {
            //console.log("连接服务端失败");
            this.connected = false
            this.connectRetryCount++;
            setTimeout(() => { 
                this.connect()
            },500*this.connectRetryCount)
        }

        //得到服务端传来的数据
        this.ws.onmessage = (msg) => {
            //console.log("从服务端获取到了数据");
            // console.log(msg.data);ss
            const recvData = JSON.parse(msg.data)
            const socketType = recvData.socketType
            //判断回调函数是否存在
            if (this.callbackMapping[socketType]) {
                const action = recvData.action;
                if (action === 'getData') {
                    const realData = JSON.parse(recvData.data);
                    this.callbackMapping[socketType].call(this, realData);
                } else if (action === 'fullScreen') {
                    this.callbackMapping[socketType].call(this, recvData);
                } else if (action === 'themeChange') {
                    this.callbackMapping[socketType].call(this, recvData);
                }
            }
        }
    }

    registerCallback(socketType: string, callBack: any) {
        this.callbackMapping[socketType]=callBack
     }
    
    unRegisterCallback(socketType: string) {
        this.callbackMapping[socketType] = null
    }

    //发送数据的方法 (重发数据的机制)
    send(data: SocketSendData) {
        if (this.connected) {
            this.ws?.send(JSON.stringify(data))
        }
        else {
            this.sendRetryCount++;
            //延时重试
            setTimeout(() => { 
                this.send(data)
            },this.sendRetryCount *500)
        }
    }
}

//函数式编程，导出实例，和视频中的原型挂载不太一样
export const useSocket = () => {
    return SocketService.instance
}