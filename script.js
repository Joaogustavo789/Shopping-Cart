const classeItems = document.getElementsByClassName('items')[0];
const classeCartItems = document.getElementsByClassName('cart__items')[0];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image, price: price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

function listaProdutos() {
  fetchProducts('computador').then((resposta) => 
  resposta.results.forEach((item) => 
  classeItems.appendChild(createProductItemElement(item))));
}
listaProdutos();

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.parentNode.remove();
  saveCartItems(classeCartItems.innerHTML);
};

const createCartItemElement = ({ thumbnail: image, title: name, price: salePrice }) => {
  const div = document.createElement('div');
  div.className = 'cart__item';
  // div.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  div.appendChild(createProductImageElement(image));
  div.appendChild(createCustomElement('div', 'name__cart', `${name}`))
  div.appendChild(createCustomElement('div', 'price__cart', `R$ ${salePrice}`))
  return div;
};

function fixaProduto() {
  classeCartItems.addEventListener('click', cartItemClickListener);
 } 
 fixaProduto();

function adicionaProdutos(produto) {
  fetchItem(produto).then((response) => {
  classeCartItems.appendChild(createCartItemElement(response));
  saveCartItems(classeCartItems.innerHTML);
  });
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('item__add')) {
    const acessaProduto = event.target.parentNode.firstChild.innerText;
    adicionaProdutos(acessaProduto);
  }
  if (event.target.classList.contains('empty-cart')) {
    classeCartItems.innerHTML = '';
  }
  });

classeCartItems.innerHTML = getSavedCartItems();

window.onload = () => { };
