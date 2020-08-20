import { IsString, IsInt, Max, Min, IsBoolean, IsBooleanString } from 'class-validator';

export class ExampleDto {
  @IsString()
  name: string;

  @IsInt()
  @Max(70)
  @Min(18)
  age: number;
}
