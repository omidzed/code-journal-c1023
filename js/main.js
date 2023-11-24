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
const $delete = document.querySelector('#delete-anchor');
const $modal = document.querySelector('.modal-container');
const $cancel = document.querySelector('.cancel');
const $confirm = document.querySelector('.confirm');

// swaps views between entry form and entries list views
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

// Shows message for 'no saved entries'
function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

// createsANDrenders the <ul> of journal entries
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

  return $listItem;
}

// submits data from entry form to local-storage
function submitHandler(event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    title: $title.value,
    notes: $notes.value,
    photoUrl: $photoUrl.value,
  };

  if (data.editing === null) {
    data.entries.unshift(entry);
    data.nextEntryId++;
    $photoPreview.src = 'images/placeholder-image-square.jpg';
    $entriesList.prepend(renderEntry(entry));
    $entryForm.reset();
    viewSwap('entries');
    toggleNoEntries();
  } else {
    entry.entryId = data.editing.entryId;
    const $listItems = document.querySelectorAll('li');
    for (let i = 0; i < $listItems.length; i++) {
      const dataEntryId = $listItems[i].getAttribute('data-entry-id');
      if (Number(dataEntryId) === data.editing.entryId) {
        data.entries[i] = entry;
        $listItems[i].replaceWith(renderEntry(entry));
      }
    }
    data.editing = null;
    $H2element.textContent = 'New Entry';
    $photoPreview.src = 'images/placeholder-image-square.jpg';
    $entryForm.reset();
    viewSwap('entries');
    toggleNoEntries();
  }
}

// places targeted entry in data.editing to be edited/deleted
function editIconHandler(event) {
  document.querySelector('.save-delete').classList.remove('hidden');
  document.querySelector('.save').classList.add('hidden');
  const $listItem = event.target.closest('li');
  if (event.target.tagName === 'I') {
    for (let i = 0; i < data.entries.length; i++)
      if (
        data.entries[i].entryId ===
        Number($listItem.getAttribute('data-entry-id'))
      ) {
        data.editing = data.entries[i];
        $H2element.textContent = 'Edit Entry';
        $title.value = data.editing.title;
        $photoUrl.value = data.editing.photoUrl;
        $notes.value = data.editing.notes;
        $photoPreview.src = $photoUrl.value;
      }
  }
  viewSwap('entry-form');
}

// deletes the targeted entry from data.entries and $listItems
function confirmDeleteHandler(event) {
  const $listItems = document.querySelectorAll('li');
  for (let i = 0; i < $listItems.length; i++) {
    const dataEntryId = $listItems[i].getAttribute('data-entry-id');
    if (data.editing.entryId === Number(dataEntryId)) {
      $listItems[i].remove();
    }
  }
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }
  data.editing = null;
  $modal.classList.add('hidden');
  $H2element.textContent = 'New Entry';
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
  viewSwap('entries');
  toggleNoEntries();
}

function deleteHandler(event) {
  $modal.classList.remove('hidden');
}

function cancelHandler(event) {
  $modal.classList.add('hidden');
}

$entryForm.addEventListener('submit', submitHandler);
$delete.addEventListener('click', deleteHandler);
$cancel.addEventListener('click', cancelHandler);
$entriesList.addEventListener('click', editIconHandler);
$confirm.addEventListener('click', confirmDeleteHandler);

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = $photoUrl.value;
});

// provides a fresh entry form
$newAnchor.addEventListener('click', function (event) {
  $entryForm.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  viewSwap('entry-form');
  document.querySelector('.save-delete').classList.add('hidden');
  document.querySelector('.save').classList.remove('hidden');
});

$entriesAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entry = renderEntry(data.entries[i]);
    $entriesList.appendChild(entry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
