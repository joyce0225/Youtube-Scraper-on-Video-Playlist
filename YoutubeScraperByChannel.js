
function YoutubeScraperByChannel() {
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var videoSheet = spreadSheet.getSheetByName('Video Data') || spreadSheet.insertSheet('Video Data');
  var playlistSheet = spreadSheet.getSheetByName('Playlist Data') || spreadSheet.insertSheet('Playlist Data');
  
  var channelId = "UCWMIUw-t9xoiqZXJg-GJ9pg";  // Replace with your Channel ID
  
  // Get channel's upload playlist ID
  var channelInfo = YouTube.Channels.list('contentDetails', {
    id: channelId
  });
  
  if (!channelInfo || !channelInfo.items || channelInfo.items.length === 0) {
    Logger.log("No channel found with the provided ID or API call failed.");
    return;
  }
  
  var uploadPlaylistId = channelInfo.items[0].contentDetails.relatedPlaylists.uploads;
  
  // Initialize arrays to store video results
  var videoResults = [];
  
  // Fetch videos with pagination
  var nextPageToken = '';
  do {
    var playlistVideos = YouTube.PlaylistItems.list('snippet', {
      playlistId: uploadPlaylistId,
      maxResults: 50,
      pageToken: nextPageToken
    });
    
    for (var i = 0; i < playlistVideos.items.length; i++) {
      var item = playlistVideos.items[i];
      var videoId = item.snippet.resourceId.videoId;
      var videoInfo = YouTube.Videos.list('statistics', { id: videoId }).items[0];
      
      var likeCount = videoInfo.statistics.likeCount;
      var viewCount = videoInfo.statistics.viewCount;
      
      // Format date
      var date = new Date(item.snippet.publishedAt);
      var formattedDate = Utilities.formatDate(date, "GMT", "dd/MM/yyyy");
      
      videoResults.push([
        item.snippet.title, 
        formattedDate, 
        likeCount, 
        viewCount,
        `https://www.youtube.com/watch?v=${videoId}`
      ]);
    }
    
    nextPageToken = playlistVideos.nextPageToken;
  } while (nextPageToken);
  
  // Initialize arrays to store playlist results
  var playlistResults = [];
  nextPageToken = '';
  do {
    var playlists = YouTube.Playlists.list('snippet', {
      channelId: channelId,
      maxResults: 50,
      pageToken: nextPageToken
    });

    playlistResults = playlistResults.concat(
      playlists.items.map((item) => [
        item.snippet.title, 
        `https://www.youtube.com/playlist?list=${item.id}`
      ])
    );

    nextPageToken = playlists.nextPageToken;
  } while (nextPageToken);
  
  // Write video metadata to the 'Video Data' sheet
  videoSheet.getRange(2, 1, videoResults.length, 5).setValues(videoResults);
  
  // Write playlist metadata to the 'Playlist Data' sheet
  playlistSheet.getRange(2, 1, playlistResults.length, 2).setValues(playlistResults);
  
  // Additional code to auto-resize Column A and count rows in 'Video Data' sheet
  var lastRowVideo = videoSheet.getLastRow();
  videoSheet.autoResizeColumn(1);
  videoSheet.getRange('I1').setValue('Total Videos:');
  videoSheet.getRange('I2').setValue(lastRowVideo - 1);
  
  // Additional code to auto-resize Column A and count rows in 'Playlist Data' sheet
  var lastRowPlaylist = playlistSheet.getLastRow();
  playlistSheet.autoResizeColumn(1);
  playlistSheet.getRange('I1').setValue('Total Playlists:');
  playlistSheet.getRange('I2').setValue(lastRowPlaylist - 1);
}
