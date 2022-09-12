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
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder(); //console.log('new Product:', thisProduct);
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
      key: "getElements",
      value: function getElements() {
        var thisProduct = this;
        thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
        thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
        thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
        thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
        thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      }
    }, {
      key: "initAccordion",
      value: function initAccordion() {
        var thisProduct = this;
        thisProduct.accordionTrigger.addEventListener('click', function (event) {
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
    }, {
      key: "initOrderForm",
      value: function initOrderForm() {
        var thisProduct = this; // console.log('initOrderForm method executed');

        thisProduct.form.addEventListener('submit', function (event) {
          event.preventDefault();
          thisProduct.processOrder();
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = thisProduct.formInputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var input = _step.value;
            input.addEventListener('change', function () {
              thisProduct.processOrder();
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        thisProduct.cartButton.addEventListener('click', function (event) {
          event.preventDefault();
          thisProduct.processOrder();
        });
      }
    }, {
      key: "processOrder",
      value: function processOrder() {
        var thisProduct = this; // console.log('processOrder method executed');
        // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}

        var formData = utils.serializeFormToObject(thisProduct.form); // console.log('formData', formData);
        // set price to default price

        var price = thisProduct.data.price; // for every category (param)...

        for (var paramId in thisProduct.data.params) {
          // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
          var param = thisProduct.data.params[paramId]; //console.log(paramId, param);
          // for every option in this category

          for (var optionId in param.options) {
            // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
            var option = param.options[optionId];
            var selected = formData[paramId].includes(optionId); // console.log(optionId, option);
            // check if there is param with a name of paramId in formData and if it includes optionId

            if (formData[paramId] && selected) {
              // check if the option is not default
              if (option["default"]) {
                // add option price to price variable
                console.log('opt1');
                price += option.price;
              }
            } else if (option["default"]) {
              // check if the option is default
              // reduce price variable
              console.log('opt2');
              price -= option.price;
            }
          } // update calculated price in the HTML


          thisProduct.priceElem.innerHTML = price;
        }
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
