/* global data */

const $photoUrl = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $entryForm = document.querySelector('.new-entry-form');
const $noEntries = document.querySelector('.no-entries');
const $entriesAnchor = document.querySelector('.entries-anchor');
const $views = document.querySelectorAll('.view-container');
const $newAnchor = document.querySelector('.new-anchor');
const $H2element = document.querySelector('#h2-new-entry');
const $entriesList = document.querySelector('.entries-list');

$newAnchor.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

$entriesAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
});

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = $photoUrl.value;
});

$entriesList.addEventListener('click', editIconHandler);

function editIconHandler(event) {
  const listItem = event.target.closest('li');
  viewSwap('entry-form');
  for (let i = 0; i < data.entries.length; i++) {
    if (
      data.entries[i].entryId === Number(listItem.getAttribute('data-entry-id'))
    ) {
      data.editing = data.entries[i];
    }
    $H2element.textContent = 'Edit Entry';
    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photoUrl;
    $notes.value = data.editing.notes;
    $photoPreview.src = $photoUrl.value;
  }
}

$entryForm.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();

  const entry = {
    entryId: data.nextEntryId,
    title: $title.value,
    notes: $notes.value,
    photoUrl: $photoUrl.value,
  };

  data.entries.unshift(entry);
  data.nextEntryId++;
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $entriesList.prepend(renderEntry(entry));
  $entryForm.reset();
  viewSwap('entries');
  toggleNoEntries();
}

function renderEntry(entry) {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'list-item');
  $listItem.setAttribute('data-entry-id', entry.entryId);

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
  $entryPhoto.setAttribute('alt', 'entry-photo');

  const $h3 = document.createElement('h3');
  $h3.setAttribute('class', 'title');
  $h3.textContent = entry.title;

  const $rowTitlePencil = document.createElement('div');
  $rowTitlePencil.setAttribute('class', '.row title-pencil');

  const $iconPencil = document.createElement('i');
  $iconPencil.setAttribute('class', 'fa-solid fa-pen');

  const $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entries-text');
  $paragraph.textContent = entry.notes;

  $listItem.appendChild($row);
  $row.appendChild($columnHalfOne);
  $columnHalfOne.appendChild($entryPhoto);
  $row.appendChild($columnHalfTwo);
  $columnHalfTwo.appendChild($rowTitlePencil);
  $rowTitlePencil.appendChild($h3);
  $rowTitlePencil.appendChild($iconPencil);
  $columnHalfTwo.appendChild($paragraph);
  console.log('$listItem: ', $listItem);
  return $listItem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  const $entries = data.entries;

  for (let i = 0; i < $entries.length; i++) {
    const entry = renderEntry($entries[i]);
    $entriesList.appendChild(entry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function viewSwap(targetView) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetView) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
  data.view = targetView;
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}
