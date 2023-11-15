/* global data */

const $photoUrl = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $entryForm = document.querySelector('.new-entry-form');
const $entriesList = document.querySelector('.entries-list');

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

function renderEntry(entry) {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'list-item');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  const $columnFull = document.createElement('div');
  $columnFull.setAttribute('class', 'column-full');

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');

  const $entryPhoto = document.createElement('img');
  $entryPhoto.setAttribute('class', 'entry-photo');

  const $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'entry-photo');

  const $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entries-text');

  $listItem.appendChild($row);
  $row.appendChild($columnHalf);
  $columnHalf.appendChild($entryPhoto);
  $row.appendChild($columnHalf);
  $columnHalf.appendChild($h3);
  $columnHalf.appendChild($paragraph);

  return $listItem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const entries = data.entries;

  for (let i = 0; i < entries.length; i++) {
    const $entry = renderEntry(entries[i]);
    $entriesList.appendChild($entry);
    i++;
  }
});
