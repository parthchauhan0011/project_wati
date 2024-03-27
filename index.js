const WATI_API_ENDPOINT = "https://wati-server-demo5.clare.ai";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMWM3OTlkYy05MTZkLTRhMDMtYjJkOC0zM2FiMDFlYTI4YWEiLCJ1bmlxdWVfbmFtZSI6ImphaG5hdmlAY2xhcmUuYWkiLCJuYW1laWQiOiJqYWhuYXZpQGNsYXJlLmFpIiwiZW1haWwiOiJqYWhuYXZpQGNsYXJlLmFpIiwiYXV0aF90aW1lIjoiMDgvMDcvMjAyMyAwODo0MTo0MCIsImRiX25hbWUiOiJ3YXRpX2RlbW81IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiRVhURVJOQUxfQURNSU5JU1RSQVRPUiIsImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.NWhHNWCgRmwj0xGwq2GzMxkSMhaDbDjuizoU68jduRI";


const sendTemplateMessage = function(event) {    
    
    event.preventDefault(); 
    var list = [];
    var wpNoArr = [];
    var finalObj = [];
    
    var total = document.querySelectorAll('input[id*="name"]').length;
    //console.log(total);

    for(var i=0;i<total;i++){
    var tempObj = {};
    var name = document.getElementById("name"+i).value;
    var phoneNo = document.getElementById("phone"+i).value;

    let regexPattern = /^\d{10}$/;
    let isValidPhone = regexPattern.test(phoneNo);    

    if(name.length === 0) {
        alert("Name is Empty");
        return;
    }

    if(!isValidPhone) {
        alert("Enter a 10 digit WhatsApp number");
        return;
    }
    var contact = {name: 'name', value: name};
    var number = {name: 'number', value: phoneNo};
    var wpNo = {whatsappNumber: '91'+phoneNo}
    list.push(contact, number);
    wpNoArr.push(wpNo);
    
    tempObj = {
    whatsappNumber: wpNoArr[i].whatsappNumber,  
    customParams: [contact, number]
    };

    finalObj.push(tempObj);
  
  }

  
    const options = {
        method: 'POST',
        headers: {
          'content-type': 'text/json',
          Authorization: AUTH_TOKEN
        },
        body: JSON.stringify({
          broadcast_name: 'Test_Broadcast_Wati',
          template_name: 'registration_confirmation',
          receivers: finalObj,          
        })
      };
      
      fetch(`${WATI_API_ENDPOINT}/api/v1/sendTemplateMessages`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        for(var i=0;i<total;i++){
      document.getElementById("name"+i).value = "";
      document.getElementById("phone"+i).value = "";
        }

}

document.getElementById("submitButton").addEventListener("click", sendTemplateMessage);