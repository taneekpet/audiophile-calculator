const tmpOnload = window.onload;

let mainTable, lucky, unlucky, maxIndex;

window.onload = function() {
  mainTable = document.querySelector('table#mainTable');
}

function isNumberUI(event) {
  const orig = event.target.value.toString();
  let i = 0;
  while(orig[i] === '0') {
    i++;
  }
  event.target.value = orig.substr(i);
  return !isNaN(event.target.value);
}

function Fill() {
  let correctChance =  document.querySelector('input#correctChance').value;
  let N = document.querySelector('input#numberOfTrial').value;
  correctChance = parseFloat(correctChance);
  N = parseInt(N);

  if(correctChance < 0 || correctChance > 1) {
    alert('โอกาสระหว่าง 0-1 ครับ');
    return;
  }
  
  // delete all
  let tableLength = mainTable.childElementCount
  while(tableLength > 1) {
    tableLength--
    mainTable.removeChild(mainTable.lastElementChild)
  }

  [lucky, unlucky, maxIndex] = calculate(correctChance,N)
  for(let i = 0; i < N ; i++) {
    const newRow = document.createElement('tbody');
    const newTr = document.createElement('tr');
    const newTh0 = document.createElement('th');
    newTh0.scope = 'row';
    newTh0.innerHTML = i+1;

    const newTh1 = document.createElement('th');
    newTh1.scope = 'row';
    newTh1.innerHTML = (1-lucky[i])*100;

    const newTh2 = document.createElement('th');
    newTh2.scope = 'row';
    newTh2.innerHTML = unlucky[i]*100;

    if(i == maxIndex){
      newTr.style.color = 'green'
    }

    newTr.appendChild(newTh0);
    newTr.appendChild(newTh1);
    newTr.appendChild(newTh2);
    newRow.appendChild(newTr);
    mainTable.appendChild(newRow)
  }

  return false;
}