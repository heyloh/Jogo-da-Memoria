(function () {

    var matches = 0;

    var images = [];

    var flippledCards = [];

    var modalGameOver = document.getElementById("modalGameOver");

    var imgMatchSign = document.getElementById("imgMatchSign");

    matchSign = document.getElementById("match");

    for (var i = 0; i < 24; i++) {
        var img = {
            src: "Fase5/" + i + ".png",
            id: i % 12
        };
        images.push(img);
    }

    startGame();

    function startGame() {
        flippledCards = [];

        matches = 0;

        images = randomSort(images);

        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");

        for (var i = 0; i < 24; i++) {

            backFaces[i].classList.remove("match", "flipped");
            frontFaces[i].classList.remove("match", "flipped");


            var card = document.getElementById("card" + i);
            card.style.left = (i % 8 === 0) ? 10 + "px" : (i % 8) * 210 + 10 + "px";
            card.style.top = i < 8 ? 10 + "px" : (i < 16 ? 220 + "px" : 435 + "px");

            card.addEventListener("click", flipCard, false);

            frontFaces[i].style.background = "url('" + images[i].src + "')";
            frontFaces[i].setAttribute("id", images[i].id);
        }
        modalGameOver.style.zIndex = "-2";
        modalGameOver.removeEventListener('click', function () {
            startGame();
        }, false);
    }

    function randomSort(oldArr) {
        var newArr = [];
        while (newArr.length !== oldArr.length) {
            var i = Math.floor(Math.random() * oldArr.length);

            if (newArr.indexOf(oldArr[i]) < 0) {
                newArr.push(oldArr[i]);
            }
        }
        return newArr;
    }

    function flipCard() {
        if (flippledCards.length < 2) {
            var faces = this.getElementsByClassName("face");

            if (faces[0].classList[2]) {
                return;
            }

            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");

            flippledCards.push(this);

            if (flippledCards.length === 2) {
                if (flippledCards[0].childNodes[3].id === flippledCards[1].childNodes[3].id) {
                    flippledCards[0].childNodes[1].classList.toggle("match");
                    flippledCards[0].childNodes[3].classList.toggle("match");
                    flippledCards[1].childNodes[1].classList.toggle("match");
                    flippledCards[1].childNodes[3].classList.toggle("match");

                    matchCardSign();

                    matches++;

                    flippledCards = [];

                    if (matches >= 12) {
                        gamerOver();
                    }
                }
            }

        } else {
            flippledCards[0].childNodes[1].classList.toggle("flipped");
            flippledCards[0].childNodes[3].classList.toggle("flipped");
            flippledCards[1].childNodes[1].classList.toggle("flipped");
            flippledCards[1].childNodes[3].classList.toggle("flipped");

            flippledCards = [];
        }

        function gamerOver() {
            modalGameOver.style.zIndex = 50;
            modalGameOver.addEventListener("click", function () {
                location.href = "fase6.html";
            }, false);
        }

        function matchCardSign() {
            matchSign.style.zIndex = "1";
            matchSign.style.top = "150px";
            matchSign.style.opacity = "0";
            setTimeout(function () {
                matchSign.style.zIndex = -1;
                matchSign.style.top = 250 + "px";
                matchSign.style.opacity = 1;
            }, 1500)
        }
    }
}());