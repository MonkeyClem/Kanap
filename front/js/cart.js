let fromJS = JSON.parse(window.localStorage.getItem("idJSON"))
console.log(fromJS)

// Séléction de la classe dans laquelle l'HTML vas être injecté 

const addHTML = document.querySelector("#cart__items")
console.log(addHTML)

// Si le panier est vide : afficher 'Le panier est vide'

if(fromJS === null){
    const emptyBasket = `
    <div style = "padding-top: 90px; display: flex; text-align: center; place-content: center;">
        <div>Votre panier est vide ! N'hésitez pas à le meubler...</div>
    </div>
    `;
    addHTML.innerHTML = emptyBasket
    console.log('Le panier de l\'utilisateur est actuellement vide')
}else{
    //Si le panier n'est pas vide : afficher les produits du Local Storage 
    console.log('Je ne suis pas vide')
    let structureProduitPanier = [];

    for (k = 0; k < fromJS.length; k++){
        console.log(`Le nombre de produit présent dans le panier est de : ` + fromJS.length)
        
        structureProduitPanier = structureProduitPanier + `

            <article class="cart__item" data-id="${fromJS[k].selectedProduct_id}" data-color="${fromJS[k].option_produit}">
              <div class="cart__item__img">
                <img src="${fromJS[k].image}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${fromJS[k].name}</h2>
                  <p>${fromJS[k].option_produit}</p>
                  <p class = "item_price">€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div id="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${fromJS[k].quantite}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <button class="deleteItem">Supprimer</button>
                  </div>
                </div>
              </div>
            </article> 
          `;
    }
    
        if(k === fromJS.length){
            //Injection HTML dans la page panier 
            addHTML.innerHTML = structureProduitPanier
          }

          
}
//L'inclusion du prix 


          
/*-------------------------------------------------------LA SUPPRESSION DE PRODUIT(S)------------------------------------------------------------*/

function getProduct(fromJS , callback){
        const newArr = []
          for(i = 0 ; i < fromJS.length ; i ++){
            console.log(fromJS[i])
            newArr.push(callback(fromJS[i]))
          }
          return newArr
}

let someProduct = []

const removeProduct =  async(addHTML) => {
  await addHTML;
  let deleteButtons = document.querySelectorAll('.deleteItem')
  console.log(deleteButtons)
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      console.log(deleteButton)
      let totalToRemove = fromJS.length
      console.log(totalToRemove); 
      let closestData = deleteButton.closest('article')
      if(totalToRemove == 1){
          return localStorage.removeItem('idJSON'),
          console.log("Plus aucun article dans le panier"),
          alert('Votre panier est désormais vide'),
          window.location.href = '../html/cart.html'
      }else{
          console.log("xx")
          someProduct = fromJS.filter(produit => {
            if(closestData.dataset.id != produit.selectedProduct_id ||
              closestData.dataset.color != produit.option_produit){
                console.log('vrai')
                return true
              }
            }
          )
          console.log(someProduct)
          localStorage.setItem("idJSON", JSON.stringify(someProduct))
          console.log("Remove le produit séléctionné")
          alert('Ce produit a supprimé du panier')
          window.location.href = '../html/cart.html'
      }
    })
  })
}

removeProduct()

/// LE CHANGEMENT DE QUANTTITE 
const changeQuantity =  async(addHTML) => {
  await addHTML;
  let quantitys = document.querySelectorAll('input.itemQuantity')
  console.log(quantitys)
  quantitys.forEach((quantity) => {
    quantity.addEventListener('change', () => {
      console.log("OK")
      let closestInput = quantity.closest('input')
      console.log (closestInput)
      console.log(closestInput.value)
      let closestData = quantity.closest('article')
      console.log(closestData)
      console.log(closestData.dataset)
      const filtrage = fromJS.filter(produit => produit.selectedProduct_id === closestData.dataset.id)
      console.log(filtrage)
      const foundSameOption = filtrage.find(produit => produit.option_produit === closestData.dataset.color)
      console.log(foundSameOption)
          if(foundSameOption.option_produit === closestData.dataset.color){
            console.log('ok')
            const toNumber = parseInt(closestInput.value)
            foundSameOption.quantite = toNumber
            console.log(foundSameOption)
            console.log(fromJS)     
            localStorage.setItem("idJSON", JSON.stringify(fromJS))
            totalProducts.innerHTML = totalQuantity
            //Mise à jour du prix total lors de la modification des produits
            const resultPrice = callbackTotalPrices (fromJS, (val) => {
              return val.prix
            })
            const resultQuantity = callbackTotalPrices (fromJS, (val) => {
              return val.quantite
            })
            console.log(resultPrice)
            console.log(resultQuantity)
            totalPrice = 0 
            for(i = 0; i < resultPrice.length; i ++){
              totalPrices = totalPrice += resultPrice[i] * resultQuantity[i]
               console.log(totalPrices)
            }
            document.getElementById('totalPrice').innerHTML = totalPrices
            // window.location.href = '../html/cart.html'
          }

      }
  ) })
    }

changeQuantity()


//// LE NOMBRE TOTAL DE PRODUIT : 

if(fromJS){
function callbackTotalProducts (arr, callback){
  let newArr = []
  for(i = 0; i < arr.length; i ++){
    newArr.push(callback(arr[i]))
  }
  return newArr
}


const result = callbackTotalProducts (fromJS, (val) => {
  return val.quantite
})

console.log(result)
totalQuantity = 0 
for(i = 0; i < result.length; i ++){
   console.log(totalQuantity += result[i])
}

console.log(totalQuantity)
const totalProducts = document.getElementById('totalQuantity')
totalProducts.innerHTML = totalQuantity
}
else{
  const totalProducts = document.getElementById('totalQuantity')
  totalProducts.innerHTML = totalQuantity = 0

}

////// LE FORMULAIRE 

//Nous commençons par récupérer chaque input 
let prenom = document.getElementById('firstName')
let nom = document.getElementById('lastName')
let email = document.getElementById('email')
let adresse = document.getElementById('address')
let ville = document.getElementById('city')
let commander = document.getElementById('order')

console.log(prenom.value)
console.log(nom)
console.log(adresse)

//Création d'un objet tableau dans lequel nous stockerons les informations du contact
let valuePrenom, valueNom, valueEmail, valueAdresse, valueVille

//LES REGEX
//1- Le prénom 
prenom.addEventListener('input', function (e) {
  valuePrenom
  if(e.target.value.length === 0){
    console.log('rien dans le champ prénom')
    valuePrenom = null
    console.log(valuePrenom)
  }
  else if(e.target.value.length < 3 || e.target.value.length > 25){
    firstNameErrorMsg.innerHTML =  "La valeur doit être comprise entre 2 et 25 caractères"
    valuePrenom = null
    console.log("Trop court ou trop long")
  }
  if(e.target.value.match(/^[a-z A-Z éèèuàaêô -]{2,25}$/)) {
    firstNameErrorMsg.innerHTML =  ""
    valuePrenom = e.target.value
    console.log("succes")
    console.log(valuePrenom)
  }
  if(e.target.value.match(/[0-9]{2,25}$/)) {
    firstNameErrorMsg.innerHTML =  "Prénom ne peut pas contenir de chiffre"
    valuePrenom = null
    console.log("Présence de chiffre détectées")
    console.log(valuePrenom)
  }
});

//2- Le Nom
nom.addEventListener('input', function (e) {
  valueNom
  if(e.target.value.length === 0){
    console.log('rien dans le champ Nom')
    valueNom = null
    console.log(valueNom)
  }
  else if(e.target.value.length < 3 || e.target.value.length > 25){
    lastNameErrorMsg.innerHTML =  "La valeur du nom doit être comprise entre 2 et 25 caractères"
    valueNom = null
    console.log("Trop court ou trop long")
  }
  if(e.target.value.match(/^[a-z A-Z éèèuàaêô -]{2,25}$/)) {
    lastNameErrorMsg.innerHTML =  ""
    valueNom = e.target.value
    console.log("succes")
    console.log(valueNom)
  }
  if(e.target.value.match(/[0-9]{2,25}$/)) {
    lastNameErrorMsg.innerHTML =  "Un nom ne peut pas contenir de chiffre"
    valueNom = null
    console.log("Présence de chiffre détectées")
    console.log(valueNom)
  }
}
)

//L'adresse 

adresse.addEventListener('input', function (e) {
  valueAdresse
  if(e.target.value.length === 0){
    console.log('rien dans le champ Adresse')
    valueAdresse = null
    console.log(valueAdresse)
  }
  else if(e.target.value.length < 2 || e.target.value.length > 100){
    addressErrorMsg.innerHTML =  "L'adresse doit comptée au moins 2 caractères"
    valueAdresse = null
    console.log("Trop court ou trop long")
  }
  if(e.target.value.match(/^[0-9 a-z A-Z éèèuàaêô ,/;:-]{2,50}$/)) {
    addressErrorMsg.innerHTML =  ""
    valueAdresse = e.target.value
    console.log("succes")
    console.log(valueAdresse)
  }
}
)

//La ville 

ville.addEventListener('input', function (e) {
  valueVille
  if(e.target.value.length === 0){
    console.log('rien dans le champ Adresse')
    valueVille = null
    console.log(valueVille)
  }
  else if(e.target.value.length < 2 || e.target.value.length > 45){
    cityErrorMsg.innerHTML =  "L'adresse doit comptée au moins 2 caractères"
    valueVille = null
    console.log("Trop court ou trop long")
  }
  if(e.target.value.match(/^[a-z A-Z éèèuàaêô ,/;:-]{2,45}$/)) {
    cityErrorMsg.innerHTML =  ""
    valueVille = e.target.value
    console.log("succes")
    console.log(valueVille)
  }
  if(e.target.value.match(/[0-9 +%.;]{2,45}$/)){
    cityErrorMsg.innerHTML =  "Une ville ne peut pas contenir de chiffre"
    valueVille = null
    console.log("Présence de chiffre détectées")
    console.log(valueVille)
  }
}
)

//L'adresse email 
email.addEventListener('input', (e) => {
  valueEmail
  if(e.target.value.length === 0){
    emailErrorMsg.innerHTML=""
    valueEmail = null
    console.log(valueEmail)
  }
  else if(e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailErrorMsg.innerHTML="";
    valueEmail = e.target.value
    console.log(valueEmail)
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
    ) {
    emailErrorMsg.innerHTML="Adresse e-mail incorrecte. Exemple du format attendu 'clementjeulin@gmail.com";
    valueEmail = null
    }
})

////LA COMMANDE
//Sélection de l'input par l'ID 

let order = document.querySelector('.cart__order__form')
console.log(order)

order.addEventListener('submit', (e)=> {
  e.preventDefault()
  console.log('get stopper')

  if(valuePrenom && valueNom && valueAdresse && valueEmail && valueVille
     ){
      console.log("C'est Parti, on envoie les données")
      const commandeFinal = JSON.parse(localStorage.getItem('idJSON'))
      let products = []
      commandeFinal.forEach((produit) => 
      products.push(produit.selectedProduct_id)
      );
    
      const toSend = {
        contact : {
          firstName : valuePrenom,
          lastName : valueNom,
          address : valueAdresse,
          city : valueVille,
          email : valueEmail,
        },
        products,
      }
      console.log(toSend)

      const promise = fetch('http://localhost:3000/api/products/order', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toSend),
      })
      //Pour voir le résultat du serveur dans la console.
      promise.then(async(response)=>{
        try{
          const contenu = await response.json();
          console.log(contenu)
          if(response.ok){
            //Récupération de l'ID de l'order
              console.log(contenu.orderId)
              localStorage.setItem('responseId', contenu.orderId)
            //Changement de page
              window.location = '../html/confirmation.html'
            }
        }catch(e){
          console.log(e)
        }
      })

    }
     else
     { alert('Remplir le formulaire correctement')}
  })
  

  if(fromJS){
  const fetchingPrice = fetch('http://localhost:3000/api/products')
          .then ((res) => res.json())
          .then ((res) =>{ data = res
            for(i = 0 ; i < fromJS.length ; i ++ ){
              console.log(data)
              console.log(fromJS[i])
              let getPrice = document.getElementsByClassName('item_price')
              console.log(getPrice)
              fetchedProduct = data.find(((element) => element._id === fromJS[i].selectedProduct_id))
              console.log(fetchedProduct)
              console.log(fetchedProduct.price)
              console.log(getPrice[i])
              let addPrice = getPrice[i].innerHTML = fetchedProduct.price / 10 + ' €'
        }
       }
      )
   }

   //CALCUL DU PRIX TOTAL
    if(fromJS){
    fetch('http://localhost:3000/api/products')
    .then ((res) => res.json())
    .then ((res) =>{ data = res
    for(i = 0 ; i < fromJS.length; i ++){
    const total = (fromJS[i].quantite)
    console.log(total)
    const findSameID = data.find(((element) => element._id === fromJS[i].selectedProduct_id))
    const totalPrice = (findSameID.price * fromJS[i].quantite / 10)
    document.getElementById('totalPrice').innerHTML = totalPrice
          }
        }
      )
    }else{
      document.getElementById('totalPrice').innerHTML = 0
    }