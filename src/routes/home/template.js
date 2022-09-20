import {repeat} from 'lit-html/directives/repeat';

export const template = (ctx, html) => html`
    <h1>Cards (${ctx.count})</h1>

    <div draggable="true" class="add-card">
      <form @submit="${ctx.insertCard}">
        <input name="description" @input="${ctx.descriptionChange}" .value="${ctx.description}">
        <button class="button-30" type="submit" ?disabled="${!ctx.form?.valid}">+</button>
        ${!ctx.form.description.isRequired.valid? html`<p>Description is required</p>`: ''}
      </form>
    </div>

    <div class="cards"> 
      ${repeat( ctx.cards, (cd) => cd.index, (cd) => html`
        <article class="card">
            <header>
                <h2>${cd.data.title}</h2>
            </header>    
            <img src=${cd.data.imageURL} alt="Hot air balloons">
            <div class="content">
                <p> ${cd.description} </p>
            </div>
        </article>
      `)}
    </div>
`;

