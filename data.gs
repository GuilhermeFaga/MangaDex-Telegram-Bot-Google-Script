let commands = [ 
  {
    command: "subscribe",
    description: "Start receiving the manga updates"
  },
  {
    command: "unsubscribe",
    description: "Stop receiving the manga updates"
  }
];

let messages = {
  "ok": true,
  "result": [
    {
      "update_id": 483412965,
      "message": {
        "message_id": 6,
        "from": {
          "id": 108113494,
          "is_bot": false,
          "first_name": "Faga",
          "username": "GFaga",
          "language_code": "en"
        },
        "chat": {
          "id": 108113494,
          "first_name": "Faga",
          "username": "GFaga",
          "type": "private"
        },
        "date": 1598367575,
        "text": "a"
      }
    }
  ]
}

let r = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <atom:link href="https://mangadex.org/rss/QbWK2U7SFDuVtvfxGnMeRNdPcarTYq59" rel="self" type="application/rss+xml" />
        <title>MangaDex RSS</title>
        <link>https://mangadex.org/</link>
        <description>The latest MangaDex releases</description>
        <language>en</language>
        <ttl>30</ttl>
        <item>
            <title>A Strange World - Chapter 4</title>
            <link>https://mangadex.org/chapter/1006480</link>
            <mangaLink>https://mangadex.org/title/51838</mangaLink>
            <pubDate>Sun, 23 Aug 2020 18:35:18 +0000</pubDate>
            <description>Group: Twilight Scans - Uploader: GrimReaper007 - Language: English</description>
            <guid isPermaLink="true">https://mangadex.org/chapter/1006480</guid>
        </item>
        <item>
            <title>A Strange World - Chapter 3</title>
            <link>https://mangadex.org/chapter/1006480</link>
            <mangaLink>https://mangadex.org/title/51838</mangaLink>
            <pubDate>Sun, 23 Aug 2020 18:35:18 +0000</pubDate>
            <description>Group: Twilight Scans - Uploader: GrimReaper007 - Language: English</description>
            <guid isPermaLink="true">https://mangadex.org/chapter/1006480</guid>
        </item>
        <item>
            <title>A Strange World - Chapter 2</title>
            <link>https://mangadex.org/chapter/1006480</link>
            <mangaLink>https://mangadex.org/title/51838</mangaLink>
            <pubDate>Sun, 23 Aug 2020 18:35:18 +0000</pubDate>
            <description>Group: Twilight Scans - Uploader: GrimReaper007 - Language: English</description>
            <guid isPermaLink="true">https://mangadex.org/chapter/1006480</guid>
        </item>
        <item>
            <title>A Strange World - Chapter 1</title>
            <link>https://mangadex.org/chapter/1006480</link>
            <mangaLink>https://mangadex.org/title/51838</mangaLink>
            <pubDate>Sun, 23 Aug 2020 18:35:18 +0000</pubDate>
            <description>Group: Twilight Scans - Uploader: GrimReaper007 - Language: English</description>
            <guid isPermaLink="true">https://mangadex.org/chapter/1006480</guid>
        </item>
    </channel>
</rss>`
