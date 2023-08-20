const mongoose = require('mongoose');

// Define the video schema
const videoItem_Schema = new mongoose.Schema({
    title: { type: String, unique: true }, // Make the title field unique
    duration: String,
    views: String,
    likePercent: String,
    thumbnail: String,
    screenshots: [String],
    href: String,
    number: String,
    date:Number
});

// Create the Video model
const VideoItem =mongoose.models.Video || mongoose.model('Video', videoItem_Schema);

module.exports = VideoItem;
