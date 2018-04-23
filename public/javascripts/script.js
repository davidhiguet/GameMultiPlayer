"use strict";
window.addEventListener('DOMContentLoaded', function (){

    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


$(".lifeBar").slideUp();//close the life part for the game

var demarrage = document.getElementById('btn').addEventListener('click', function(){
    //profondeur impression
    document.getElementById('start').style.WebkitBoxShadow = "inset 0 5px 42px rgba(0, 0, 0, 0.5)";
    document.getElementById('start').style.MozBoxShadow = "inset 0 5px 42px rgba(0, 0, 0, 0.5)";
    document.getElementById('start').style.boxShadow = "inset 0 5px 42px rgba(0, 0, 0, 0.5)";

//active game
setTimeout(function(){

    $(".start").slideUp();
    $(".lifeBar").slideDown();
    var restart = 1;  

var scaleY = 1;
var scaleX = 1;
// gravity effect
setInterval(function() {
    if (scaleY === 1) {
        scaleY = -1;
    } else {
        scaleY = 1
    }  
document.getElementById('game').style.transform = `scaleY(${scaleY})`;
},7000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*** factory background ***/
var factoryBackground = function () {
/*** background property ***/
    var BackgroundConstruction = function (name, pixel) {
        this.doc = name;
        this.proprieteLeft = this.doc.style.left;
        this.px = pixel;
    }
    /***  background mouvement fonction***/
    BackgroundConstruction.prototype.mouvement = function () {
        var that = this;
        var loop = function (fonction) {
            setTimeout(function animLoop() {
                if (fonction()) {
                    requestAnimationFrame(animLoop);
                }
            }, 1 / 100);
        }
            loop(function () {

            that.proprieteLeft = parseFloat(that.proprieteLeft);

                if (that.proprieteLeft === -600) {
                    that.proprieteLeft = 0;
                };
            that.doc.style.left = that.px + that.proprieteLeft + 'px';
            that.proprieteLeft -= that.px;
            return true;
            });
    };
    return function (nom, pix) {
        return new BackgroundConstruction(nom, pix);
    };
}();
/*** création background ***/
var backgroundOne = factoryBackground(
    document.getElementById('imgBack1'), 0.5);
var backgroundTwo = factoryBackground(
    document.getElementById('imgBack2'), 1);
var backgroundThree = factoryBackground(
    document.getElementById('imgBack3'), 1.5);
var backgroundFour = factoryBackground(
    document.getElementById('imgBack4'), 1.5);
/***  background mouvement ***/
backgroundOne.mouvement();
backgroundTwo.mouvement();
backgroundThree.mouvement();
backgroundFour.mouvement();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** variation position sprite character***/
var rocketBoy = {
    /*** position  en attente ***/
    normal: [{
        largeurDeMasque: '42px',
        hauteurDeMasque: '68px',
        leftImage: '-6px',
        topImage: '-50px',
    }, {
        largeurDeMasque: '42px',
        hauteurDeMasque: '68px',
        leftImage: '-50px',
        topImage: '-52px',
    }, {
        largeurDeMasque: '42px',
        hauteurDeMasque: '68px',
        leftImage: '-100px',
        topImage: '-52px',
    }, {
        largeurDeMasque: '42px',
        hauteurDeMasque: '68px',
        leftImage: '-148px',
        topImage: '-51px',
    }, {
        largeurDeMasque: '42px',
        hauteurDeMasque: '68px',
        leftImage: '-196px',
        topImage: '-51px',
    }, {
        largeurDeMasque: '42px',
        hauteurDeMasque: '68px',
        leftImage: '-243px',
        topImage: '-50px',
    }],
    /*** position quand il monte ***/
    up: [{
        largeurDeMasque: '66px',
        hauteurDeMasque: '58px',
        leftImage: '-52px',
        topImage: '-133px',
    }, {
        largeurDeMasque: '66px',
        hauteurDeMasque: '58px',
        leftImage: '-174px',
        topImage: '-133px',
    }],
    /*** position quand il va vers la droite et la gauche avec l'aide du Xscale ***/
    right: [{
        largeurDeMasque: '69px',
        hauteurDeMasque: '43px',
        leftImage: '-6px',
        topImage: '0px',
    }, {
        largeurDeMasque: '69px',
        hauteurDeMasque: '43px',
        leftImage: '-77px',
        topImage: '0px',
    }, {
        largeurDeMasque: '69px',
        hauteurDeMasque: '43px',
        leftImage: '-149px',
        topImage: '0px',
    }, {
        largeurDeMasque: '69px',
        hauteurDeMasque: '43px',
        leftImage: '-218px',
        topImage: '0px',
    }],
    /*** position quand le personnage est toucher ***/
    touch: [{
        largeurDeMasque: '70px',
        hauteurDeMasque: '44px',

        leftImage: '-3px',
        topImage: '-483px',
    }, {
        largeurDeMasque: '65px',
        hauteurDeMasque: '44px',

        leftImage: '-79px',
        topImage: '-483px',
    }, {

        largeurDeMasque: '65px',
        hauteurDeMasque: '44px',

        leftImage: '-149px',
        topImage: '-481px',
    }, {
        largeurDeMasque: '65px',
        hauteurDeMasque: '44px',

        leftImage: '-222px',
        topImage: '-481px',
    }, {
        largeurDeMasque: '65px',
        hauteurDeMasque: '44px',
        leftImage: '-3px',
        topImage: '-541px',
    }, {
        largeurDeMasque: '65px',
        hauteurDeMasque: '44px',
        leftImage: '-79px',
        topImage: '-539px',
    }, {
        largeurDeMasque: '65px',
        hauteurDeMasque: '44px',
        leftImage: '-149px',
        topImage: '-536px',
    }],
    /*** position quand le personnage est tuer ***/
    killed: [{
        largeurDeMasque: '47px',
        hauteurDeMasque: '67px',
        leftImage: '-9px',
        topImage: '-595px',
    }, {
        largeurDeMasque: '53px',
        hauteurDeMasque: '67px',
        leftImage: '-81px',
        topImage: '-595px',
    }, {
        largeurDeMasque: '65px',
        hauteurDeMasque: '47px',
        leftImage: '-150px',
        topImage: '-605px',
    }, {
        largeurDeMasque: '48px',
        hauteurDeMasque: '65px',
        leftImage: '-228px',
        topImage: '-597px',
    }, {
        largeurDeMasque: '62px',
        hauteurDeMasque: '54px',
        leftImage: '-5px',
        topImage: '-672px',
    }, {
        largeurDeMasque: '62px',
        hauteurDeMasque: '54px',
        leftImage: '-81px',
        topImage: '-672px',
    }, {
        largeurDeMasque: '50px',
        hauteurDeMasque: '64px',
        leftImage: '-156px',
        topImage: '-663px',
    }]
};
//sprite moonwalk character
var moon = {
    walk : [{
        largeurDeMasque: '33px',
        hauteurDeMasque: '100px',
        leftImage: '0px',
        topImage: '0px',
    }, {
        largeurDeMasque: '33px',
        hauteurDeMasque: '100px',
        leftImage: '-45px',
        topImage: '0px',
    }, {
        largeurDeMasque: '33px',
        hauteurDeMasque: '100px',
        leftImage: '-96px',
        topImage: '0px',
    }, {
        largeurDeMasque: '33px',
        hauteurDeMasque: '100px',
        leftImage: '-146px',
        topImage: '0px',
    }, {
        largeurDeMasque: '33px',
        hauteurDeMasque: '100px',
        leftImage: '-239px',
        topImage: '0px',
    }, {
        largeurDeMasque: '38px',
        hauteurDeMasque: '100px',
        leftImage: '-280px',
        topImage: '0px',
    }]
};
//var clear mouvement on key press
var aGauche = false;
var aDroite = false;
var enHaut = false;
var enBas = false;
//div centrage character
var monCarre = window.document.getElementById('centrage');
var defilement = 0;

/*** sprite mouvement en fonction des mouvement du personnage ***/
var CreationMouvement = function () {
    this.eltMasque = window.document.getElementById('masque');
    this.eltSprite = window.document.getElementById('sprite');
    this.eltCentrage = window.document.getElementById('centrage');
    this.x = 0;
}

CreationMouvement.prototype.mouvement = function (action) {
    var that = this;
    this.eltMasque.style.transform = `scaleX(${scaleX})`;
    if (this.x >= action.length) {
        that.x = 0;
    }
    this.eltMasque.style.width = action[this.x].largeurDeMasque;
    this.eltMasque.style.height = action[this.x].hauteurDeMasque;
    this.eltSprite.style.left = action[this.x].leftImage;
    this.eltSprite.style.top = action[this.x].topImage;
    this.x++;
}

var persoAction = new CreationMouvement();//character creation

var positionDepart = setInterval(function () {
    persoAction.mouvement(rocketBoy.normal);//position normal character
}, 150);

/*** Character mouvement on the scene ***/
window.addEventListener('keyup', function (evtClavier) {
    window.clearInterval(aGauche);
    window.clearInterval(aDroite);
    window.clearInterval(enHaut);
    window.clearInterval(enBas);
    aGauche = false;
    aDroite = false;
    enHaut = false;
    enBas = false;
    scaleX = 1;//give back the initial position;
});

var direction = {
    left: function (pix) {// move the character to the left
        monCarre.style.left = (parseFloat(monCarre.style.left) - pix) + 'px';
        if (parseFloat(monCarre.style.left) <= 0) {
            monCarre.style.left = "0px";
        };
    },
    right: function (pix) {// move the character to the right
        monCarre.style.left = (parseFloat(monCarre.style.left) - pix) + 'px';
        if (parseFloat(monCarre.style.left) > 500) {
            monCarre.style.left = "500px";
        };
    },
    up: function (pix) {// move the character to the top
        monCarre.style.top = (parseFloat(monCarre.style.top) - pix) + 'px';
        if (parseFloat(monCarre.style.top) < 19) {
            monCarre.style.top = "19px";
        };
    },
    down: function (pix) {// move the character to the bottom
        monCarre.style.top = (parseFloat(monCarre.style.top) - pix) + 'px';
        if (parseFloat(monCarre.style.top) >= 430) {
            monCarre.style.top = "430px";
        };
    }
}
// when im touching the keybord 
window.addEventListener('keypress', function (evtClavier) {

    var code = evtClavier.which;
    switch (code) {
        case 113:
            // à gauche
            if (aGauche === false) {
                
                aGauche = window.setInterval(function () {
                    direction.left(1);
                    scaleX = -1;//inverse sprite rocketBoy.right;
                    persoAction.mouvement(rocketBoy.right);//animation sprite left;
                }, 1);
                // scaleX = 0;
            }
            break;
        case 122:
            // en haut
            if (enHaut === false) {
                enHaut = window.setInterval(function () {
                    direction.up(1);
                    persoAction.mouvement(rocketBoy.up);//animation sprite up;
                }, 1);
            }
            break;
        case 100:
            // à droite
            if (aDroite === false) {
                aDroite = window.setInterval(function () {
                    direction.right(-1);
                    persoAction.mouvement(rocketBoy.right);//animation sprite right;
                
                }, 1);
            };
            break;
        case 115:
            // en bas
            if (enBas === false) {
                enBas = window.setInterval(function () {
                    direction.down(-1);
                }, 1);
            }
            break;
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*** variation position sprite coins's color***/
var coins = {
    or: [{
        largeurDeMasque: '43px',
        hauteurDeMasque: '42px',
        leftImage: '-17px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '41px',
        hauteurDeMasque: '42px',
        leftImage: '-63px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '37px',
        hauteurDeMasque: '42px',
        leftImage: '-110px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '31px',
        hauteurDeMasque: '42px',
        leftImage: '-156px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '20px',
        hauteurDeMasque: '42px',
        leftImage: '-198px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '9px',
        hauteurDeMasque: '42px',
        leftImage: '-228px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '20px',
        hauteurDeMasque: '42px',
        leftImage: '-246px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '31px',
        hauteurDeMasque: '42px',
        leftImage: '-272px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '37px',
        hauteurDeMasque: '42px',
        leftImage: '-308px',
        topImage: '-284px',
    }, {
        largeurDeMasque: '41px',
        hauteurDeMasque: '42px',
        leftImage: '-347px',
        topImage: '-284px',
    }],
    argent: [{
        largeurDeMasque: '43px',
        hauteurDeMasque: '42px',
        leftImage: '-17px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '41px',
        hauteurDeMasque: '42px',
        leftImage: '-63px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '37px',
        hauteurDeMasque: '42px',
        leftImage: '-110px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '31px',
        hauteurDeMasque: '42px',
        leftImage: '-156px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '20px',
        hauteurDeMasque: '42px',
        leftImage: '-198px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '9px',
        hauteurDeMasque: '42px',
        leftImage: '-228px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '20px',
        hauteurDeMasque: '42px',
        leftImage: '-246px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '31px',
        hauteurDeMasque: '42px',
        leftImage: '-272px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '37px',
        hauteurDeMasque: '42px',
        leftImage: '-308px',
        topImage: '-454px',
    }, {
        largeurDeMasque: '41px',
        hauteurDeMasque: '42px',
        leftImage: '-347px',
        topImage: '-454px',
    }],
    bronze: [{
        largeurDeMasque: '43px',
        hauteurDeMasque: '42px',
        leftImage: '-17px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '41px',
        hauteurDeMasque: '42px',
        leftImage: '-63px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '37px',
        hauteurDeMasque: '42px',
        leftImage: '-110px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '31px',
        hauteurDeMasque: '42px',
        leftImage: '-156px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '20px',
        hauteurDeMasque: '42px',
        leftImage: '-198px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '9px',
        hauteurDeMasque: '42px',
        leftImage: '-228px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '20px',
        hauteurDeMasque: '42px',
        leftImage: '-246px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '31px',
        hauteurDeMasque: '42px',
        leftImage: '-272px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '37px',
        hauteurDeMasque: '42px',
        leftImage: '-308px',
        topImage: '-621px',
    }, {
        largeurDeMasque: '41px',
        hauteurDeMasque: '42px',
        leftImage: '-347px',
        topImage: '-621px',
    }]
};
// coins 
var gain = 0;
document.getElementById('add').innerHTML = gain;

var UsinePiece = function () {// coins fabric

    var PieceConstructeur = function (x, positionTop, pix) {//coins property

        this.newCentrage = document.createElement('div');//creation div centrage for coins
        this.where = document.getElementById('game').appendChild(this.newCentrage).classList.add("centrageDeux");
        this.name = document.getElementsByClassName("centrageDeux")[x];
        
        this.newMasque = document.createElement('div');//creation masque div for coins
        this.where2 = this.name.appendChild(this.newMasque).classList.add("masqueDeux");
        this.eltMasque2 = this.name.getElementsByTagName('div')[0];

        this.newImage = document.createElement('img');//creation image for sprite coins
        this.where3 = document.getElementsByClassName("masqueDeux")[x].appendChild(this.newImage).classList.add("spriteDeux");
        this.name3 = document.getElementsByClassName("spriteDeux")[x];
        this.ajout4 = this.name3.setAttribute('src', 'images/coins.png');
        this.eltSprite2 = this.eltMasque2.getElementsByTagName('img')[0];

        this.pos = positionTop + "px";
        this.pixel = pix;
        this.anim = false;
        this.x = 0;
    }
//methode for sprite mouvement
    PieceConstructeur.prototype.mouvement = function (action) {
        this.name.style.top = this.pos;

        var that = this;

        if (this.x >= action.length) {
            that.x = 0;
        }
        this.eltMasque2.style.width = action[this.x].largeurDeMasque;
        this.eltMasque2.style.height = action[this.x].hauteurDeMasque;
        this.eltSprite2.style.left = action[this.x].leftImage;
        this.eltSprite2.style.top = action[this.x].topImage;
        this.x++;

    }
//methode for coins through the screen 
    PieceConstructeur.prototype.mouvementFromRightToLeft = function () {
        var that = this;

        var loopUn = function (fonction) {
            setTimeout(function animLoopUn() {
                if (fonction) {
                    requestAnimationFrame(animLoopUn);
                    collisionOne();
                }
            }, 1 / 1);
        }

            loopUn(setInterval(function () {

            var taille = getComputedStyle(that.name, null).getPropertyValue("left");
            var taille = parseFloat(taille);

                if (taille < -100) {
                    clearInterval(that.anim);
                    that.anim = false;
                    taille = 650;
                    that.name.style.display = 'block';
                }

            that.name.style.left = taille - that.pixel + "px";

            },30));

//methode for coins's collision with character
                var collisionOne = function () {
                //character property
                    var persoX = parseFloat(monCarre.style.left);
                    var persoY = parseFloat(monCarre.style.top);
                    var persoWidth = parseFloat(document.getElementById('masque').style.width);
                    var persoHeight = parseFloat(document.getElementById('masque')
                    .style.height);

                //this planet property
                    var coinsX = window.getComputedStyle(that.name, null).getPropertyValue("left");
                    var coinsY = window.getComputedStyle(that.name, null).getPropertyValue("top");
                    coinsX = parseFloat(coinsX);
                    coinsY = parseFloat(coinsY);
                    var coinsWidth = 70;
                    var coinsHeight = 70;

                        if (persoX < coinsX + coinsWidth &&
                            persoX + persoWidth > coinsX &&
                            persoY < coinsY + coinsHeight &&
                            persoHeight + persoY > coinsY) {
                        // collision détectée !

                            that.name.style.left = coinsX- 300 + 'px';
                            that.name.style.display = 'none';
                            monCarre.style.left = persoX+ 20 + 'px';
                            
                            if( gain < 12){
                            document.getElementsByClassName('etagere')[0].getElementsByTagName('div')[gain].style.display = 'block';
                            gain += 1;
                            document.getElementById('add').innerHTML = gain;//compter
                            //affichage evolution images
                                if (gain === 2) { document.getElementById("evo1").style.display = "block"; };
                                if (gain === 4) { document.getElementById("evo2").style.display = "block"; };
                                if (gain === 6) { document.getElementById("evo3").style.display = "block"; };
                                if (gain === 8) { document.getElementById("evo4").style.display = "block"; };
                                if (gain === 10) { document.getElementById("evo5").style.display = "block"; };
                            };

                            if (gain >= 12){

                            document.getElementById('hideShow').style.display = 'none';
                                life = 4; //give all the life back
                            //fonction change image start and text on button / reload the page
                            var change = function () {
                                that.name.style.display = "none";
                            var back = document.getElementById('start');

                            var back1 = back.style.backgroundImage = "url('./images/win.jpg')";
                            document.getElementById('btn').style.fontSize = "20px";
                            document.getElementById('btn').innerHTML = "YOU WIN";

                                setTimeout(function () {
                                    window.location.reload(true);
                                }, 7000)
                            };
                                //fonction character moonwalk active
                                var moonMvt = function (action) {

                                if (defilement >= action.length) {
                                    defilement = 0;
                                };
                                    //defilement sprite
                                    var mvt8 = document.getElementById("moonWalk");
                                    var mvt9 = document.getElementById("walk");
                                    mvt8.style.display = "block";
                                    mvt8.style.width = action[defilement].largeurDeMasque;
                                    mvt8.style.height = action[defilement].hauteurDeMasque;
                                    mvt9.style.left = action[defilement].leftImage;
                                    mvt9.style.top = action[defilement].topImage;
                                    //defilement masque
                                        var avancer = parseFloat(window.getComputedStyle(mvt8, null).getPropertyValue("left"));
                                        mvt8.style.left = avancer + 6 + "px";

                                        defilement++;
                                };

                            setInterval(function () {
                                moonMvt(moon.walk);
                            }, 150);

                            change();    
                            $(".start").slideDown(); 
                            };
                        };
                    };
                };
    return function (a, b, c) {
        return new PieceConstructeur(a, b, c);
    };
}();
//piece creation
var pieceOne = UsinePiece(0, 150, 1);
var pieceTwo = UsinePiece(1, 250, 2);
var pieceThree = UsinePiece(2, 200, 4);
var pieceFour = UsinePiece(3, 350, 3);
var pieceFive = UsinePiece(4, 450, 5);
var pieceSix = UsinePiece(5, 100, 2);
// initialisation methode sprite coins
setInterval(function () {
    pieceOne.mouvement(coins.bronze);
    pieceTwo.mouvement(coins.argent);
    pieceThree.mouvement(coins.or);
    pieceFour.mouvement(coins.bronze);
    pieceFive.mouvement(coins.argent);
    pieceSix.mouvement(coins.or);
}, 100);
   //initialisation methode coins from right to left
        pieceOne.mouvementFromRightToLeft();
        pieceTwo.mouvementFromRightToLeft();
        pieceThree.mouvementFromRightToLeft();
        pieceFour.mouvementFromRightToLeft();
        pieceFive.mouvementFromRightToLeft();
        pieceSix.mouvementFromRightToLeft();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var life = 3;
var validation = false;
    var validation1 = false;
    var validation2 = false;
    var validation3 = false;
// planet fabric
var factoryPlanete = function () {
// planet property
    var Constructeur = function (x, positionTop, pixelTimer) {
        this.anim = false;
        this.start = false;
        //planet creation
        this.nouveau = document.createElement('span');
        this.where = document.getElementById('game').appendChild(this.nouveau);
        this.name = document.getElementsByTagName("span")[x];
        this.ajout = this.name.classList.add("planete");
        this.animation = this.name.style.WebkitAnimation = "mymove" + x + " 2s infinite";
        this.animation = this.name.style.MozAnimation = "mymove" + x + " 3s infinite";
        this.animation = this.name.style.animation = "mymove" + x + " 2s infinite";

        this.top = this.name.style.top = positionTop + "px";
        this.px = 1;
        this.timing = pixelTimer;
        this.life = 4;
    }
//methode for planet mouvement
    Constructeur.prototype.mouvementRightLeft = function () {
    var that = this;
       
        //methode for planet mouvement
        var loopTrois = function (fonction) {
            setTimeout(function animLoopTrois() {
                if (fonction) {
                    requestAnimationFrame(animLoopTrois);
                    collisionTwo();
                }
            }, 1 / 1000);
        }

            loopTrois(setInterval(function () {

            var taille = window.getComputedStyle(that.name, null).getPropertyValue("left");
            var taille = parseFloat(taille);
                
                if (taille < -100) {
                    clearInterval(that.anim);
                    that.anim = false;
                    taille = 650;
                    that.name.style.display = "block";
                }
            that.name.style.left = taille - that.timing + "px";
            },30));
//methode for planet collision with character
                var collisionTwo = function () {
                    //character property
                    var persoX = parseFloat(monCarre.style.left);
                    var persoY = parseFloat(monCarre.style.top);
                    var persoWidth = parseFloat(document.getElementById('masque').style.width);
                    var persoHeight = parseFloat(document.getElementById('masque')
                    .style.height);

                    //this planet property
                    var planetX = window.getComputedStyle(that.name, null).getPropertyValue("left");
                    var planetY = window.getComputedStyle(that.name, null).getPropertyValue("top");
                    planetX = parseFloat(planetX);
                    planetY = parseFloat(planetY);
                    var planetWidth = 70;
                    var planetHeight = 70;

                    if (persoX < planetX + planetWidth &&
                        persoX + persoWidth > planetX &&
                        persoY < planetY + planetHeight &&
                        persoHeight + persoY > planetY) {
                    // collision détectée !
                    
                        that.name.style.left = planetX- 130 + 'px';
                        monCarre.style.left = persoX+ 15 + 'px';

                        if (life === 0) {
            //game over part
                        gain = 0; // loose all coins
                        $('.progress-bar').animate({width: '0%'},500);
                        life --; 
                        restart = 2;
                            
                            var change2 = function(){
                                var back = document.getElementById('start');
                            
                                var back1 = back.style.backgroundImage = "none";
                                console.log(back);
                                document.getElementById('btn').style.fontSize = "15px";
                                document.getElementById('btn').innerHTML = "GAME OVER";
                                clearInterval(positionDepart);
                                setInterval(function () {
                                persoAction.mouvement(rocketBoy.killed);
                                },150); 
                        //reload function
                        setTimeout(function(){
                        window.location.reload(true);
                        },5000)
                        }

                        change2();
                        $(".start").slideDown();  
                        }
            // lost three life part
                            if (life === 1){

                            var toucher = setInterval(function () {
                                persoAction.mouvement(rocketBoy.touch);
                            });
                            $('.progress-bar').animate({ width: '25%' }, 500);
                            life--;
                                setTimeout(function () {
                                    clearInterval(toucher);//retour position normal character
                                }, 150);  
                            }
                                if (life === 2){
                                    
                                var toucher = setInterval(function () {
                                    persoAction.mouvement(rocketBoy.touch);
                                }); 
                                $('.progress-bar').animate({ width: '50%' }, 500);
                                life--;
                                    setTimeout(function () {
                                        clearInterval(toucher);//retour position normal character
                                    }, 150);  
                                }; 
                                    if (life === 3){

                                    var toucher = setInterval(function(){  
                                    persoAction.mouvement(rocketBoy.touch);
                                    });
                                    $('.progress-bar').animate({width: '75%'},500);
                                        life --;
                                        setTimeout(function(){
                                            clearInterval(toucher);//retour position normal character
                                        }, 150);  
                                    };        
                    };
                
                };
            };
    return function (a, b, c) {
        return new Constructeur(a, b, c);
    };
}();
//planet cration
var planeteOne = factoryPlanete(0, 60, 3);
var planeteTwo = factoryPlanete(1, 120, 4);
var planeteThree = factoryPlanete(2, 180, 2);
var planeteFour = factoryPlanete(3, 240, 1);
var planeteFive = factoryPlanete(4, 300,3);
var planeteSix = factoryPlanete(5, 360, 4);
var planeteSeven = factoryPlanete(6, 420, 2);
// initialisation methode for planet
planeteOne.mouvementRightLeft();
planeteTwo.mouvementRightLeft();
planeteThree.mouvementRightLeft();
planeteFour.mouvementRightLeft();
planeteFive.mouvementRightLeft();
planeteSix.mouvementRightLeft();
planeteSeven.mouvementRightLeft();
},500);
});
});