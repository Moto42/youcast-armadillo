# Youcast dev plans

A service to convert youtube playlists to podcasts, albums, and audiobooks

**Podcast first**, then albums, then mp4 audiobooks

## sources vs formats
We may want to extend this to include sources of audio other than youtube in the future

A _source_ is a place we go to get the audio, such as youtube, or soundcloud.

A _format_ is the manner in which the resulting audio is presented, a raw MP3, A podcast RSS feed, or an audiobook, etc.

## Requirements

- The core progrm is extensible, we can add formats easily.
- Sources of audio are extensible, allowing us to ad more in the future
- the backend interactions with youtube are abstracted out such that if the Youtub API changes, it only breaks code in one file
- sources have a unified contract for retrieving playlists/audio, and other 'universal' functions
- the service presents a simple Rest API
- sources can present 'special functions' that are unique to that source.
    - Such as breaking a chapterized YT video into sections
- It is simple to add new sources to the service.
- It is simple to add new formats to the service.
- I can goto a page and enter my info, or I can go directly to the page/feed/url of an arbitrary video or playlist.
- I can add the resulting RSS feed to my podcast and use it like any other podcast.

## Possible sources

- apple podcasts
- archive.org
- youtube
- soundcloud

