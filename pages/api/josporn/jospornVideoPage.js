// jospornVideoPage.js
import axios from "axios";
import cheerio from "cheerio";
import extractUrls from "extract-urls";
import dbConnect from "../lib/db";
import { videolist_Scrape } from "../lib/videolist_Scrape";
import { videopageDetails_Scrape } from "../lib/videopageDetails_Scrape";

import {
  checkVideoDetailsExist_DB,
  saveVideoDetail,
  randomVideolist,
  getVideoItemByPage,
  checkVideoItemExist_DB,
} from "../db_query/videoQuery";

await dbConnect();

export default async function handler(req, res) {
  let title = req.body.title;
  const checkVideoItemExist = await checkVideoItemExist_DB(title);


  let href = checkVideoItemExist.href;

  var relatedVideos = await videolist_Scrape(href);
  var randomVideos = await randomVideolist();
  var suggestedVideoItems =[...relatedVideos, ...randomVideos];


  var videoDetailsObj = await checkVideoDetailsExist_DB(title);

  if (videoDetailsObj == null) {
    const obj = await videopageDetails_Scrape(href);
    if (obj != null) {
      obj.duration = checkVideoItemExist.duration;
      await saveVideoDetail(obj);


      res.status(200).json({
        videoDetailsObj: videoDetailsObj,
        suggestedVideoItems: suggestedVideoItems,
        success: true,
        screenshots: checkVideoItemExist.screenshots

      });
    } else {
      res.status(200).json({
        videoDetailsObj: videoDetailsObj,
        suggestedVideoItems: suggestedVideoItems,
        success: false,
        screenshots: checkVideoItemExist.screenshots

      });
    }
  } else {

    res.status(200).json({
      videoDetailsObj: videoDetailsObj,
      suggestedVideoItems: suggestedVideoItems,
      success: true,
      screenshots: checkVideoItemExist.screenshots
    });
  }
}
