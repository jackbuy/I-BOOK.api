
const superagent = require('superagent')
require('superagent-charset')(superagent)
const async = require('async');
const cheerio = require('cheerio')

import Utils from '../utils/utils';
import { connect } from 'net';
const { SuccessMsg, ErrorMsg } = Utils;


// 搜索
export const searchBook = async (req: any, res: any) => {

    const { keyword } = req.body
    let url = `https://www.zwdu.com/search.php?keyword=${encodeURIComponent(keyword)}`

    function fetList(url: any, callback: any) {
        superagent.get(url)
        .end(function (err: any, res: any) {
            const $ = cheerio.load(res.text);
            let results: any = []
            $('.result-item').each(function (index: any, item: any) {
                results.push({
                    cover: $(item).find('.result-game-item-pic-link img').attr('src'),
                    name: $(item).find('.result-game-item-title-link span').text(),
                    url: $(item).find('.result-game-item-title-link').attr('href'),
                    author: $(item).find('.result-game-item-info-tag').eq(0).find('span').eq(1).text(),
                    type: $(item).find('.result-game-item-info-tag').eq(1).find('span').eq(1).text(),
                    lastUpdateTime: $(item).find('.result-game-item-info-tag').eq(2).find('span').eq(1).text(),
                    desc: $(item).find('.result-game-item-desc').text()
                })
            })
            callback(results)
        })
    }

    fetList(url, function(results: any) {
        SuccessMsg(res, { data: results});
    })
}
