function writeObjectListToSheet(obj, sheet, concat = true) {
  //escreve uma lista de objetos em uma planilha, onde as chaves do modelo de objetos são o header
  if (!Array.isArray(obj)) obj = [obj];
  if (obj.length < 1) return;

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getSheetByName(sheet);
  var header,
    body,
    data = [];
  header = Object.keys(obj[0]);
  body = obj.map((item) => Object.values(item));
  if (!concat) {
    data.push(header);
    sheet.clearContents();
  }
  data = data.concat(body);
  let row = !concat ? 1 : sheet.getLastRow() + 1,
    column = 1;
  var range = sheet.getRange(row, column, data.length, header.length);
  range.setValues(data);
}

function getObjectsFromSheets(sheetName, row=null) {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  let lastrow = row?row:ss.getLastRow();
  let values;
  if(row==null) values = ss.getRange(1, 1, ss.getLastRow(), ss.getLastColumn()).getValues();
  else{
    //header,row
    values = [ss.getRange(1,1,1,ss.getLastColumn()).getValues()[0],ss.getRange(row,1,1,ss.getLastColumn()).getValues()[0]];
  } 
  let header = values.shift();

  return values.map(function (row) {
    let item = {};
    header.forEach((h, i) => {
      item[h] = row[i];
    });
    return item;
  });
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

function deleteObjectFromSheets(sheetName, rowPosition) {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  ss.deleteRow(rowPosition);
}

function fixCharset(string) {
  //Corrige erros de decodificação de string para ç, ^, `, &, e '

  return string
    .replace(/&#39;/g, "'")
    .replace(/&ccedil;/g, "ç")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&atilde;/g, "ã")
    .replace(/&otilde;/g, "õ")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&acirc;/g, "â")
    .replace(/&ecirc;/g, "ê")
    .replace(/&ocirc;/g, "ô");
}