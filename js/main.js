function el(query) {
  return document.querySelector(query);
}

const productContainer = el('.product-container');

const styles = {
  sectionHeading: 'my-container text-3xl font-bold mb-3 text-left left-3 xl:text-left',
  sectionProductsContainer:
    'gap-8 md:grid md:grid-cols-1 md:px-10 lg:grid lg:grid-cols-1 lg:gap-10 lg:px-20 xl:grid xl:grid-cols-2 xl:gap-28 2xl:grid 2xl:grid-cols-3 2xl:gap-32 ml-[-78px] mb-10',
};

const selectedProducts = [];

function renderProductsContainer() {
  let html = {};
  products.map((section) => {
    let sectionHtml = ``;
    section.items.map((item) => {
      sectionHtml += `
      <div class="w-[300px] h-[340px] bg-white">
      <div class="mt-4">
        <img class="mx-auto px-14 py-4 bg-gray-100 w-[250px] h-[200px]" src="${item.image}" alt="" />
      </div>
      <div class="mt-3">
      <div class="mb-2">
        <p class="text-lg font-semibold text-center">z${item.name}</p>
        <img class="mx-auto " src="/aset/svg/fiveStar.svg" alt="" />
        <p class="text-lg font-semibold text-center ">price : <span class="product-price2">${item.price} Tk</span></p>
      </div>
        <button
          class="order-btn2 w-full py-1 bg-[#E527B2] font-bold text-white text-lg hover:bg-[#ff75da] hover:text-black duration-200"
          onclick="handleOrder(${item.id},'${section.categoryId}')"
        >
          Order now
        </button>
      </div>
    </div>
      `;
    });
    html[section.categoryId] = {
      markup: sectionHtml,
      sectionTitle: section.categoryName,
    };
  });
  let actualHtml = ``;

  // console.log(Object.entries(html));
  Object.entries(html).map((x) => {
    actualHtml += `
    <section>
            <p class="${styles.sectionHeading}">${x[1].sectionTitle}</p>
            <div
              class="${styles.sectionProductsContainer}"
            >
              ${x[1].markup}
            </div>
          </section>
    `;
  });

  el('.product-container').innerHTML = actualHtml;
}
renderProductsContainer();

function handleOrder(productId, categoryId) {
  products.map((product) => {
    if (product.categoryId === categoryId) {
      product.items.map((item) => {
        if (item.id === productId) {
          selectedProducts.push({ ...item, id: `${product.categoryId}-${item.id}` });
        }
      });
    }
  });
  el('.total-price').innerHTML = calculateTotalPrice();
  el('.products-name').innerHTML = selectedProducts.map((sp) => sp.name).join(', ');
}

function calculateTotalPrice() {
  const totalPrice = selectedProducts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  return totalPrice;
}
