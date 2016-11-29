function doCalendar()
{
    var settings = {
        
        contentType: 'application/json', 
        method: 'POST'
        
    }
    var request = $.ajax("/calendar" ,settings) ;
    request.fail(function(jqXHR, statusText, errorMessage)
    {
        console.log("ERROR "+JSON.parse(jqXHR.responseText).message);
    })
    request.done(function(data,status, jqXHR)
    {
        console.log("SUCCESS "+JSON.stringify(data))
    })
    
    
    
    
     
    
}

