const fs = require('fs')
const utils = {
    getFileJsonData: (filePath) => {
        return new Promise((resolve, reject) => {
            //根据文件的路径，读取文件的内容
            fs.readFile(filePath, 'utf-8', (error, data) => {
                if (error) {
                    //read file error!
                    reject(error)
                }
                else {
                    // read file ok!
                    resolve(data)
                }
            })
        })
    }
}

module.exports = utils;