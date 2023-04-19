//*******************************VARIABLES GLOBALES************************************* */
let objProduct = [];        //Array donde se clonara lo devuelto por elo JSON
let objBasket = [];         //Array donde se añade lo seleccionado por el usuario
let objSend = [];           //Array donde se guarda lo vendido


let amount = 0;             //Variable donde se guarda el número de ITEMS seleccionados
let item;
let selectItems = 0;        //Se guarda la cantidad de veces que el cliente a seleccionado un produucto
let createBtn = 0;          //Se guarda el cambio cuando se elimina el boton de comprar
//*******************************VARIABLES GLOBALES************************************* */

// const product = [
//     {
//         id: "A00",
//         name: "CAMISA",
//         stockTake: 10,
//         sumItem: 0
//     },
//     {
//         id: "0B1",
//         name: "PANTALON",
//         stockTake: 5,
//         sumItem: 0
//     },
//     {
//         id: "0C2",
//         name: "MEDIAS",
//         stockTake: 15,
//         sumItem: 0
//     },
//     {
//         id: "003",
//         name: "BUSO",
//         stockTake: 7,
//         sumItem: 0
//     },
//     {
//         id: "Z69",
//         name: "ZAPATOS",
//         stockTake: 0,
//         sumItem: 0
//     }
// ];


//Se crea función para aumentar lo disminuir lo que va a comprar el usuarios
function RegisterAmount(event) {

    let n = event.target.id;
    let id = "";
    console.log(n);
    console.log("id: " + id);
    for (const j of n) {
        if ((j.charCodeAt(0) != 43) && (j.charCodeAt(0) != 45)) {
            id += j;
            console.log(j);
        }
    }
    console.log("id: " + id);
    let numberItems = document.getElementById("input" + id);
    id = "";
    let operation = event.target.className;
    amount = Number(numberItems.value);

    if (operation[0] === "+") {
        amount = Number(numberItems.value);
        amount++;
        numberItems.value = amount;
    } else if (operation[0] === "-") {
        amount = Number(numberItems.value);
        amount--;
        numberItems.value = amount;
        if (amount < 0) {
            numberItems.value = 0;
        }

    }
}//End FUNCTION-RegisterAmount

//Escucha y llama al id del boton que es oprimido y se captura la cantidad a comprar
function addBuy(event) {
    const idBtn = event.target.id;
    let numberItems = document.getElementById("inputb_" + idBtn);
    console.log(numberItems);
    amount = Number(numberItems.value);

    console.log("idBtn " + idBtn);
    console.log("cantidad " + amount);

    const move = new Action;
    const answer = move.searchElement(idBtn, objProduct);   //Busca el id del elemento en la BASE

    //move.readArray("como empieza la BASE ", idBtn, objProduct); //Como terminara la base 
    move.readArray("como empieza la COMPRA ", idBtn, objBasket); //Como terminara la cesta 

    console.log(answer);


    let exits;

    if (Boolean(answer)) {                                //Selecciona un producto
        exits = move.searchElement(idBtn, objBasket);   //Busca si esta el elemento en la cesta del USUARIO

        if (answer.stoke < amount) {
            Swal.fire({
                icon: 'info',
                text: 'Disculpe, no tenemos todos esos articulos, por tal motivo se le sumará a su cesta toda la cantidad de existencias del producto seleccionado',
                title: "._.",
            })
            amount = answer.stoke;
        }

        if (answer.stoke >= 1) {   //Entra si hay más de un producto           
            if (!Boolean(exits)) {                            //Se es la primer acompra se añade el producto a la cesta
                move.addElemenet(answer, objBasket, 0);     //Se añade el producto
                drawStructureBuy(answer.id, objBasket);                //NOTA: Se debe filtrar la cesta y dibujar los que no existe
                move.updateElement(0, objProduct, answer.id, amount, "BASE");   //Se descuenta de la base
                move.updateElement(1, objBasket, answer.id, amount, "ADD");     //Se añade la cantidad a la cesta


            } else {
                move.updateElement(0, objProduct, answer.id, amount, "BASE");   //Se descuenta de la base
                move.updateElement(1, objBasket, answer.id, amount, "ADD");     //Se añade la cantidad a la cesta

            }
            if (answer.stoke === 1) {
                Swal.fire({
                    icon: 'info',
                    text: 'Sólo queda un producto para vender',
                    title: ":c",
                })

            }
        }


    } else {
        Swal.fire({
            icon: 'error',
            text: 'El producto seleccionado no existe',
            title: idBtn,
        })
    }


    drawInfo(objProduct);                       //Metodo para escribir los cambios en el FRONT
    move.totalItems(objBasket);

    //move.readArray("como termina la BASE ", idBtn, objProduct); //Como terminara la base 
    move.readArray("como termina la COMPRA ", idBtn, objBasket); //Como terminara la cesta  

    numberItems.value = 1;
    event.preventDefault();
}//End FUNCTION-input

//Se crea función para eliminar objetos de la cesta del usuario
function deleteBuy(event) {
    let id = event.target.id;
    let accountDelete = document.getElementById(`input_${id}`);
    let acc = Number(accountDelete.value);

    let i = id.indexOf("_");
    i++;
    let newId = "";
    for (i; i < id.length; i++) {
        newId += id[i];
    }

    const move = new Action();

    move.updateElement(0, objBasket, newId, acc, "ADD");
    accountDelete.value = 1;
    move.totalItems(objBasket);
}//End FUNCTION-deleteBuy

fetch("../JSON/item.json")
    .then((response) => {
        items = response.json();
        return items;
    })
    .then((items) => {
        copyJSON(items);
    })
    .catch((error) => console.log(error))
    .finally(() => console.log("ok"));

//Función donde se crea una copia de la información de archivo JSON
//*********************************************************************************************** */
//*******************************************MAIN************************************************ */
//*********************************************************************************************** */
function copyJSON(obj) {
    objProduct = [...obj];
    drawInfo(objProduct);


    // console.log("JSON" + objProduct[0]);
    // console.log("JS" + product[0]);
    // const item = objProduct.find(is00A);
    // item = objProduct.find(x => x.id === "00A");
    // console.log("item " + item.id);

}//End FUNCTION copyJSON
//*********************************************************************************************** */
//*******************************************MAIN************************************************ */
//*********************************************************************************************** */
//Se crea función para actualizar información si el usuario agrega  a la cesta
function drawInfo(obj) {
    let HTML = "";
    for (let i in obj) {
        let p = document.getElementsByTagName("p");
        HTML = `<strong>${obj[i].stoke}</strong>`;
        p[i].innerHTML = HTML;
    }
}//End FUNCTION-drawInfo

//Se crea la función para actualizar información si no existe productos, en este caso elimina etiquetas
function drawRemoveBase(id, obj) {
    const msm = "AGOTADO";
    console.log(msm);
    console.log(id);
    for (let i in obj) {
        console.log(obj[i].id);
        if (obj[i].id === id) {
            let btn = document.getElementById(obj[i].id);
            let plus = document.getElementById(`b_${obj[i].id}+`);
            let subt = document.getElementById(`b_${obj[i].id}-`);
            let input = document.getElementById(`inputb_${obj[i].id}`);
            let divBtn = document.getElementById(`divBtn${obj[i].id}`);
            btn.remove();
            divBtn.remove();
            input.remove();
            plus.remove();
            subt.remove();
            createBtn = 1;
            let div = document.getElementById(`divInput${obj[i].id}`);
            const notice = document.createElement("div");
            notice.className = "MSM";
            notice.id = `MSM_${obj[i].id}`;
            notice.innerHTML = `<h4>${msm}</h4>
            <span class="iconify" id="iconSend" data-icon="material-symbols:sentiment-very-dissatisfied-outline" style="color: white;"></span>`;
            div.append(notice);
        }

    }
}//End FUNCTION-drawRemovwBase

//la Función drawBuy pintará lo seleccionado por el cliente, donde estará el nombre del 
//producto, foto, cantidad, precio unitario y precio total del producto y toda la compra
function drawStructureBuy(id, obj) {
    let contentMarket = document.getElementById("BuyInfo");
    let c = -1;

    const contentInfo = document.createElement("div");
    contentInfo.className = "InfoBuy";
    contentMarket.append(contentInfo);

    let exitItem = obj.indexOf(obj.find(x => x.id === id));

    for (const k of obj) {
        c++;
        if (exitItem === c) {
            console.log("drawBuy " + c);
            contentInfo.id = `InfoBuy_${k.id}`;
            let contentBuy = document.createElement("div");
            contentBuy.className = "buyShow";
            contentBuy.id = `divContentBuy_${k.id}`;
            contentInfo.append(contentBuy);

            let divNav = document.createElement("article");
            let divBody = document.createElement("article");
            divNav.className = "buyShowNav";
            divNav.id = `divNavBuy_${k.id}`;
            divBody.className = "buyShowBody";
            divBody.id = `divBodyBuy_${k.id}`;
            contentBuy.append(divNav);
            contentBuy.append(divBody);

            let divNavName = document.createElement("div");
            let divNavIco = document.createElement("div");
            divNavName.className = "buyShowTitle";
            divNavIco.className = "buyShowIco";
            divNavName.id = `divNaveBuyName_${k.id}`;
            divNavIco.id = `divNaveBuyIco_${k.id}`;
            divNavName.innerHTML = `
                <h2>${k.name}</h2>
            `;
            divNav.append(divNavName);
            divNav.append(divNavIco);

            let divNavIcon = document.createElement("div");
            let divNavBuyNum = document.createElement("div");
            divNavIcon.className = "buyShowIconoo";
            divNavBuyNum.className = "buyShowNumber";
            divNavIcon.id = `divNaveBuyIcon_${k.id}`;
            divNavBuyNum.id = `divNaveBuyNum_${k.id}`;
            divNavIcon.innerHTML = `<span class="iconify iconify_buy" data-icon="mdi:basket-fill" style="color: white;"></span>`;
            divNavIco.append(divNavIcon);
            divNavBuyNum.innerHTML = `<h3 id=itemSelectBuy_${k.id}>${k.stoke}</h3>`;
            divNavIco.append(divNavBuyNum);

            let divBodyLeft = document.createElement("div");
            let divBodyRight = document.createElement("div");
            divBodyLeft.className = "buyShowLeft";
            divBodyLeft.id = "divBodyLeft";
            divBodyLeft.innerHTML = `<img class="imgBuyShow" src="${k.img}" alt="">`;
            divBodyRight.className = "buyShowRight";
            divBodyRight.id = "divBodyRight";
            divBody.append(divBodyLeft);
            divBody.append(divBodyRight);

            let divBodyRightAccount = document.createElement("div");
            let divBodyRightDelete = document.createElement("div");
            divBodyRightAccount.className = `buyAccount`;
            divBodyRightAccount.id = `buyAccount_${k.id}`;
            divBodyRightAccount.innerHTML = `
                <h3 class="buyAccountCU" id="buyAccountCU_${k.id}"> $ ${k.price}</h3>
                <h3 class="buyAccountTotal" id="buyAccountTotal_${k.id}"> ${(k.price) * (k.stoke)}</h3>
            `;
            divBodyRight.append(divBodyRightAccount);
            divBodyRightDelete.className = `buyDelete`;
            divBodyRightDelete.id = `buyDelete_${k.id}`;
            divBodyRightDelete.innerHTML = `
                <input class="account_delete" id=input_buy_${k.id} type="number" min="1" max="100" value="1">
                <span class="iconify iconify_buy iconify_delete" id=buy_${k.id} onclick=deleteBuy(event) data-icon="ic:outline-delete-forever" style="color: white;"></span>
            `;
            divBodyRight.append(divBodyRightDelete);
        }


    }

    // if (c === 0) {
    //     let footer = document.getElementById("BuyFooter");
    //     let marketFooter = document.createElement("footer");
    //     marketFooter.id = "marketFooter";
    //     marketFooter.innerHTML = `<h2 id="totalBuy">TOTAL A PAGAR: $ 0 </h2>`;
    //     footer.append(marketFooter);
    // }

}//End FUNCTION-drawBuy

//Se crea función drawInfoBuy para actualizar las movimientos del cliente.
function drawInfoBuy(id, obj) {
    for (const i of obj) {
        if (id === i.id) {
            let updateItemBuy = document.getElementById(`itemSelectBuy_${i.id}`);
            updateItemBuy.innerText = i.stoke;
            let totalItems = document.getElementById(`buyAccountTotal_${i.id}`);
            totalItems.innerText = (i.price) * (i.stoke);
        }
    }

}//End FUNCTION-drawInfoBuy

//Se crea la función para eliminar contenido HMTL cuando se elimina objetos de la cesta
function drawRemoveBasquet(id, obj) {
    console.log("Elimino articulo de la cesta");
    for (const i of obj) {
        if (i.id === id) {
            console.log("Elimino articulo de la cesta id: " + i.id);
            let div = document.getElementById(`InfoBuy_${i.id}`);
            div.remove()
        }
    }

}//End FUNCTION-drawRemovwBasquet

//Cuando el usuario devuelve todos los productos de un articulo se vuelven a sobreescribir en la base
function drawRewriteBase(id) {
    let divMSM = document.getElementById(`MSM_${id}`);

    if (Boolean(divMSM)) { divMSM.remove(); }

    let input = document.getElementById(`divInput${id}`);
    input.innerHTML = `
        <input class="account" id=inputb_${id} type="number" min="1" max="100" value="1">
        <button class="+ plus" id=b_${id}+ onclick="RegisterAmount(event)">+</button>
        <button class="- subt" id=b_${id}- onclick="RegisterAmount(event)">-</button>
    `;
    if (createBtn === 1) {
        let div = document.getElementById(`div_${id}`);
        let content = document.createElement("div");
        content.className = "inputNumber";
        content.id = `divBtn${id}`;
        content.innerHTML = `
        <span class="iconify" id=${id} onclick=addBuy(event) data-icon="mdi:shopping-cart-arrow-down" style="color: white;"></span>
    `;
        div.append(content);
    }
    createBtn = 0;
}//End FUNCTION-drawRewriteBase

//Escribe el total de los productos seleccionados en el FRONT
function drawTotal(total) {
    let tag = document.getElementById("totalBuyP");
    tag.innerText = `TOTAL A PAGAR: $ ${total}`;
}//End FUNCTION-drawTotal


class Action {
    //Se va a leer e imprimir una posición especifica del array
    readArray(msm, id, obj) {
        console.log("ReaderArray")
        for (const i of obj) {
            if (i.id === id) {
                console.log(msm + i.id);
                console.log(msm + i.name);
                console.log(msm + i.stoke);
            }
        }
    }//End FUNCTION-readArray

    //Busca el elemento seleccionado por el usuario
    searchElement(id, obj) {
        let item = obj.find(x => x.id === id);
        return item;
    }//end SEARCH_ELEMENT

    //Se elimina elemento del array
    deleteElemet(item, obj) {
        let position = obj.indexOf(item);
        obj.splice(position, 1);
    }//End FUNCTION DELETE_ELEMENT

    //Se añade el número de productos a la base si el cliente decide devolver productos
    addElemenetBase(id, obj, amount) {
        console.log("va añadir productos a la base");
        for (const i of obj) {
            if (i.id === id) {
                console.log("va añadir productos a la base ID: " + i.id);
                i.stoke = i.stoke + amount;
            }

        }

    }//End FUNCTION-addElementBase

    //Se añade item si se agrega al carrito de compras o se devuelve al stoke
    addElemenet(item, obj, amount) {
        const elements = { id: item.id, name: item.name, img: item.img, price: item.price, stoke: amount }
        obj.push(elements);
    }//End  FUNCTION ADD_ELEMENT

    //Con esta función se puede actualizar el stoke y el carrito de compras
    updateElement(modo, obj, id, num, way) {
        let existItem = obj.find(x => x.id === id);
        let c = 0;
        let amount = num;

        if (Boolean(existItem)) {                   //Si existe el elemento realiza la acción
            if (modo === 1) {                       //Para sumar productos de una cesta                                   
                for (const i of obj) {
                    if (i.id === id) {
                        if (way === "BASE") {
                            // if(i.stoke === 0){
                            //     //dibuja de nuevo los articulos, si y solo si el cliente devuelve 
                            // }
                            i.stoke = i.stoke + amount;

                        } else if (way === "ADD") {
                            selectItems++;
                            i.stoke = i.stoke + amount;
                            drawInfoBuy(i.id, obj)
                            localStorage.setItem(i.id, i.stoke);
                        }
                    }
                }
            } else if (modo === 0) {                //Para restar productos de una cesta        
                for (const i of obj) {
                    if (i.id === id) {
                        if (way === "BASE") {
                            i.stoke = i.stoke - amount;
                            if (i.stoke < 0) {
                                i.stoke = 0;
                            }
                            if (i.stoke <= 0) {       //Si se acaba el producto en la base entonces se elimina
                                drawRemoveBase(i.id, obj)
                                //this.deleteElemet(existItem, obj);                                
                            }

                        } else if (way === "ADD") {
                            if (amount > i.stoke) {
                                amount = i.stoke;
                            }
                            i.stoke = i.stoke - amount;
                            this.addElemenetBase(i.id, objProduct, amount);
                            localStorage.setItem(i.id, i.stoke);
                            drawInfoBuy(i.id, obj);
                            drawInfo(objProduct);
                            drawRewriteBase(id);
                            if (i.stoke === 0) {       //Si el cliente no quiere el producto, entonces lo elimna de su cesta
                                selectItems--;
                                drawRemoveBasquet(i.id, obj);
                                this.deleteElemet(existItem, obj);
                                localStorage.removeItem(i.id);

                            }
                        }
                    }
                }
            }
        } else {                                    //Si no existe el elemento da una alerta
            Swal.fire({
                icon: 'error',
                text: 'El producto seleccionado no existe',
                title: id,
            })
        }
    }//End FUNCTION UPDATE

    //Saca el total de la compra y lo escribe en el FRONT
    totalItems(obj) {
        let total = 0;
        console.log("DESCUENTA EL TOTAL" + total);
        for (const i of obj) {
            console.log(`${i.price} ${i.stoke}`);
            total += (i.price * i.stoke);
        }
        drawTotal(total);
    }//End FUNCTION-TotalItems


}//End CLASS_ACTION




