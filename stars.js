class Stars {
constructor(amount,speed,size){
    this.amount = amount;
    this.speed = speed;
    this.size = size;
}
createStars(){
    var height = document.body.clientHeight;
var width = document.body.clientWidth;
    let starsNodes = '';
    for ( let i =0; i < this.amount; i++) {
        let star = document.createElement('div');
    star.setAttribute('class','star');
    star.style.top= Math.random()*height- 100 + 'px';
    star.style.left= Math.random()*width- 100 + 'px';
    star.style.opacity=  Math.random();
    star.style.width =  Math.random()*this.size + 5 + 'px';
    star.style.height =  star.style.width;
    star.style.animationDelay =  Math.random()*2 + 's';
        document.querySelector('.background-clouds').appendChild(star);
        console.log(starsNodes);
    }
}
}

const starsBg = new Stars(200, 10,40);

starsBg.createStars();