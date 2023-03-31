const _h2 = document.querySelector("h2");

//Objeto que guarda toda la operaciónn que digita el usuarios
let objOperation = [];
//Objeto donde se guardan los signos que se usa en la operación;
let objSign = [];
//Objeto donde guarda la posición que ocupa el signo en el objeto: objOperation
let objPositionSign = [];
//Separa por segmentos la operación, donde cada separador es un signo aritmetico y 
//se guardara en un espacio en el array y la trama de numeros en otro espacio
let objSegment = [];
//contadores
let conInput = 0; //Cuenta los datos que ingresan
let conCeros = 0; //Cuenta los ceros a la izquierda de un número, si el usuario sólo ingresa ese digito
let conSign = 0; //Cuenta el número de signos que se ingresan en la operación

console.log(Boolean(objOperation[0]))

function input(event) {
    let _Txt = event.target.innerText;
    let _write = true;
    let _boolSign = false;

    let indexSign = 0;
    let indexOperation = 0;

    if ((_Txt.charCodeAt(0) >= 48) && (_Txt.charCodeAt(0) <= 57)) {

        indexSign = objSign.length;
        indexOperation = objOperation.length;

        if ((_Txt.charCodeAt(0) == 48)) {
            conCeros++;

            if (!Boolean(objOperation[0]) && conInput === 0) {
                addData(_Txt, objOperation, _h2, _write);
                // conInput++;
            }
            if (_write === true && conInput > 1 && Boolean(objOperation[0]) != '0') {
                addData(_Txt, objOperation, _h2, _write);
                _boolSign = false;
                conInput++;
                conSign = 0;
            }

        } else {
            console.log(objOperation);
            if (objOperation[0] === '0') {
                // conInput = conInput - conCeros;
                removeData(objOperation, _h2, conInput, _Txt);
            }

            if (_write === true) {
                addData(_Txt, objOperation, _h2, _write);
                _boolSign = false;
                conInput++;
                conSign = 0;
            }
        }

    } else if ((_Txt.charCodeAt(0) >= 42) && (_Txt.charCodeAt(0) <= 47)) {
        if (!Boolean(objOperation[0])) {
            _boolSign = false;
            conSign = 0;
        } else {
            _boolSign = true;
            conSign++;
        }
    }

    if (_boolSign) {
        const popIni = 0;
        addSign(conSign, conInput, _Txt, objSign, objPositionSign, objOperation, objSegment, popIni, _h2, _write);
    }

    console.log("objeto" + objOperation);
    console.log("INPUT: " + conInput);
    console.log("signos" + objSign);

    // console.log(event.target.innerText);
}

console.log(objOperation);

// function sumCeros(con, objOperation, objSign, objPositionSign, _write){


//     if(con > 1){

//     }
// }

function addData(numb, obj, tag, _write) {
    if (_write === true) {
        obj.push(numb);
        tag.innerText += numb;
    }
}

function addSign(conSign, conNum, sign, objSign, objPosi, objOpe, objSeg, popIni, tag, _write) {
    if (conSign === 1 && _write === true) {

        objSign.push(sign);
        tag.innerText += sign;
        conNum++;
        popEnd = conNum;
        objPosi.push(conNum);
        let copy = objOpe.slice(popIni, popEnd);
        let segment = copy.join('');///mirar la trama, crear copia antes de las tramas de numeros

        objSeg.push(segment);
        objOpe.push(sign);
        popIni = popEnd;

    }
}

function removeData(objOpe, tag, con, data) {
    objOpe.pop();
    con--;
    tag.innerText = "";
}

//Con esta función da el resultado de la operación
function answer() {
    const obj = [...objOperation];
    console.log(obj);
    console.log(objSign);
    // const objSign = [...objSign]
    const result = [];
    // const posicionSig = [];


    let log = 0;
    log = obj.length;

    let logSign = 0;
    logSign = objSign.length;

    //Se trata la información ingresada por el usuario y se separa por números y signos

    console.log(log);
    let consig = 0;

    let cont = 0;
    let cinput = 0;
    let inicial = 0;
    let final = 0;

    for (let i in obj) {
        cinput++;
        let s = obj[i];
        // console.log(s)
        if ((s === '+') || (s === '-') || (s === '*') || (s === '/')) {
            cont++;
            final = i;
            console.log(final)
            const copy = obj.slice(inicial, final);
            consig++;
            const b = copy.join('');
            // posicionSig.push(cont * 2);
            result.push(Number(b));
            result.push(s);
            console.log(result);
            inicial = final;
            inicial++;
            console.log(inicial);
            if (logSign === consig) {
                final = log;
                const copy = obj.slice(inicial, final);
                console.log(copy);
                const b = copy.join('');
                result.push(Number(b));
            }
        }
        console.log(inicial)
        copy = []
    }
    console.log("resultado: " + result);
    // console.log("resultado: " + posicionSig);

    const suma = (n1, n2) => n1 + n2;
    const resta = (n1, n2) => n1 - n2;
    const multi = (m1, m2) => m1 * m2;
    const divi = (m1, m2) => m1 / m2;

    let m1 = 0;
    let m2 = 0;

    let array = [];
    let contador = 0;
    let contadorProduct = 0;
    let Rr = 0;
    //Mira si la operación tiene una multiplicación o división primero la evalua
    if ((result.includes("*")) || (result.includes("/"))) {

        let pos = 0;
        let inicio = 0;
        let final = 0;

        for (let i = 0; i < result.length; i++) {
            console.log(result[i])
            contador++;
            if ((result[i] === '*') || (result[i] === '/')) {

                contadorProduct++;
                console.log(contadorProduct)
                console.log("dentro de la multiplicación" + i)
                pos = i;
                inicio = pos - 1;
                console.log(inicio);
                if (contadorProduct === 1) {
                    m1 = result[inicio];
                } else {
                    m1 = Rr;
                    array.pop();
                }
                console.log("m1 " + m1);
                final = pos + 1;
                console.log(final);
                m2 = result[final];
                console.log("m2 " + m2);
                array.pop();

                if (result[pos] === "*") {
                    Rr = multi(m1, m2);
                    console.log(Rr);
                    add(array, Rr);
                    console.log(array);
                } else if (result[pos] === "/") {
                    Rr = divi(m1, m2);
                    console.log(Rr);
                    add(array, Rr);
                }
            } else {
                if ((result[i] === "+") || (result[i] === "-")) {
                    contadorProduct = 0;
                    Rr = 0;
                    if ((result[i - 2] === '*') || (result[i - 2] === '/')) {
                        array.pop();
                    }
                }

                if (((result[i - 1] === '*') || (result[i - 1] === '/'))) {
                    if (i != result.length - 1) {
                        array.push(result[i]);
                    }
                } else {
                    array.push(result[i]);
                }

            }
            // console.log(array);
        }//End for
    } else {
        array = [...result];
    }

    console.log(result)
    console.log(array);


    // Posteriormente se suma o resta
    if ((array.includes('+')) || (array.includes('-'))) {
        m1 = array[0];
        console.log(m1)
        m2 = 0;
        Rr = 0;

        for (let j = 1; j < array.length; j++) {
            if (array[j] === "+") {
                m2 = array[j + 1];
                Rr = suma(m1, m2);
                console.log(Rr);
                m1 = Rr;
            } else if (array[j] === "-") {
                m2 = array[j + 1];
                Rr = resta(m1, m2);
                console.log(Rr);
                m1 = Rr;
            }
        }
    } else {
        Rr = array[0];
    }
    // alert("resultadooo: " + Rr);
    clean();
    Swal.fire({
        icon: 'success',
        title: Rr,
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}//End function answer


function eliminar(inicial, final, obj) {
    console.log(obj);
    console.log(inicial)
    console.log(final)
    obj.splice(inicial, final - 1);
    //console.log(obj.splice(inicial, final+1));
    console.log(obj);
}

function add(obj, data) {
    obj.push(data);
    console.log(obj);
}

function clean() {
    console.log("va a limpiar");
    objOperation = [];
    objSign = [];
    objPositionSign = [];
    objSegment = [];
    conInput = 0;
    conCeros = 0;
    conSign = 0;
    Rr = 0;
    _h2.innerHTML = "";
}
