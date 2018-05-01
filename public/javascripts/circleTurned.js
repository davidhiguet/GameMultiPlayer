window.addEventListener('DOMContentLoaded', function () {

        var ConstructeurFactoryCircle = function (x, positionLeft, positionTop) {
            this.cercle - document.getElementById('circle');
            this.nouveau = document.createElement('span');
            this.where = document.getElementById('circle').appendChild(this.nouveau);
            this.name = document.getElementsByTagName("span")[x];
            this.ajout = this.name.classList.add("bigCircle");
            this.color = ["yellow", "red"];
            if (x % 2){
            this.ajout2 = this.name.classList.add(this.color[0]);
            } else {
            this.ajout2 = this.name.classList.add(this.color[1]);    
            }
            this.top = this.name.style.top = positionTop + "px";
            this.left = this.name.style.left = positionLeft + "px";
        }
       
    //cercle creation
    var circleOne =  new ConstructeurFactoryCircle(0, 145, -60);
    var circleTwo =  new ConstructeurFactoryCircle(1, 315, -13);
    var circleThree =  new ConstructeurFactoryCircle(2, 407,145);
    var circleFour =  new ConstructeurFactoryCircle(3, 363, 317);
    var circleFive =  new ConstructeurFactoryCircle(4, 198, 399);
    var circleSix =  new ConstructeurFactoryCircle(5, 16, 356);
    var circleSeven =  new ConstructeurFactoryCircle(6, -67, 201);
    var circleEight =  new ConstructeurFactoryCircle(7, -24, 35);
})
