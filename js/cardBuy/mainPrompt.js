//SE CREA EL OBJETO PARA AÑADIR PRODUCTOS
const product = [
    {
        id: "A00",
        name: "CAMISA",
        stockTake: 10,
        sumItem: 0
    },
    {
        id: "0B1",
        name: "PANTALON",
        stockTake: 5,
        sumItem: 0
    },
    {
        id: "0C2",
        name: "MEDIAS",
        stockTake: 15,
        sumItem: 0
    },
    {
        id: "003",
        name: "BUSO",
        stockTake: 7,
        sumItem: 0
    },
    {
        id: "Z69",
        name: "ZAPATOS",
        stockTake: 0,
        sumItem: 0
    }
];

const saveBuy = [];
const sendProduct = [];

//Se crea el objeto Notice para leer un array e imprimir su contenido, además para mostrar errores y advertencias
function Notice(){

    this.readArray = function(object, reader) {
        let message = "";
        if(reader === 1){
            for (let i in object) {
                let element = `Nombre del producto: ${object[i].name}, id: ${object[i].id}, reserva: ${object[i].stockTake}  ${String.fromCharCode(10)}`;
                message += element;
            }
            return message;
        }else{
            for (let i in object) {
                let element = `Nombre del producto: ${object[i].name}, id: ${object[i].id}, cantidad: ${object[i].amount}  ${String.fromCharCode(10)}`;
                message += element;
            }
            return message;
        }
    }

    this.error = function(msm){
        let message = `Disculpe... ${msm}`;
        return message;
    }

    this.warning = function(msm){
        let message = `Disculpe... ${msm}`;
        return message;
    }

    this.exit = function(){
        let message = "Gracias por visitarnos, vuelve pronto";
        return message;
    }

}

class Basket{
   
    plus;
    subtraction;
    result;
    print;

    constructor(print){
        this.print = print;
    }
    
    //Busca el articulo y lo añade a la cesta de comprars
    searchProdcut(objProduct, id, objBasket, objSend){
        let item = objProduct.find(x => x.id === id);
        console.log(`itemProdcut: ${Boolean(item)} ${id}`);
        let amount = parseInt(prompt(`Por favor digite el número de ${item.name}S que desea llevar`));
        if(Boolean(item)){
            if(item.stockTake >= 1){                
                let itemBuy = objBasket.find(x => x.id === id);
                if(!Boolean(itemBuy)){
                    this.addProductBasket(item, objBasket, amount); //Si no existe el producto en la cesta lo agrega
                }else{
                    this.updateProduct(objBasket, objSend, id, item, amount, 1, "AMOUNT");//Si existe el producto en la cesta lo actualiza
                }               
                // console.log(`en su cesta esta el articulo: ${Boolean(itemBuy)}`);       
                this.addProductStocke(item, objSend);        //CORREGIR 
                this.updateProduct(objProduct, objSend, id, item, amount, 0, "STOCK");//Cuando el usuario desea un producto, en el stock se actualiza los productos
            }else{
                this.deleteProduct(objProduct, item);
                alert(this.print.error(`No hay existencias del producto ${item.name}, con número de id: ${item.id}`));
                alert(this.print.warning(`Por favor elija otro producto`));
                
            }
                   
        }else{
            alert(this.print.warning(`No existe ese producto, por favor intetarlo nuevamente`))
        }  
    }
    
    //Actual la cantidad de productos que se tiene
    updateProduct(objProduct, objSend, id, item, amount, mode, way){
        if(mode === 0){ //Resta los insumos
            for( let j  in objProduct){
                if(objProduct[j].id === id){
                    if(way === "STOCK"){
                        objProduct[j].stockTake = objProduct[j].stockTake - amount;

                        if(objProduct[j].stockTake === 0){
                            console.log(`va actualizar los productos ${objProduct[j].stockTake}`);                            
                            this.deleteProduct(objProduct, item);
                        } 
                    }else if(way === "AMOUNT"){
                        objProduct[j].amount = objProduct[j].amount - amount;

                        if(objProduct[j].amount === 0){
                            console.log(`Elimina producto de las cesta de compras ${objProduct[j].name}`);
                            this.deleteProduct(objProduct, item); 
                        } 
                    } 
                }
            }
        }else if(mode === 1){//Suma los insumos

            let itemBase = objProduct.find(x => x.id === id);

            if(!Boolean(itemBase)){
                //console.log(`apunto de añadir`);
                let itemReturn = objSend.find(x => x.id === id);
                //console.log(`Añadir ${itemReturn}`);
                if(Boolean(itemReturn)){
                    this.addProductStocke(itemReturn, objProduct);
                    console.log(`Producto añadido`);
                }else{
                    alert(`El id registrado no esta en los suministros... :c`);
                }
                
            }           

            for( let j  in objProduct){
                if(objProduct[j].id === id){                    
                    if(way === "STOCK"){
                        objProduct[j].stockTake = objProduct[j].stockTake + amount;
                        console.log(`Suma producto de las cesta base ${objProduct[j].name}`);
                        
                      
                    }else if(way === "AMOUNT"){
                        objProduct[j].amount = objProduct[j].amount + amount;
                       
                    }

                 
                }
            }
        }

    
    }

    addProductBasket(item, objBasket, amount){
        let adding = {id: item.id, name: item.name, amount: amount};
        objBasket.push(adding);  
        return objBasket
    }


    addProductStocke(item, objProduct){       
        objProduct.push(item);  
        return objProduct
    }

    

    deleteProduct(objProduct, item){
        let position = objProduct.indexOf(item);
        objProduct.splice(position, 1);
    }

    deleteItemBasket(objBasket, objProduct, objSend, id){
        
        let item = objBasket.find(x => x.id === id);
        let amount = parseInt(prompt(`Había seleccionado ${item.amount} ${item.name}${String.fromCharCode(10)}Por favor indique que cantidad desea eliminar de dicho producto: `));
        if(Boolean(item)){
            alert("nea");
            this.updateProduct(objBasket, objSend, id, item, amount, 0, "AMOUNT");//Elimna el producto de la cesta del usuario y lo suma al stocke de la base
            this.updateProduct(objProduct, objSend, id, item, amount, 1, "STOCK");//Actualiza el stocke si el producto no existia
        }
    }


}

//Run code

let confirm = prompt(`Bienvenido...${String.fromCharCode(10)}Sí vas a realizar alguna compra, por favor escribe SI, pero si no realizaras ninguna compra digita NO`);
let go = 0;

if(confirm.toUpperCase() === "SI"){   
    const userNotice = new Notice(); 
    let c = 0;
    if(c === 0){
        go = 1;
    }

    while(go === 1){//comprar
        confirm = prompt(`Por favor *${String.fromCharCode(126)}* elige el id del articulo que desea comprar :D ${c+1}${String.fromCharCode(10)}${String.fromCharCode(13)}${userNotice.readArray(product, 1)}`);        
        
        const movement = new Basket(userNotice);

        movement.searchProdcut(product, confirm, saveBuy, sendProduct);
        
        alert(`Sus compras han sido :o${String.fromCharCode(10)}${String.fromCharCode(13)}${userNotice.readArray(saveBuy, 2)}`);
        console.log(`se vendio prodcuto: ${userNotice.readArray(sendProduct, 1)}`); //eliminar
        c++;

        go = parseInt(prompt(`Desea comprar otro articulo, si es así digite: 1, ${String.fromCharCode(10)}si desea eliminar algun producto digite: 0, ${String.fromCharCode(10)}pero si desea cerrar la compra digite: 8`));

        while(go === 0){
            confirm = prompt(`Cual de los siguientes articulos seleccionados desea eliminar. ${String.fromCharCode(10)}Por favor escribir el id del producto :c ${String.fromCharCode(10)}${String.fromCharCode(13)}${userNotice.readArray(saveBuy, 2)}`);
            
            //const movement = new Basket(userNotice);
    
            movement.deleteItemBasket(saveBuy, product, sendProduct, confirm);
            alert(userNotice.readArray(saveBuy, 2));
            console.log(sendProduct);
            
            go = parseInt(prompt(`Desea comprar otro articulo, si es así digite: 1, ${String.fromCharCode(10)}si desea eliminar otro producto digite: 0, ${String.fromCharCode(10)}${String.fromCharCode(13)}pero si desea cerrar la compra digite: 8`));
        }
    }   
    
}else{
    alert(person.exit());
}


