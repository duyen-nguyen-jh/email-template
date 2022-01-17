const sample = [
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    index: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    index: 2,
  },
  {
    src: "https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    index: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    index: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    index: 5,
  },
  {
    src: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    index: 6,
  },
];
function renderSlideContainer(list) {
  const slideContainer = document.getElementById("slideContainer");

  list.forEach((element) => {
    const slide = document.createElement("div");
    slide.className = "mySlides fade";
    slide.innerHTML = `<img src="${element.src}" />`;
    slideContainer.appendChild(slide);
  });
}
function renderImgPreview(list) {
  const listPreview = document.getElementById("listPreviewImg");

  list.forEach((element) => {
    const slide = document.createElement("span");
    slide.className = "imgButton";
    slide.innerHTML = `<img src="${element.src}" />`;
    slide.addEventListener("click", function () {
      currentSlide(element.index)
    })
    listPreview.appendChild(slide);
  });
}
renderSlideContainer(sample);
renderImgPreview(sample);

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
