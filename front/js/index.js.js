
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

        
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        console.log(data[0].name)
    })
    
    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        document.getElementById("productDescription").innerHTML = data[0].description
    })    

  
    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => 
        document.getElementById("productName").innerHTML = data[0].name
    )    
    var imageSelection = document.getElementById("item__img")
    
    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => imageSelection.src = data[0].imageUrl
    )    
    

  







