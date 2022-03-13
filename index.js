'use strict';

/*

    - Use a promise to simulate the waiting list API.
    - This user story begins when a user has just successfully logged in.
    - Clicking one of two buttons to run the challenge is akin to clicking "login".
    - Possible flow:
        - Get the email of the logged-in user by clicking one of two buttons to run challenge.
        - Pass the logged-in username/email to the API.
        - Wait for the response saying whether or not they're already on the waiting list.
        - Depending on the response, show the message or show the form.

*/


// Example waiting list data for this event.
// User 'joe@example.com' is on the waiting list already:
const waitingList = ['joe@example.com'];

// Markup to add depending on response:
const alreadyAddedHTML = `
<div id="already-added">
    <div class="exclamation-yellow">!</div>
    <p><b>You're already signed up!</b></p>
    <p>We'll contact you if more tickets become available</p>
    <a href="" class="button-link-blue">View other dates</a>
</div>
`;

const mainFormHTML = `
<div id="main-form">
    <img src="already-on-list.png" class="already-added-icon">
    <p><b>How should we contact you?</b></p>
    <form>
        <div class="form-border">
            <fieldset>
                <input type="checkbox" name="mobile-selected">
                <label>
                    Mobile Number
                    <span class="helptext">Please include country code</span>
                    <input type="tel" name="mobile">
                </label>
            </fieldset>
            <fieldset>
                <input type="checkbox" name="email-selected" checked="on">
                <label>
                    Email
                    <b>name@example.org</b>
                </label>
            </fieldset>
        </div>
        <input type="submit" class="button-link-blue" value="Confirm">
    </form>
</div>
`;

function getResponseFromWaitingListAPI(email) {

    let isUserOnWaitingListAlready;

    // Find the user with the provided email address (a unique identifier):
    for (const user of waitingList) {
        if (user === email) {
            isUserOnWaitingListAlready = true;
        }
    }

    // Return a promise which resolves after a small delay to simulate API
    // (network/DB/etc.) delay:
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(isUserOnWaitingListAlready);
        }, 1250);
    });

}


function runChallenge(email) {
    // Immediately hide challenge controls and show "loading" message:
    challengeControls.classList.add('hidden');
    loadingMsg.innerHTML += `<p style="font-size: 1.25rem;">${email}</p>`;
    loadingMsg.classList.remove('hidden');

    // When the response is fulfilled, show either the message or the form:
    getResponseFromWaitingListAPI(email)
        .then((resolve) => {
            everything.classList.remove('hidden');
            loadingMsg.classList.add('hidden');
            if (resolve === true) {
                mainEl.innerHTML = alreadyAddedHTML;
            } else {
                mainEl.innerHTML = mainFormHTML;
                // Just in case someone clicks the submit button :)
                document.querySelector('form').addEventListener('submit', (event) => {
                    event.preventDefault();
                });
            }
        });
}


// Prepare and run the challenge:

const challengeControls = document.querySelector('#challenge-controls');
const loadingMsg = document.querySelector('#loading-message');
const everything = document.querySelector('#everything');
const mainEl = document.querySelector('main');
const runBtnAlreadyAdded = document.querySelector('#btn-added');
const runBtnNotAdded = document.querySelector('#btn-not');

runBtnAlreadyAdded.addEventListener('click', () => {
    runChallenge('joe@example.com');
});

runBtnNotAdded.addEventListener('click', () => {
    runChallenge('name@example.org');
});
