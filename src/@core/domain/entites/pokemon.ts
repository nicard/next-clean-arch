export type PokemomProps = {
  name: string;
  id?: number;
  weight?: string;
  url?: string;
};

export class Pokemon {
  constructor(private props: PokemomProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get weight() {
    return this.props.weight;
  }

  get url() {
    return this.props.url;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      weight: this.weight,
      url: this.url,
    };
  }
}
