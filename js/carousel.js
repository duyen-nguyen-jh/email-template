let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(currSlideIndex) {
  showSlides((slideIndex += currSlideIndex));
}

function currentSlide(currSlideIndex) {
  showSlides((slideIndex = currSlideIndex));
}

function showSlides(currSlideIndex) {
  const slides = document.getElementsByClassName("mySlides");
  const imgButtonList = document.getElementsByClassName("imgButton");
  if (currSlideIndex > slides.length) {
    slideIndex = 1;
  }
  if (currSlideIndex < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < imgButtonList.length; i++) {
    imgButtonList[i].className = imgButtonList[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  imgButtonList[slideIndex - 1].className += " active";
}
