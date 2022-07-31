//Récupération de la chaine de requête dans l'URL
const queryString_url_id = window.location.search
console.log(queryString_url_id)

const urlSearchParams = new URLSearchParams(queryString_url_id)
console.log(urlSearchParams)

const _id = urlSearchParams.get('_id')
console.log(_id)

//----------------------------L'AFFICHAGE DU PRODUIT SELECTIONNE PAR L'UTILISATEUR, AVEC LES INFORMATIONS CORRESPONDANTES----------------------------//
//-------Déclaration de la fonction servant à afficher le produit
function dislpaySelectedProduct() {
  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((res) => {
      data = res
      const selectedProduct_id = data.find((meuble) => meuble._id === _id)
      console.log(selectedProduct_id)

      document.getElementById('item').innerHTML = `
                    <article>
                        <div class="item__img">
                        <img src="${selectedProduct_id.imageUrl}" alt="${selectedProduct_id.altTxt}">
                        </div>
                        <div class="item__content">

                        <div class="item__content__titlePrice">
                            <h1>${selectedProduct_id.name}</h1>
                            <p>Prix : <span id="price"></span> €</p>
                        </div>

                        <div class="item__content__description">
                            <p class="item__content__description__title">Description :</p>
                            <p id="description"><p>${selectedProduct_id.description}</p>
                        </div>

                        <div class="item__content__settings">
                            <div class="item__content__settings__color">
                            <label for="color-select">Choisir une couleur :</label>
                            <select name="color-select" id="colors">

                            </select>
                            </div>

                            <div class="item__content__settings__quantity">
                            <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                            <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                            </div>
                        </div>

                        <div class="item__content__addButton">
                            <button id="addToCart">Ajouter au panier</button>
                        </div>

                        </div>
                    </article>
                    `
      const optionColors = selectedProduct_id.colors
      let structureColors = []

      for (let j = 0; j < optionColors.length; j++) {
        structureColors =
          structureColors +
          `<option value="${j + 1}">${optionColors[j]}</option>`
      }
      console.log(structureColors)
      const positionColorOptions = document.querySelector('#colors')
      positionColorOptions.innerHTML = structureColors
    })
}
//Nous appellons la fonction
dislpaySelectedProduct()

//------------------------------------- LA GESTION DU PANIER -------------------------------------//

//Récupérer les données séléctionnées par l'utilisateur afin de les envoyer vers le panier
//Récupération des données de l'API :
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((res) => {
    data = res
    //Séléction de l'ID du formulaire
    const selectedProduct_id = data.find((element) => element._id === _id)
    console.log(selectedProduct_id)

    let idForm = document.querySelector('#colors')
    let quantity = document.querySelector('#quantity')
    const btn_addToCart = document.querySelector('#addToCart')

    /*LE ADD EVENT LISTENER*/
    //Ecouter le bouton et envoyer vers le panier
    btn_addToCart.addEventListener('click', (event) => {
      event.preventDefault()
      //Mettre le choix de l'utilisateur dans une variable
      const choixForm = idForm.value
      //Mettre la quantité dans une variable
      let choixQuantity = quantity.value
      const produitSelectionne = selectedProduct_id._id
      console.log(produitSelectionne)

      //Récupération des valeurs du formulaire au sein de la variables "optionsProduit"
      optionsProduit = {
        name: selectedProduct_id.name,
        selectedProduct_id: selectedProduct_id._id,
        option_produit: choixForm,
        quantite: choixQuantity,
        image: selectedProduct_id.imageUrl,
      }
      console.log(optionsProduit)

      fromJSON = localStorage.getItem('idJSON')

      function addToArray() {
        fromJS.push(optionsProduit)
        localStorage.setItem('idJSON', JSON.stringify(fromJS))
        window.alert("Le produit vient d'être ajouté à votre panier")
      }
      function sameId(product) {
        return product.selectedProduct_id === optionsProduit.selectedProduct_id
      }

      if (fromJSON) {
        fromJS = JSON.parse(fromJSON) //On ajoute dans le tableau JS les produits déjà présents dans le storage
        for (i = 0; i < fromJS.length; i++) {
          //Nous initions la variable i
          if (optionsProduit.quantite === '0') {
            console.log('quantité nulle')
            alert('Le quantité séléctionnée est de 0')
            break
          } else if (
            optionsProduit.selectedProduct_id !== fromJS[i].selectedProduct_id
          ) {
            console.log('Ce produit ne se trouve pas sur cette ligne') //Pour chaque i de from JS
            const quantityToNumber = parseInt(optionsProduit.quantite)
            optionsProduit.quantite = quantityToNumber
            let foundSameID = fromJS.find(sameId)
            console.log(foundSameID)
            if (foundSameID === undefined) {
              // Si undefined nous est retourné, c'est que l'ID n'est présent sur aucune ligne du tableau
              addToArray() //Nous ajoutons donc le produit au panier
              console.log("Le produit vient d'être ajouté au tableau")
              break //Puis nous sortons de la boucle for
            } else {
              // Si find retourne une valeur, alors c'est que l'ID produit est déjà présent dans le tableau. Nous passons donc sur le else IF
            }
          } else if (
            optionsProduit.selectedProduct_id === fromJS[i].selectedProduct_id
          ) {
            //Si l'ID du produit séléctionné est présent sur la ligne en cours d'analyse
            console.log('Même ID')
            let foundSameID = fromJS.find(sameId) // Alors nous utilisons la méhode find afin de retourner le premier élément ayant le même ID
            if (foundSameID.option_produit === optionsProduit.option_produit) {
              // Si cet élément possède la même option produit
              console.log('Même ID, même option')
              console.log(foundSameID)
              let quantityToNumber = parseInt(optionsProduit.quantite) // Nous convertissons la quantite du produit sélectionné en nombre
              let quantityToNumberBis = parseInt(foundSameID.quantite) // Nous convertissons la quantite du produit retourné par la méthode find en nombre
              foundSameID.quantite = quantityToNumber += quantityToNumberBis // Nous additionnons les deux quantités ci-dessus afin d'obtenir le nouveau nombre total de produit avec le même ID / même options
              localStorage.setItem('idJSON', JSON.stringify(fromJS)) //Pour finir, nous mettons à jour le localStorage
              break // Puis nous sortons de la boucle for
            } else if (
              foundSameID.option_produit !== optionsProduit.option_produit
            ) {
              //Si le produit retourné par find possède bien le même ID, mais avec une option différente :
              console.log('Même ID, mais avec une option différente')
              const filtrage = fromJS.filter(
                (produit) =>
                  produit.selectedProduct_id ===
                  optionsProduit.selectedProduct_id,
              ) //Alors on déclare la variable filtrage, qui utilise la méthode filter pour vérifier si un d'autres produits avec le même ID existe à travers le tableau fromJS
              const filtrageFindOption = filtrage.find(
                (element) =>
                  element.option_produit === optionsProduit.option_produit,
              ) //Puis on applique de nouveau la méthode find au sein de filtrage, pour vérifier si un élément avec la même option nous est retourné
              if (filtrageFindOption === undefined) {
                // Si aucun produit correspondant n'est trouvé :
                console.log('Aucun produit similaire trouvé')
                const toNumber = parseInt(optionsProduit.quantite)
                optionsProduit.quantite = toNumber
                addToArray() // Alors nous ajoutons le produit au panier
              } else if (
                filtrageFindOption.option_produit ===
                optionsProduit.option_produit
              ) {
                // Si find nous retourne un élément :
                console.log('même meuble, même couleur')
                let convertQuantity = parseInt(optionsProduit.quantite) // Alors nous convertissons en number la quantite du produit séléctionné
                let convertQuantityBis = parseInt(filtrageFindOption.quantite) // Puis nous faisons de même avec la quantite de l'élément retourné par find
                filtrageFindOption.quantite = convertQuantity += convertQuantityBis // Nous additionnons les 2 number ci-dessus afin d'obtegnir la quantité total
                localStorage.setItem('idJSON', JSON.stringify(fromJS)) // Puis nous mettons le localStorage à jour
              }
              break //Pour sortir de la boucle for, afin d'éviter une répétition pour chaque ligne du tableau
            }
          }
        }
      } else {
        if (optionsProduit.quantite === '0') {
          console.log('quantité nullee')
          alert('Le quantité séléctionnée est de 0')
        } else {
          fromJS = []
          console.log(optionsProduit.quantite)
          const toNumber = parseInt(optionsProduit.quantite)
          optionsProduit.quantite = toNumber
          addToArray()
          console.log('Premier produit ajouté au tableau')
        }
      }
    })
  })

// Récupération du prix produit dans l'API
const priceFetching = fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((res) => {
    data = res
    console.log(data)
    let fetchedProduct = data.find((element) => element._id === _id)
    console.log(fetchedProduct.price)
    document.getElementById('price').innerHTML = fetchedProduct.price / 10
  })
