export class CreateProductDto {
  readonly title: string;
  readonly price: number;
  readonly isComplet?: boolean;
  readonly llc: string;
}
