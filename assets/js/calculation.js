// prob to correct at most i time out of N
function chanceLessThanEqual(chance, N, i) {
  let sum = new Decimal(0)
  for(let j = 0; j <= i ; j++) {
    //(chance^i)*(1-chance)^(N-i)
    let top = new Decimal(1)
    let bottom = new Decimal(1)
    for(let k = 1 ; k <= j ; k++) {
      top = top.mul(new Decimal(N-k+1))
      bottom = bottom.mul(new Decimal(k))
    }
    sum = Decimal.add(
      sum, 
      top.div(bottom).mul(
        new Decimal(chance).pow(j).mul(new Decimal(1-chance).pow(new Decimal(N-j)))
      )
    )
  }
  return sum
}

function chanceCalculate(chance, N) {
  let result = []
  for(let i = 0; i <= N ; i++) {
    result.push(chanceLessThanEqual(chance, N, i))
  }
  return result
}

function calculate(chance, random, N) {
  let leastDif = new Decimal(Infinity)
  let leastDifIndex = -1

  let lucky = chanceCalculate(random, N)
  let unlucky = chanceCalculate(chance, N)

  for(let i = 0 ; i <= N ; i++) {
    let dif =  Decimal.abs(
      new Decimal(1).minus(lucky[i]).minus(unlucky[i])
    )
    if(leastDif.gt(dif)) {
      leastDif = dif
      leastDifIndex = i
    }
  }
  return [lucky, unlucky, leastDifIndex]
}