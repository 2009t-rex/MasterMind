const kolory = ["aquamarine", "darkmagenta", "crimson", "cadetblue", "springgreen", "goldenrod", "coral", "sandybrown"]
const wylosowaneKolory = [];
const koloryUzytkownika = [];
const ostatnieKoloryUzytkownika = [];
const poprawnoscKolorow = [];
const kafelki = [];
let graTrwa = true;
for(let i = 1; i <= 8; i++){
    let kolor = document.getElementById("kolor" + i)
    kafelki[i-1] = kolor
}
for(let i = 0; i <= 7; i++){
    kafelki[i].style.background = kolory[i]
}
for(let i = 1; i <= 5; i++){
    let kolor = document.getElementById("wybranyKolor" + i)
    koloryUzytkownika[i-1] = kolor
}
for(let i = 1; i <= 5; i++){
    let kolor = document.getElementById("ostatnieKolory" + i)
    ostatnieKoloryUzytkownika[i-1] = kolor
}
for(let i = 1; i <= 5; i++){
    let kolor = document.getElementById("poprawnoscKoloru" + i)
    poprawnoscKolorow[i-1] = kolor
}
function losowanieKolorow() {
    for(let i = 0; i < 5; i++){
        const wylos = Math.floor(Math.random() * 8);
        wylosowaneKolory[i] = kolory[wylos];
    }
}

losowanieKolorow()

let obecnyKafelek = 0;

function dodajkolor(wybranyKolor){
    if(!graTrwa) return
    koloryUzytkownika[obecnyKafelek].style.background = kolory[wybranyKolor]
    obecnyKafelek++
}
for(let i = 0; i < 8; i++){
    kafelki[i].addEventListener("click", () => {dodajkolor(i)})
}

const usunOstatni = document.getElementById("usunOstatni")
const sprawdz = document.getElementById("sprawdz")
const nowaGra = document.getElementById("nowaGra")
const restart = document.getElementById("restart")
const zycia = document.getElementById("zycia")

let licznikZyc = 6;
zycia.innerText = licznikZyc

usunOstatni.addEventListener("click",
    function usunOstatniKolor(){
        if(!graTrwa) return
        if(obecnyKafelek > 0){
            obecnyKafelek--;
            koloryUzytkownika[obecnyKafelek].style.background = "";
        }
    }
)

sprawdz.addEventListener("click",
    function sprawdzanie(){
        if(!graTrwa) return
        if(obecnyKafelek < 5){
            alert("Musisz mieć 5 kolorów, żeby sprawdzić!! 😕😕")
            return
        }
        for(let i = 0; i < 5; i++){
            if(koloryUzytkownika[i].style.background == wylosowaneKolory[i]){
                poprawnoscKolorow[i].style.background = "greenyellow";
            }else{
                let czyIstnieje = false
                for(let j = 0; j < 5; j++){
                    if(koloryUzytkownika[i].style.background == wylosowaneKolory[j]){
                        czyIstnieje = true;
                    }
                }if(czyIstnieje){
                        poprawnoscKolorow[i].style.background = "gold";
                }else{
                        poprawnoscKolorow[i].style.background = "red";
                    }
            }
            ostatnieKoloryUzytkownika[i].style.background = koloryUzytkownika[i].style.background
            koloryUzytkownika[i].style.background = "";
        }
        obecnyKafelek = 0
        licznikZyc--;
        zycia.innerText = licznikZyc
        if(licznikZyc < 2){
            zycia.style.color = 'red';
        }
        if(licznikZyc === 0){
            alert("Przegrałeś. 😥😥 Kliknij 'Nowa Gra', aby zagrać w nową grę.")
            graTrwa = false;
            pokazNaKoncu()
        }
        sprawdzCzyWygrana()
    }
)
nowaGra.addEventListener("click", restartGry)
restart.addEventListener("click", restartGry)

function restartGry(){
    losowanieKolorow()
    obecnyKafelek = 0
    licznikZyc = 6
    zycia.innerText = licznikZyc
    zycia.style.color = 'whitesmoke';
    for(let i = 0; i <5; i++){
        koloryUzytkownika[i].style.background = "";
        poprawnoscKolorow[i].style.background = "";
        ostatnieKoloryUzytkownika[i].style.background = "";
    }
    graTrwa = true;
}

function sprawdzCzyWygrana() {
    let czyWygrana = 0;
    for(let i = 0; i < 5; i++){
        if(poprawnoscKolorow[i].style.background == "greenyellow"){
            czyWygrana++
        }
    }
    if(czyWygrana == 5){
        alert("Wygrałeś!! 🤩🤩 Kliknij 'Nowa Gra', aby zagrać w nową grę.")
        graTrwa = false
        pokazNaKoncu()
    }else{
        czyWygrana = 0;
    }
}
const tekstDoZmiany = document.getElementById("tekstDoZmiany")
function pokazNaKoncu() {
    tekstDoZmiany.innerText = "Poprawne kolory"
    for(let i = 0; i < 5; i++){
        koloryUzytkownika[i].style.background = wylosowaneKolory[i];
    }
}