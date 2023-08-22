import VideoItem from '../models/VideoItems'
import VideoDetail from '../models/VideoDetail'


export const checkVideoDetailsExist_DB = async function (title) {
    const videoDetailsExist = await VideoDetail.findOne({ title: title })
    return videoDetailsExist
}

export const checkVideoItemExist_DB = async function (title) {
    const videoItemExist = await VideoItem.findOne({ title: title })
    return videoItemExist
}

export const saveVideoItem = async function (data) {
    const videoItem = new VideoItem(data)
    await videoItem.save()
}

export const saveVideoDetail = async function (data) {
    const videoDetail = new VideoDetail(data)
    await videoDetail.save()
}

export const randomVideolist = async function () {
    const items = await VideoItem.aggregate([{ $sample: { size: 50 } }])
    return items
}



export const getVideoItemByPage = async function (page) {
    let skip = parseInt(page) * 40 - 40
    if (skip < 0) {
        skip = 0
    }
    const items = await VideoItem.find().sort({ 'date': -1 }).skip(skip).limit(40)
    return items
}



export const getVideoItemByCategory = async function (page, category) {
    let skip = parseInt(page) * 40 - 40
    if (skip < 0) {
        skip = 0
    }
    const items = await VideoDetail.find({ catergories: category }).sort({ 'date': -1 }).skip(skip).limit(40)

    let dataArray=[]
    for (let index = 0; index < items.length; index++) {
        const obj = await VideoItem.find({ title: items[index].title })
        dataArray.push(obj[0])
    }

    return dataArray
}

export const VIDEOITEMS_DB_COUNT = async function () {
    return VideoItem.count();
}


export const VIDEOITEMS_DB_COUNT_CATEGORY = async function (category) {
    const count = await VideoDetail.countDocuments({ catergories: category });
    return count;
};

