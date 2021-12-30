let tweets = [];
const feed = document.querySelector(".feed");
const editorInput = document.querySelector('textarea');

function getTweetObj(el) {
	return {
		content: editorInput.value,
		id: el.id
	};
}

function createTweet(options, save = true) {

	if(save && editorInput.value.trim().length < 1) return;

	let tweetEl = document.createElement('div'),
		barEl = document.createElement('div'),
		textareaEl = document.createElement('textarea'),
		deleteBtnEl = document.createElement('button'),
		config = options || {
			content: "",
			id: "tweet_" + new Date().getTime(),
		};

	const onDelete = () => {
		deleteTweet(getTweetObj(tweetEl));
		feed.removeChild(tweetEl);
	};

	textareaEl.value = document.getElementById('input').value;
	if (save)
		config.content = textareaEl.value;
	else
		textareaEl.value = config.content;

	console.log(config);

	deleteBtnEl.addEventListener('click', onDelete);

	deleteBtnEl.classList.add('deleteButton');
	deleteBtnEl.addEventListener('click', onDelete, false);

	barEl.classList.add('bar');
	tweetEl.classList.add('tweet');
	tweetEl.id = config.id;

	barEl.appendChild(deleteBtnEl);

	tweetEl.appendChild(barEl);
	tweetEl.appendChild(textareaEl);

	feed.appendChild(tweetEl);

	if (save)
		saveTweet(getTweetObj(tweetEl));

	editorInput.value = "";
}

function saveTweet(tweet) {
	tweets.push(tweet);
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

function deleteTweet(tweet) {
	const index = tweets.findIndex((e) => e.id === tweet.id)
	tweets.splice(index, 1);
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

function loadTweets() {
	tweets = JSON.parse(localStorage.getItem('tweets'));
	tweets = tweets ? tweets : [];

	console.table(tweets);

	for (const tweet of tweets)
		createTweet(tweet, false);
}

loadTweets();

document.getElementById("input").value = "";

addtweetBtnEl = document.querySelector('.addtweetBtn');
addtweetBtnEl.addEventListener('click', () => createTweet(), false);
