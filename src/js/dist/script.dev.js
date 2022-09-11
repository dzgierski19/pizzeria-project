"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global Handlebars, utils, dataSource */
// eslint-disable-line no-unused-vars
{
  'use strict';

  var select = {
    templateOf: {
      menuProduct: '#template-menu-product'
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart'
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select'
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]'
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]'
      }
    }
  };
  var classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active'
    }
  };
  var settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9
    }
  };
  var templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML)
  };

  var Product =
  /*#__PURE__*/
  function () {
    function Product(id, data) {
      _classCallCheck(this, Product);

      var thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisProduct.initAccordion();
      console.log('new Product:', thisProduct);
    }

    _createClass(Product, [{
      key: "renderInMenu",
      value: function renderInMenu() {
        var thisProduct = this;
        /* Generate HTML based on template */

        var generatedHTML = templates.menuProduct(thisProduct.data);
        /* create element using utils.createElementFromHTML */

        thisProduct.element = utils.createDOMFromHTML(generatedHTML);
        /* find menu container */

        var menuContainer = document.querySelector(select.containerOf.menu);
        /* add element to menu */

        menuContainer.appendChild(thisProduct.element);
      }
    }, {
      key: "initAccordion",
      value: function initAccordion() {
        var thisProduct = this;
        /* find the clickable trigger (the element that should react to clicking) */

        var clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable); // console.log(clickableTrigger);

        /* START: add event listener to clickable trigger on event click */

        clickableTrigger.addEventListener('click', function (event) {
          /* prevent default action for event */
          event.preventDefault();
          /* find active product (product that has active class) */

          var activeProduct = document.querySelector(select.all.menuProductsActive); // console.log(activeProduct);

          /* if there is active product and it's not thisProduct.element, remove class active from it */

          if (activeProduct != null && activeProduct != thisProduct.element) {
            activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
          }
          /* toggle active class on thisProduct.element */


          thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
        });
      }
    }]);

    return Product;
  }();

  var app = {
    initMenu: function initMenu() {
      var thisApp = this;
      console.log('thisApp.data:', thisApp.data);

      for (var productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]);
      }
    },
    initData: function initData() {
      var thisApp = this;
      thisApp.data = dataSource;
    },
    init: function init() {
      var thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      thisApp.initData();
      thisApp.initMenu();
    }
  };
  app.init();
}
//# sourceMappingURL=script.dev.js.map
