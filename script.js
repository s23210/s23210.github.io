  var createtweet,
      addtweetBtnEl,
      testLocalStorage,
      init,
      savetweet,
      deletetweet,
      loadtweets,
      gettweetObj,
      onAddtweetBtnClick;


//absolutnie nie wiem dlaczego to kurwa nie dziala
  // eraseText = function() {
  //   document.getElementById("input").value = "";
  // };

//chyba jednak potrzebne xddd
  gettweetObj = function(el) {
    var textarea = el.querySelector('textarea');
    return {
      content: textarea.value,
      id: el.id
    };
  };

  onAddtweetBtnClick = function() {
    createtweet();
  };

  createtweet = function(options) {
    var tweetEl = document.createElement('div'),
        barEl = document.createElement('div'),
        textareaEl = document.createElement('textarea'),
        saveBtnEl = document.createElement('button'),
        deleteBtnEl = document.createElement('button'),
        onSave,
        onDelete,
        config = options || {
          content: "",
          id: "tweet_" + new Date().getTime(),
        };

        console.log(config.id);

    // tweetEl.id = config.id;

    onDelete = function() {
      deletetweet(gettweetObj(tweetEl));
      document.body.removeChild(tweetEl);
    };

    onSave = function() {
      //console.log(gettweetObj(tweetEl));
      savetweet(gettweetObj(tweetEl));
    };

//wpisuje wartosc tweeta
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
    tweetEl.classList.add('tweet');

    barEl.appendChild(saveBtnEl);
    barEl.appendChild(deleteBtnEl);

    tweetEl.appendChild(barEl);
    tweetEl.appendChild(textareaEl);

    document.body.appendChild(tweetEl);
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
        savetweet = function () {
          console.warn(message);
        };
        deletetweet = function() {
          console.log(message);
        };
      } else {
        savetweet = function(tweet) {
          console.log(tweet.id);
          localStorage.setItem(tweet.id, JSON.stringify(tweet));
        };
        deletetweet = function(tweet) {
          localStorage.removeItem(tweet.id);
        };
        loadtweets = function() {
          for (var i = 0; i < localStorage.length; i++) {
             var tweetObject = JSON.parse(
               localStorage.getItem(localStorage.key(i)));
             createtweet(tweetObject);
             //console.log(tweetObject);
          }
        };

        loadtweets();
      }
    }


//absolutnie nie wiem dlaczego to kurwa nie dziala
    // eraseText();

//a to dziala xd
    document.getElementById("input").value = "";

    init();
    //savetweet();


  // createtweet();

  addtweetBtnEl = document.querySelector('.addtweetBtn');
  addtweetBtnEl.addEventListener('click', onAddtweetBtnClick, false);
