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


function getResponseFromWaitingList(email) {

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
    getResponseFromWaitingList(email)
        .then((resolve) => {
            everything.classList.remove('hidden');
            loadingMsg.classList.add('hidden');
            if (resolve === true) {
                alreadyAdded.classList.remove('hidden');
            } else {
                mainForm.classList.remove('hidden');
            }
        });
}


// Just in case someone clicks the submit button :)
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
});


// Prepare and run the challenge:

const challengeControls = document.querySelector('#challenge-controls');
const loadingMsg = document.querySelector('#loading-message');
const everything = document.querySelector('#everything');
const alreadyAdded = document.querySelector('#already-added');
const mainForm = document.querySelector('#main-form');
const runBtnAlreadyAdded = document.querySelector('#btn-added');
const runBtnNotAdded = document.querySelector('#btn-not');

runBtnAlreadyAdded.addEventListener('click', () => {
    runChallenge('joe@example.com');
});

runBtnNotAdded.addEventListener('click', () => {
    runChallenge('name@example.org');
});
