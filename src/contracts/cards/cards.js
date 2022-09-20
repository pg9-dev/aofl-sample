import {decorate, Sdo, state, storeInstance} from '@aofl/store';

class Cards extends Sdo {
    static namespace = 'cards'

    @state()
    cards = [];


    insert(card) {
      this.cards = [
        ...this.cards,
        {verified: false, index: this.cards.length, data: card.data, description: card.description}
      ];
    }

    remove(card) {
      this.cards = [...this.cards.slice(0, card), ...this.cards.slice(card, this.cards.length - 1)];
    }

    @decorate('cards.cards')
    get cardLength() {
      return this.cards.length;
    }
}

const cards = new Cards();
storeInstance.addState(cards);

export {
  cards
};
