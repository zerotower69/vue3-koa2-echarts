//create websocket server
const WebSocket = require('ws')
const path = require('path')
const fileUtils = require('../utils/file_utils')
const wss = new WebSocket.Server({
    port: 9998
});

/**
 * 约定的字段
 * {
 *   "action":"" //getData:获取图表数据；fullscreen:代表产生了全屏事件；themeChange 代表产生了主题切换的事件
 *  “socketType”:"代表业务模块类型，代表前端响应函数的标识"
 *  “chartName”: 代表图表的名称「六个图表的名称」，后端读取数据的标识
 * 如果是主题切换事件，就可以不用传递这个值
 * 主题切换是所有的组件都需要切换，且全屏和获取数据需要标识出是哪个图表
 *  “value”:  代表具体的数据值
 * }
 */

// server open watch
module.exports.listen = () => {
    wss.on('connection', client => {
        // console.log('client connect successfully!');
        client.on('message', async (msg) => {
            // console.log(msg);
            //整个核心代码在这里！
            // console.log("msg===>", msg);
            try {
                let payload = JSON.parse(msg);
                // console.log("payload==>", payload);
                const action = payload.action;
                if (action === 'getData') {
                    //get the chart data
                    let filePath = '../data/' + payload.chartName + '.json'
                    // payload.chartName // trend|seller|map|rank|hot|stock
                    filePath = path.join(__dirname, filePath);
                    const ret = await fileUtils.getFileJsonData(filePath);
                    //需要在服务端获取到数据的基础之上，增加一个data的字段
                    //data所对应的值，就是某个json的内容
                    payload.data = ret;
                    console.log(payload)
                    client.send(JSON.stringify(payload))
                }
                else {
                    //原封不动地将所收到的数据转发给每一个处于连接状态的客户端
                    wss.clients.forEach(client => {
                        client.send(msg)
                    })
                }
            }
            catch {

            }
        })
    })
}