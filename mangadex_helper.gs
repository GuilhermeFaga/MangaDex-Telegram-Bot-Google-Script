function request(url, method, payload, json = true){
  
  let header = {
    'Content-Type': 'application/json'
  };
  
  let options = {
    method: method,
    headers: header
  };
  
  if (payload) options['payload'] = JSON.stringify(payload);
  
  let response;
  try {
    response = UrlFetchApp.fetch(url, options);
    let code = response.getResponseCode();
    if (code != 200 && code != 204) throw { error: code };
    console.log(`endpoint: ${url}    http response: ${code}`);
    if(code==204) return null;
    if (json) return JSON.parse(fixCharset(response.getContentText("UTF-8")));
    return response.getContentText("UTF-8");
  } catch (error) {
    console.error(error);
  }
}