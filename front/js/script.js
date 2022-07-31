const items = (document.getElementById('items'))

const fetchProduct = async () => {
  await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((res) => {
      console.log(res.length)
      meubleData = res
      console.log(meubleData)
      return meubleData
    })
}
fetchProduct()

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
    .join(' ')
}
displayProduct()

