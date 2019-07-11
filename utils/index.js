/*
 * @Author: Nokey 
 * @Date: 2019-07-10 17:42:38 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-10 18:20:53
 */
'use strict'; 

let fs = require('fs')

/**
 * detect whether path exit or not
 */
exports.exitDirify = (pathStr)=>{
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr, {
            recursive: true
        })
        console.log('Create Log Path: ' + pathStr)
    }
    
    return pathStr
}