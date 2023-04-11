const obj = [
    {
        id: "00A",
        name: "articulo",
        img: "../img/xx.png",
        stoke: 20,
        price: 10000
    },
    {
        id: "00B",
        name: "articulo",
        img: "../img/xx.png",
        stoke: 20,
        price: 10000
    },
    {
        id: "00C",
        name: "articulo",
        img: "../img/xx.png",
        stoke: 20,
        price: 10000
    },
    {
        id: "00D",
        name: "articulo",
        img: "../img/xx.png",
        stoke: 20,
        price: 10000
    },
    {
        id: "A00",
        name: "articulo",
        img: "../img/xx.png",
        stoke: 20,
        price: 10000
    },
    {
        id: "B00",
        name: "articulo",
        img: "../img/xx.png",
        stoke: 20,
        price: 10000
    },
    {
        id: "C01",
        name: "articulo",
        img: "../img/xx.png",
        stoke: 20,
        price: 10000
    },
]
// fetch("../JSON/item.json")
//     .then((response) => response.json())
//     .then((data) => console.log(data)


//     )

let items = [];

//Se lee el JSON local donde esta toda la información
fetch("../JSON/item.json")
    .then((response) => {
        items = response.json();
        return items;
    })
    .then((items) => {
        print(items)
    })
    .catch((error) => console.log(error))
    .finally(() => console.log("ok"));


//Se lee lo que retorna la petición GET del la lectura del JSON    
function print(data) {

    drawHTML();                      //Función que crea la estrcutura HTML
    drawProduct(data);
    // if(data[1] === true){
    console.log(items);
    // }else{
    //     draw();
    // }
}

const drawHTML = () => {
    const c = document.querySelector("#c");             //Se llama el id del HTML

    //*******************************************STRUCTURE***********************************************/
    const nav = document.createElement("nav");          //se crea elemento para la navegación
    nav.className = "navegator";
    nav.id = "nave";
    const content = document.createElement("section");  //Se crea elemento para contener todo la info
    content.className = "container";
    content.id = "cont";
    const foot = document.createElement("footer");      //se crea elemento para el pie de pagina
    foot.className = "end";
    foot.id = "foot";

    c.append(nav);
    c.append(content);
    c.append(foot);

    //*****************************************CONTENT PRINCIPAL***************************************** */
    //Se añade elementos en el contenedor con nombre "content", donde ira distribuida la información
    const S1 = document.createElement("section");       //Se crea sección para buscar y filtrar
    S1.className = "sec_search";
    S1.id = "S1";
    const S2 = document.createElement("section");       //Se crea seción para anidar toda la info
    S2.className = "sec_principal";
    S2.id = "S2";

    content.append(S1);
    content.append(S2);

    //Dentro del la sección con id "S1" se va a agraupar la parte del buscador y el logueo del usuario
    const S11 = document.createElement("section");      //Sección de buscar
    S11.className = "search";
    S11.id = "SS";
    const S12 = document.createElement("section");      //Sección del usuario
    S12.className = "user";
    S12.id = "uu";

    S1.append(S11);
    S1.append(S12);

    const divSearch = document.createElement("div");
    divSearch.className = "divSearch";
    const divUser = document.createElement("div");
    divUser.className = "divUser";
    const divAcount = document.createElement("div");
    divAcount.className = "divAcount";

    S11.append(divSearch);
    S12.append(divAcount);
    S12.append(divUser);

    //Dentro de la sección con id "S2" se va a concaternar toda la información de los productos y la compra
    const S21 = document.createElement("section");
    S21.className = "content";
    S21.id = "product";
    const S22 = document.createElement("section");
    S22.className = "market";
    S22.id = "buy";

    S2.append(S21);
    S2.append(S22);

    const S22Nav = document.createElement("div");
    S22Nav.id = "BuyNave";
    const S22Inf = document.createElement("div");
    S22Inf.id = "BuyInfo";
    const S22Foo = document.createElement("div");
    S22Foo.id = "BuyFooter";

    S22.append(S22Nav);
    S22.append(S22Inf);
    S22.append(S22Foo);

    //**********************************************FOOTER*************************************/
    //Se añade en el footer las redes sociales
    const face = document.createElement("div");
    face.className = "redesSociales";
    face.id = "facebook";
    const youtube = document.createElement("div");
    youtube.className = "redesSociales";
    youtube.id = "youtube";
    const insta = document.createElement("div");
    insta.className = "redesSociales";
    insta.id = "insta";

    foot.append(face);
    foot.append(youtube);
    foot.append(insta);
}//End FUNCTION drawHTML


// Se recorre el objeto que proporcional la lectura del JSON, y se genera en estructura HTML
function drawProduct(object) {
    const product = document.getElementById("product");
    const span = ``;

    for (const i of object) {
        const item = document.createElement("div");
        item.className = "item";
        item.id = `div_${i.id}`;
        item.innerHTML += `
            <h2>${i.name}</h2>
            <img src="${i.img}" alt="">
            <h3> $ ${i.price}</h3>
            <p class="show" id=p_${i.id}></p>
            <div class="input" id=divInput${i.id}>
                <input class="account" id=inputb_${i.id} type="number" min="1" max="100" value="1">
                <button class="+" id=b_${i.id}+ onclick="RegisterAmount(event)">+</button>
                <button class="-" id=b_${i.id}- onclick="RegisterAmount(event)">-</button>
            </div>
            <div class="input" id=divBtn${i.id}>
                <span class="iconify" id=${i.id} onclick=addBuy(event) data-icon="mdi:shopping-cart-arrow-down" style="color: white;"></span>
            </div>
            
            
            `;
        product.append(item);
    }
}//End FUNCTION drawProduct

//<p class="show" id=${i.id}><strong>${i.stoke}</strong></p>
//<span class="iconify" data-icon="mdi:shopping-cart-arrow-down" style="color: white;"></span>


