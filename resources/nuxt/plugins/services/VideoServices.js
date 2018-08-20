class AssetVideoServices {
    processVideoData(videos) {
        if (typeof videos.data == 'object') {
            videos.data = Object.values(videos.data);
        }
        let allVideos = [];
        videos.data.forEach((video) => {
            video[0].video.final_price = video[0].final_price;
            video[0].video.platform = video[0].platform;
            video[0].video.type = video[0].type;
            video[0].video.length = video[0].length;
            video[0].video.collection_video_id = video[0].id;
            video[0].video.collection_status = video[0].status;
            video[0].video.license_ends_at = video[0].license_ends_at;
            allVideos.push(video[0].video);
        });
        return allVideos;
    }
}

export default AssetVideoServices = new AssetVideoServices();
