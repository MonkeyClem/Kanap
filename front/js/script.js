//Nous déclarons la constante servant à récupérer l'élément HTML ayant pour ID #item 
const items = (document.getElementById('items'))

//Fonction asynchrone, servant à récupérer les données présentes dans l'API, puis à les convertir au format Javascript 
//Les données au format Javascript sont stockées dans 
const fetchProduct = async () => {
  await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((res) => { 
      meubleData = res
      return meubleData
    })
}
fetchProduct()

//Une fois la fonction fetchProduct exécutée, nous injectons le HTML avec les données contenues 
//dans la variable meubleData, sur laquelle nous appliquons la méthode map afin de parcourir les données qui y sont présentes
const displayProduct = async () => {
  await fetchProduct()
  items.innerHTML = meubleData
    .map(
      (meuble) =>
        `<a href="./product.html?_id=${meuble._id}">
    <article class = "article">
        <img class="item__img" src = "${meuble.imageUrl}" alt = "${meuble.altTxt}" />
        <h3 class="productName">${meuble.name}</h3>
        <p class="productDescription">${meuble.description}</p>
    </article>
    </a>`,
    )
    .join(' ') // Application de la méthode join, afin de supprimer les apostrophres présentes entre chaque produit
}
displayProduct()

