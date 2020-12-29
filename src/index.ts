import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import { serverPort } from './utils/config';

const app = express();

//处理跨域请求
app.all("*", function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json;charset=utf-8"); // 加上后，在加载静态资源图片时会乱码
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req: any, res: any, next: any) => {
    next();
})

app.use(router);

const server = app.listen(serverPort, () => console.log(`服务已启动，端口${serverPort}`))
