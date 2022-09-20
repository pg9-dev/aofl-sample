/**
 * @route /
 * @title Eso
 * @prerender true
 */
import {template} from './template';
import {AoflElement, customElement, property} from '@aofl/element';
import styles from './template.css';
import {cards} from '../../contracts/cards/cards.js';
import {isRequired, validationMixin} from '@aofl/form-validate';
import getCardData from './service';

/**
 * @extends {AoflElement}
 */
@customElement('custom-home-page')
class HomePage extends validationMixin(AoflElement) {
  /**
   * @type {String}
   * @static
   * @readonly
   */
  static is = 'custom-home-page';

  constructor() {
    super();

    this.validators = {
      description: {
        isRequired
      }
    };
  }

  @property({type: Number, attribute: false, mapState: 'cardLength', store: cards})
  count = 25;

  @property({type: Array, attribute: false, mapState: 'cards', store: cards})
  cards = [];

  description = '';


  descriptionChange(e) {
    this.description = e.target.value;
    this.form.description.validate();
  }

  async insertCard(e) {
    e.preventDefault();
    this.form.validate();
    await this.form.validateComplete;
    if (this.form.valid) {
      const form = e.target;
      const formData = new FormData(form);
      const description = formData.get('description');
      cards.insert({description, data: await getCardData()});
      this.description = '';
      this.form.reset();
    }
  }
  /**
   * @protected
   * @return {Object}
   */
  render() {
    return super.render(template, [styles]);
  }
}

export default HomePage;
