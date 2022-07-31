const responseId = localStorage.getItem("responseId")
const IDtoHTML = document.getElementById('orderId').innerHTML = responseId
const removeID = localStorage.clear("responseId")