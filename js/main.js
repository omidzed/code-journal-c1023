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

  const $columnHalfOne = document.createElement('div');
  $columnHalfOne.setAttribute('class', 'column-half');

  const $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.setAttribute('class', 'column-half');

  const $entryPhoto = document.createElement('img');
  $entryPhoto.setAttribute('class', 'entry-photo');
  $entryPhoto.setAttribute('src', entry.photoUrl);

  const $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'title');
  $h3.textContent = entry.title;

  const $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entries-text');
  $paragraph.textContent = entry.notes;

  $listItem.appendChild($row);
  $row.appendChild($columnHalfOne);
  $columnHalfOne.appendChild($entryPhoto);
  $row.appendChild($columnHalfTwo);
  $columnHalfTwo.appendChild($h3);
  $columnHalfTwo.appendChild($paragraph);

  return $listItem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const entries = data.entries;

  for (let i = 0; i < entries.length; ) {
    const entry = renderEntry(entries[i]);
    $entriesList.appendChild(entry);
    i++;
  }
  return $entriesList;
});

function toggleNoEntries() {
  const $noEntries = document.querySelector('.no-entries');
  if (data.entries.length > 0) {
    $noEntries.setAttribute('class', 'no-entries hidden');
  } else {
    $noEntries.setAttribute('class', 'no-entries');
  }
}

toggleNoEntries();
