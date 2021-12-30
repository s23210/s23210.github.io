(function() {
  'use strict';

  var createTwitt,
      addTwittBtnEl,
      testLocalStorage,
      init,
      saveTwitt,
      deleteTwitt,
      loadTwitts,
      getTwittObj,
      onAddTwittBtnClick;


//absolutnie nie wiem dlaczego to kurwa nie dziala
  // eraseText = function() {
  //   document.getElementById("input").value = "";
  // };

//chyba jednak potrzebne xddd
  getTwittObj = function(el) {
    var textarea = el.querySelector('textarea');
    return {
      content: textarea.value,
      id: el.id
    };
  };

  onAddTwittBtnClick = function() {
    createTwitt();
  };

  createTwitt = function(options) {
    var twittEl = document.createElement('div'),
        barEl = document.createElement('div'),
        textareaEl = document.createElement('textarea'),
        saveBtnEl = document.createElement('button'),
        deleteBtnEl = document.createElement('button'),
        onSave,
        onDelete,
        config = options || {
          content: "",
          id: "twitt_" + new Date().getTime(),
        };

        console.log(config.id);

    // twittEl.id = config.id;

    onDelete = function() {
      deleteTwitt(getTwittObj(twittEl));
      document.body.removeChild(twittEl);
    };

    onSave = function() {
      //console.log(getTwittObj(twittEl));
      saveTwitt(getTwittObj(twittEl));
    };

//wpisuje wartosc twitta
     textareaEl.value = document.getElementById('input').value;
     //console.log(textareaEl.value);
     config.content = textareaEl.value;

    saveBtnEl.addEventListener('click', onSave);
    deleteBtnEl.addEventListener('click', onDelete);

    saveBtnEl.classList.add('saveButton');
    saveBtnEl.addEventListener('click', onSave, false);
    deleteBtnEl.classList.add('deleteButton');
    deleteBtnEl.addEventListener('click', onDelete, false);

    barEl.classList.add('bar');
    twittEl.classList.add('twitt');

    barEl.appendChild(saveBtnEl);
    barEl.appendChild(deleteBtnEl);

    twittEl.appendChild(barEl);
    twittEl.appendChild(textareaEl);

    document.body.appendChild(twittEl);
};
    testLocalStorage = function() {
      var foo = 'foo'
      try {
        localStorage.setItem(foo, foo);
        localStorage.removeItem(foo);
        return true;
      } catch (e) {
        return false;
      }
    };

    init = function () {
      if (!testLocalStorage) {
        var message = "We are sorry, but you cannot use localStorage";
        saveTwitt = function () {
          console.warn(message);
        };
        deleteTwitt = function() {
          console.log(message);
        };
      } else {
        saveTwitt = function(twitt) {
          console.log(twitt.id);
          localStorage.setItem(twitt.id, JSON.stringify(twitt));
        };
        deleteTwitt = function(twitt) {
          localStorage.removeItem(twitt.id);
        };
        loadTwitts = function() {
          for (var i = 0; i < localStorage.length; i++) {
             var twittObject = JSON.parse(
               localStorage.getItem(localStorage.key(i)));
             createTwitt(twittObject);
             //console.log(twittObject);
          }
        };

        loadTwitts();
      }
    }


//absolutnie nie wiem dlaczego to kurwa nie dziala
    // eraseText();

//a to dziala xd
    document.getElementById("input").value = "";

    init();
    //saveTwitt();


  // createTwitt();

  addTwittBtnEl = document.querySelector('.addTwittBtn');
  addTwittBtnEl.addEventListener('click', onAddTwittBtnClick, false);



})();
