function Telegram(token, user_agent) {
  this.token = token;
  this.user_agent = user_agent;
  this.commands = this.getMyCommands();
  this.updates = this.getUpdates();
}

function TimeTrigger(){
  Setup();
  telegram.onUpdate();
}

Telegram.prototype.onUpdate = function(){
  let telegram = this;
  this.updates.map(function (update) {
    telegram.getUpdates(update.update_id);
    onUpdate(update.message);
  });
};

Telegram.prototype.getUpdates = function (update_id) {
  var payload;
  if (update_id) payload = { offset: update_id + 1 }
  let response = this.request("getUpdates", payload);
  if (!response.ok) return null;
  
  var updates = [];
  response.result.map(update => updates.push(update));
  
  return updates;
}

Telegram.prototype.sendMessage = function (chat_id, text, parse_mode, disable_web_page_preview, disable_notification, reply_to_message_id, reply_markup) {
  
  let payload = {
    chat_id: chat_id,
    text: text
  };
  
  if (parse_mode) payload["parse_mode"] = parse_mode;
  if (disable_web_page_preview) payload["disable_web_page_preview"] = disable_web_page_preview;
  if (disable_notification) payload["disable_notification"] = disable_notification;
  if (reply_to_message_id) payload["reply_to_message_id"] = reply_to_message_id;
  if (reply_markup) payload["reply_markup"] = reply_markup;
  
  return this.request("sendMessage", payload);
}

Telegram.prototype.sendPhoto = function (chat_id, photo, caption, parse_mode, disable_notification, reply_to_message_id, reply_markup) {
  
  let payload = {
    chat_id: chat_id,
    photo: photo
  };
  
  if (caption) payload["caption"] = caption;
  if (parse_mode) payload["parse_mode"] = parse_mode;
  if (disable_notification) payload["disable_notification"] = disable_notification;
  if (reply_to_message_id) payload["reply_to_message_id"] = reply_to_message_id;
  if (reply_markup) payload["reply_markup"] = reply_markup;
  
  return this.request("sendPhoto", payload);
}

Telegram.prototype.setMyCommands = function (commands) {
  let payload = {
    commands: commands
  };
  return this.request("setMyCommands", payload);
}

Telegram.prototype.getMyCommands = function () {
  return this.request("getMyCommands");
}

Telegram.prototype.request = function (func, payload, method = "GET") {
  let url = `https://api.telegram.org/bot${this.token}/${func}`;
  let header = {
    "User-Agent": this.user_agent,
  };
  
  let options = {
    method: method,
    headers: header,
  };
  
  if (payload) {
    header["Content-Type"] = "application/json";
    method = "POST";
    options["payload"] = JSON.stringify(payload);
  }
  
  let response;
  try {
    response = UrlFetchApp.fetch(url, options);
    let code = response.getResponseCode();
    if (code != 200 && code != 204) throw { error: code };
    console.log(`endpoint: ${func}    http response: ${code}`);
    if(code==204) return null;
    return JSON.parse(fixCharset(response.getContentText("UTF-8")));
  } catch (error) {
    console.error(error);
  }
}