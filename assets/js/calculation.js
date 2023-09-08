// prob to correct at most i time out of N
function chanceExact(chance, N, i) {
  let sum = 0
  for(let j = 0; j <= i ; j++) {
    //(chance^i)*(1-chance)^(N-i)
    let top = 1
    let bottom = 1
    for(let k = 0 ; k < j ; k++) {
      top *= N-k
    }
    for(let k = 2 ; k <= j ; k++) {
      bottom *= k
    }
    sum += (top/bottom)*Math.pow(chance,i)*Math.pow(1-chance,N-i)
  }
  return sum
}

function chanceCalculate(chance, N) {
  let result = []
  for(let i = 0; i <= N ; i++) {
    result.push(chanceExact(chance, N, i))
  }
  return result
}

function calculate(chance, N) {
  let leastDif = Infinity
  let leastDifIndex = -1

  let lucky = chanceCalculate(0.5, N)
  let unlucky = chanceCalculate(chance, N)

  for(let i = 0 ; i <= N ; i++) {
    dif = Math.abs((1 - lucky[i]) - unlucky[i])
    if(leastDif > dif) {
      leastDif = dif
      leastDifIndex = i
    }
  }
  return [lucky, unlucky, leastDifIndex]
}