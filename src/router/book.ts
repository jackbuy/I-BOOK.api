
const superagent = require('superagent')
require('superagent-charset')(superagent)
const async = require('async');
const cheerio = require('cheerio')

import Utils from '../utils/utils';
import { connect } from 'net';
const { SuccessMsg, ErrorMsg } = Utils;

// 书籍列表
export const list = async (req: any, res: any) => {

    const { url } = req.body
    function fetList(url: any, callback: any) {
        superagent.get(url)
        .charset('gbk')  //该网站编码为gbk，用到了superagent-charset
        .end(function (err: any, res: any) {
            const $ = cheerio.load(res.text);
            let results: any = []
            $('#list dd').each(function (index: any, item: any) {
                results.push({
                    name: decodeURIComponent($(item).find('a').text()),
                    url: `https://www.zwdu.com${$(item).find('a').attr('href')}`
                })
            })
            callback(results)
        })
    }

    fetList(url, function(results: any) {
        SuccessMsg(res, { data: results});
    })
}

// 书籍详情
export const detail = async (req: any, res: any) => {

    const { url } = req.body
    function fetList(url: any, callback: any) {
        superagent.get(url)
        .charset('gbk')  //该网站编码为gbk，用到了superagent-charset
        .end(function (err: any, res: any) {
            const $ = cheerio.load(res.text);
            let results: any = {
                name: $('.bookname h1').text(),
                content: $('#content').html()
            }
            callback(results)
        })
    }

    fetList(url, function(results: any) {
        SuccessMsg(res, { data: results});
    })
}
