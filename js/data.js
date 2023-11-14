/* exported data */

const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
console.log(data);
window.addEventListener('beforeunload', handleBeforeunload);

function handleBeforeunload(data) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem(dataJSON);
}
