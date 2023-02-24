import { Injectable } from '@nestjs/common';
import { Calc } from './calc.interface';

@Injectable()
export class CalcService {
  calculate(calc: Calc): number | string {
    console.log(calc);
    if (calc.oper === 'plus') {
      return +calc.f + +calc.s;
    }
    if (calc.oper === 'minus') {
      return calc.f - calc.s;
    }
    if (calc.oper === 'multi') {
      return calc.f * calc.s;
    }
    return 'Invlaid input';
  }
}
