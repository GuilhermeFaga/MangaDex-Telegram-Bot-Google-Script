let chats_sheet = "Chats";

function sheetSetup(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (ss.getSheetByName(chats_sheet)) return;
  
  let sheet = ss.insertSheet(chats_sheet);
  let header = ["chat_id", "type", "name"];
  let range = sheet.getRange(1, 1, 1, header.length);
  range.setValues([header]);
  sheet.setFrozenRows(1);
  range.createFilter().sort(1, true);
}

function storeChat(chat){
  if (getChatByID(chat.chat_id)) return 0;
  
  writeObjectListToSheet(chat, chats_sheet);
  return 1;
}

function deleteChat(chat){
  let chatFromSheet = getChatByID(chat.chat_id);
  if (!chatFromSheet) return 0;
  deleteObjectFromSheets(chats_sheet, chatFromSheet.row_id);
  return 1;
}

function getChatByID(id){
  let chats = getObjectsFromSheets(chats_sheet);
  for (let i = 0; i < chats.length; i++) 
    if (chats[i].chat_id == id) {
      chats[i]["row_id"] = i + 2; 
      return chats[i];
    }
  return;
}

function getChats(){
  return getObjectsFromSheets(chats_sheet);
}