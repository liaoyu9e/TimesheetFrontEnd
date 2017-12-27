export function parseQueryParams(query) {
    //You get a '?key=asdfghjkl1234567890&val=123&val2&val3=other'
    const queryArray = query.split('?')[1].split('&');
    let queryParams = {};
    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split('=');
      queryParams[key] = val ? val : true;
    }
    /* queryParams = 
       {
        key:"asdfghjkl1234567890",
        val:"123",
        val2:true,
        val3:"other"
       }
    */
    return queryParams;
  }