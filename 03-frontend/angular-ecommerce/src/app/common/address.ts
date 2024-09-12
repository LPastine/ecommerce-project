import { Country } from './country';
import { State } from './state';

export class Address {
  constructor(
    public street: string,
    public city: string,
    public state: State,
    public country: Country,
    public zipCode: string
  ) {}
}
