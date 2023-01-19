What is the structure of a podcast RSS feed's XML?

This is harder to find than you would think, as 90% of search results are how to
generate an RSS feed on this or that podcast hosting service.

**Found good intel**: https://www.podcast411.com/howto_1.html

Must have artwork
Must have at least one episode

# XML Declaration
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"  xmlns:content="http://purl.org/rss/1.0/modules/content/">
```

Each episode must have a unique GUID which never changes (This can be done with uuid v5, with the uuid npm package)

Each episode is in a `<enclosure>` tag and includes it's three required components
- URL
- length
- type