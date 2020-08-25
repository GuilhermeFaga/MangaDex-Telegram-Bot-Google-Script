let TRIGGER_INTERVAL = 10; // in minutes
let MANGADEX_RSS = "your-rss"; // Paste here your RSS link

function timerTrigger() {
  Setup();
  main();
}

function main() {
  let mangas = getLatestMangas();
  
  if (!mangas) return;
  
  for (var i = 0; i < mangas.length; i++) {
    let manga = mangas[i];
    sendMangaToChats(manga);
  }
}

function getLatestMangas(){
  
  let mangaUrl = "https://mangadex.org/api/manga/";
  
  let response = request(MANGADEX_RSS, "GET", null, false);
  
  let regex = new RegExp(/<item>(.+?)<\/item>/sg);
  
  let mangaWhitelist //= getArrayFromSheets(FILTERS_SHEET, 1);
  
  if (!regex.test(response)) return null;
  
  let items = response.match(/<item>(.+?)<\/item>/sg);
  
  var mangas = [];
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (!item) continue;
    
    var manga = {
      date:  new Date(item.match(/<pubDate>(.+?)<\/pubDate>/s)[1]),
      manga_link: item.match(/<mangaLink>(.+?)<\/mangaLink>/s)[1],
      id: item.match(/<mangaLink>(.+?)<\/mangaLink>/s)[1].match(/title\/(.+)/)[1]
    };
    
    if (!(mangaIsNew(manga) && (!mangaWhitelist || mangaWhitelist.contains(manga.id)))) continue;
    
    var mangaDetails = request(mangaUrl + manga.id, "GET")["manga"];
    manga["link"] = item.match(/<link>(.+?)<\/link>/s)[1];
    manga["title"] = item.match(/<title>(.+?)<\/title>/s)[1];
    
    try {
      manga["title"] = manga.title.match(/.+ - (.+)/)[1];
    } catch (e) {
      console.log(manga.title);
      console.log(e);
    }
    
    var isDuplicated = false;
    
    for (let j = 0; j < mangas.length; j++) {
      const _manga = mangas[j];
      if (_manga.id != manga.id) continue;
      if (!_manga["chapters"]) _manga["chapters"] = [];
      _manga["chapters"].push(`<a href="${manga.link}">${manga.title}</a>\n`);
      isDuplicated = true;
      break;
    }
    
    if (isDuplicated) continue;
    
    manga["description"] = item.match(/<description>(.+?)<\/description>/s)[1].replace(/\s-\s/g, "\n");
    manga["manga_title"] = mangaDetails["title"] ? mangaDetails["title"] : "";
    manga["artist"] = mangaDetails["artist"] ? mangaDetails["artist"] : "";
    manga["author"] = mangaDetails["author"] ? mangaDetails["author"] : "";
    manga["lang"] = mangaDetails["lang_name"] ? mangaDetails["lang_name"] : "";
    if (mangaDetails["links"])
      manga["mal"] = mangaDetails["links"]["mal"] ? "https://myanimelist.net/manga/" + mangaDetails["links"]["mal"] : "";
    manga["cover_url"] = mangaDetails["cover_url"] ? "https://mangadex.org" + mangaDetails["cover_url"] : "";
    if (mangaDetails["rating"]){
      manga["rating"] = mangaDetails["rating"]["bayesian"] ? mangaDetails["rating"]["bayesian"] : "";
      manga["users"] = mangaDetails["rating"]["users"] ? mangaDetails["rating"]["users"] : "";
    }
    mangas.push(manga);
  }
  return mangas.reverse();
}

function mangaIsNew(manga){
  let diff = Math.abs((new Date() - manga.date)/60000);
  if (diff > TRIGGER_INTERVAL) return false;
  return true;
}

function sendMangaToChats(manga){
  let chats = getChats();
  if (!chats) return;
  
  var preDesc = "";
  var desc = "\n\n<b>------ Manga details ------</b>\n\n";
  
  if (manga["artist"]) desc += `<b>Artist:</b> ${manga.artist}\n`;
  if (((manga["author"] && manga["artist"]) && (manga["author"] != manga["artist"])) 
    || manga["author"] && !manga["artist"]) desc += `<b>Author:</b> ${manga.author}\n`; 
  if (manga["lang"]) desc += `<b>Language:</b> ${manga.lang}\n`;
  if (manga["mal"]) desc += `<a href="${manga.mal}">View on MAL</a>\n`;
  if (manga["rating"]) desc += `\n<b>Rating:</b> ${manga.rating} (${manga.users} reviews)`;
  if (manga["chapters"]) preDesc = manga["chapters"].join("") + "\n";
  
  let message = `<a href="${manga.manga_link}">${manga.manga_title}</a>\n\n<a href="${manga.link}">${manga.title}</a>\n${preDesc}${manga.description}${desc}`
  
  chats.map(function (chat){
    telegram.sendPhoto(chat.chat_id, manga.cover_url, message, "HTML");
  });
}