/*
===========================================================================>
||||||||||||||||||||||||||||Slider Photo-Captions||||||||||||||||||||||||||
===========================================================================>
*/
(function(){
    var slider = document.querySelector(".photo-coparsion__item-slider");
    var container = document.querySelector(".photo-coparsion__wrapper-img");
    var photoCaptions = document.querySelector(".photo-coparsion__item-img_b-1");

    var rangeX = null;
    var shiftX = null;
    var difference = null;
    var positionX = null;
    var sizeContainer = null;
    var sizeSlider = null;

    function corectPosition() {
        let lowerLimit = 25;
        let upperLimit = sizeContainer.width - 25 - sizeSlider.width - container.clientLeft;
        if(positionX < lowerLimit) positionX = lowerLimit;
        if(positionX > upperLimit) positionX = upperLimit;
    }

    function determinationPosition (event) {
        sizeContainer = container.getBoundingClientRect();
        sizeSlider = slider.getBoundingClientRect();
        rangeX = slider.getBoundingClientRect().left;
        try { 
            shiftX = event.pageX || event.touches[0].pageX;
        } catch {
            shiftX = 0;
        }
        positionX = shiftX - sizeContainer.left - difference;
        corectPosition();
        return positionX;
    }

    function muvePhoto() {
        if(positionX < 0) {
            photoCaptions.style.width = '0px';
        } else {
            photoCaptions.style.width = `${positionX}px`;
        }
    }

    function muveSlider (event) {
        slider.style.left = `${determinationPosition(event)}px`;
        muvePhoto();
    }

    function muveAdd () {
        determinationPosition (event);
        difference = shiftX - rangeX + container.clientLeft;
        document.addEventListener('mousemove', muveSlider);
        document.addEventListener('touchmove', muveSlider);
    }

    function  muveRemove () {
        document.removeEventListener('mousemove', muveSlider);
        document.removeEventListener('touchmove', muveSlider);
    }


    slider.addEventListener("mousedown", muveAdd);
    slider.addEventListener('touchstart', muveAdd);

    document.addEventListener ("mouseup", muveRemove);
    document.addEventListener('touchend', muveRemove);
}());

