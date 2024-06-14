function Calc(typeOfCalcuation, a, b ){
  
    var res;
    switch (typeOfCalcuation) {
        case 'add':
            res = a + b;
            break;
            case 'sub':
            res = a - b;
            break;
            case 'mul':
            res = a * b;
            break;
            case 'div':
                if (b == 0) {
                    throw new Error('The second parameter cannot be zero');
                }
            res = a / b;
            break;
    
        default:

            break;
    }
    return res;
}

console.log(Calc('div',4,2));