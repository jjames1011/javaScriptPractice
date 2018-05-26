const images = [
  'IMG_6147.jpg',
  'IMG_6156-3.jpg',
  'IMG_6158-2.jpg',
  'IMG_6162.jpg',
  'IMG_6167-2.jpg'
]
const $div = $('#carousel');
const $img = $('<img/>');
let imageIndex = 0;
$img.attr('src',`images/${images[imageIndex]}`);

const $nextButton = $('<button id="next">Next Image</button>');
const $prevButton = $('<button id="prev">Prev button</button>');
$nextButton.css('display','block');
$prevButton.css('display','block');

$nextButton.on('click', () => {
  if(imageIndex === images.length-1){
    imageIndex = 0;
  } else {
  imageIndex += 1;
  }
  $img.attr('src', `images/${images[imageIndex]}`);
});

$prevButton.on('click', () => {

  if(imageIndex <= 0){
    imageIndex = images.length-1;
  }else{
    imageIndex -= 1;
  }
  $img.attr('src', `images/${images[imageIndex]}`);
})


$div.append($img);
$div.append($prevButton);
$div.append($nextButton);
