import { Pokemon } from "./pokemon";

export type CartProps = {
  items: Pokemon[];
};

export class Cart {
  constructor(private props: CartProps) {
    this.props.items = props.items || [];
  }

  add(pokemon: Pokemon) {
    this.props.items.push(pokemon);
  }

  remove(pokemon: string) {
    this.props.items = this.props.items.filter((item) => item.name !== pokemon);
  }

  clear() {
    this.props.items = [];
  }

  get total() {
    return this.props.items.reduce((acc, p) => acc + 1, 0);
  }

  get items() {
    return this.props.items;
  }
}
