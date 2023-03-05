import { Controller, Req, Put, Body } from '@nestjs/common';
import { Calc } from './calc.interface';
import { CalcService } from './calc.service';
import { Request } from 'express';

@Controller('calc')
export class CalcController {
  constructor(private calcService: CalcService) {}

  @Put()
  async count(
    @Req() request: Request,
    @Body() data: Calc,
  ): Promise<number | string> {
    const oper = request.get('Type-Operation');
    data.oper = oper;
    return this.calcService.calculate(data);
  }
}
