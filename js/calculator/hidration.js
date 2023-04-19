//Se crea el objeto donde va a contener toda la información de la interfaz
const hidration = [
    {
        name: "one",
        value: 1
    },
    {
        name: "two",
        value: 2
    },
    {
        name: "three",
        value: 3
    },
    {
        name: "four",
        value: 4
    },
    {
        name: "five",
        value: 5
    },
    {
        name: "six",
        value: 6
    },
    {
        name: "seven",
        value: 7
    },
    {
        name: "eight",
        value: 8
    },
    {
        name: "nine",
        value: 9
    },
    {
        name: "plus",
        value: '+'
    },
    {
        name: "subtract",
        value: '-'
    },
    {
        name: "multiply",
        value: '*'
    },
    {
        name: "division",
        value: '/'
    },
    {
        name:"dot",
        value: '.'
    },
    {
        name: "zero",
        value: 0
    },
    {
        name:"equals",
        value: '='
    },
    {
        name: 'clear',
        value: 'C'
    },
    {
        name: "back",
        value: 'B'
    },
    {
        name: "history",
        value: 'H'
    }
];

//Se va a desglosar  el objeto para darle hidratación a la pagina
const container = document.getElementById("container");

let S1 = document.createElement("section");
let S2 = document.createElement("section");
let S21 = document.createElement("section");
let S22 = document.createElement("section");
let S3 = document.createElement("section");

S1.id = "S1";
S2.id = "S2";
S21.id = "S21";
S22.id = "S22";
S3.id = "S3";
container.append(S1);
container.append(S2);
container.append(S3);

const con_S1 = document.getElementById("S1");
const con_S2 = document.getElementById("S2");
const con_S3 = document.getElementById("S3");

con_S2.append(S21);
con_S2.append(S22);

const con_S21 = document.getElementById("S21");
const con_S22 = document.getElementById("S22");

let divHeader = document.createElement("div");
let divN = document.createElement("div");
let divS = document.createElement("div");
let divZ = document.createElement("div");
let divH = document.createElement("div");
let divC = document.createElement("div");

divHeader.className = "print";
divHeader.innerHTML = `
    <h2></h2>
`;
con_S1.append(divHeader);

for (const i of hidration) {
    if((i.value >= 1)||(i.value == 9)){
        
        divN.className = "number";
        divN.innerHTML += `
            <button class="options num" id="${i.name}" onclick=input(event)>
                ${i.value}
            </button>        
        `;
        con_S21.append(divN);
    }else if((i.value === '+') || (i.value === '-') || (i.value === '*') || (i.value === '/')){
        divS.className = "sign";
        divS.innerHTML += `
            <button class="options" id="${i.name}" onclick=input(event)>
                ${i.value}
            </button>  
        `;
        con_S22.append(divS);
    }else if((i.value == 0) || (i.value === '.')){
        divZ.className = "ground";
        divZ.innerHTML += `
            <button class="options espe" id="${i.name}" onclick=input(event)>
                ${i.value}
            </button>  
        `;
        con_S3.append(divZ);
    }else if((i.value === '=')){
        divH.className = "equal";
        divH.innerHTML += `
            <button class="options" id="${i.name}" onclick=answer()>
                ${i.value}
            </button>  
        `;
        con_S3.append(divH);
    }else if((i.value === 'H')){
        divH.className = "equal";
        divH.innerHTML += `
            <button class="options" id="${i.name}" onclick=input(event)>
                ${i.value}
            </button>  
        `;
        con_S3.append(divH);
    }else if((i.value === 'B')){
        divC.className = "clear";
        divC.innerHTML += `
            <button class="options  cl" id="${i.name}" onclick=input(event)>
                ${i.value}
            </button>  
        `;
        con_S22.append(divC);
    }else if((i.value === 'C')){
        divC.className = "clear";
        divC.innerHTML += `
            <button class="options  cl" id="${i.name}" onclick=clean()>
                ${i.value}
            </button>  
        `;
        con_S22.append(divC);
    }


}

const c = document.getElementsByClassName("c");
const inicio = document.createElement("a");
inicio.className = "btnInicio";
inicio.href = "../index.html";
inicio.innerText = "INICIO"
// inicio.innerHTML = `
//     <button href=> </button>
// `;
c[0].append(inicio);



