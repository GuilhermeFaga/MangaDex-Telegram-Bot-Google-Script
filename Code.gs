let telegram;

function Setup() {
  sheetSetup();
  telegram = new Telegram(BOT_TOKEN, "MangaDex Telegram Bot");
}

function onUpdate(message){
  if (message.from.is_bot) return;
  console.log(message);
  
  executeCommand(message);
}

function executeCommand(message){
  switch(message.text){
    case "/subscribe":
    case "/subscribe" + BOT_USERNAME:
      subscribe(message);
      break;
    case "/unsubscribe":
    case "/unsubscribe" + BOT_USERNAME:
      unsubscribe(message);
      break;
    default:
      break;
  }
}

function subscribe(message){
  let chat = {
    chat_id: message.chat.id,
    type: message.chat.type
  }
  chat["name"] = message.chat.type == "group" ? message.chat.title : message.chat.username;
  
  if (storeChat(chat)) {
    telegram.sendMessage(chat.chat_id, "Subscribed, I'll send updates every 10 minutes!");
  } else {
    telegram.sendMessage(chat.chat_id, "Already subscribed");
  }
} 

function unsubscribe(message){
  let chat = {
    chat_id: message.chat.id,
    type: message.chat.type
  }
  chat["name"] = message.chat.type == "group" ? message.chat.title : message.chat.username;
  
  if (deleteChat(chat)) {
    telegram.sendMessage(chat.chat_id, "Unsubscribed");
  } else {
    telegram.sendMessage(chat.chat_id, "Already unsubscribed");
  }
}