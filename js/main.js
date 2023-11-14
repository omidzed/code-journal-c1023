const $photoUrl = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = $photoUrl.value;
});
