// recherche de l'id dans l'URL
let params = new URLSearchParams(document.location.search);
let idProduit = params.get("id");

// appel des données
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/teddies/' + idProduit);

//mise en forme des données avec insertion dans la page
request.onload = function() {
  var ted = JSON.parse(request.response);

  // sélection des couleurs
  let select = "<select id='couleur'>";
  ted.colors.forEach((item, i) => {
    select +="<option>" + item + "</option>";
  });
  select += "</select>";

  // sélection des quantités
  let option = "<select id='qty'>";
  for((let i = 0; i < 9; i++) => {
    option +="<option>" + i + "</option>";
  });
  option += "</select>";


  document.getElementById("tedArticle").innerHTML += `
                <div id="teddy">
                <div class="articleIMG">
                <img class="img-container" src='${ted.imageUrl}'/>
                </div>
                <div class="optionArt">
                <h3>${ted.name}</h3></br>
                <h4>${ted.description}</h4> </br>
                ${select}</br>
                <h3>${ted.price/100 + "€"}</h3></br>
                ${option}</br>
                <a id="btnProduct" class="add-to-cart" href = 'produit.html?id=${ted._id}'><span> Commander </span></a></br>
                </div> </div></br>`;

                //mise en place du LocalStorage
                document.getElementById("btnProduct").addEventListener("click", e => {
                  e.preventDefault();
                  let couleurId = document.getElementById("couleur");
                  const article = {
                    id: ted._id,
                    name: ted.name,
                    color: couleurId.options[couleurId.selectedIndex].text,
                    price: ted.price/100
                  }

                  let panier = JSON.parse(localStorage.getItem('panier')) ?? [];
                  panier.push(article);
                    window.localStorage.setItem('panier', JSON.stringify(panier));
                    alert("L'article est ajouté à votre panier")
                })

              };
              request.send();

// envoi de la requete au serveur
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:3000/api/teddies");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(jsonBody));