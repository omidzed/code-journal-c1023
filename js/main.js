/* global data */

const $photoUrl = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $entryForm = document.querySelector('.new-entry');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = $photoUrl.value;
});

$entryForm.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId++,
    title: $title.value,
    notes: $notes.value,
    photoUrl: $photoUrl.value,
  };
  data.entries.unshift(entry);
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
}
