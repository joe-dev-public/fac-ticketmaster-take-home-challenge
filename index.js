'use strict';

/*

    - Use a promise to simulate the waiting list API.
    - This user story begins when a user has just successfully logged in.
    - Possible flow:
        - Get the email of the logged-in user by clicking one of two buttons to run challenge.
        - Pass the logged-in username/email to the API.
        - Wait for the response, saying whether or not they're already on the waiting list.
        - Depending on the response, show the message or show the form.
        - (You can show the pre-filled email, even though that belongs to another user story.)

*/

// Simulated waiting list data for this event:
const waitingList = [
    // joe@example.com *is* on the waiting list already:
    {
        email: 'joe@example.com',
        onWaitingList: true
    },
    // name@example.org is *not* on the waiting list already:
    {
        email: 'name@example.org',
        onWaitingList: false 
    }
];

function getResponseFromWaitingList(email) {

    let isUserOnWaitingListAlready;

    // Find the user with the provided email address (a unique identifier):
    for (const user of waitingList) {
        if (user.email === email) {
            isUserOnWaitingListAlready = user.onWaitingList;
        }
    }

    // Return a promise with a small delay to simulate API (network/DB/etc.) delay:    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(isUserOnWaitingListAlready);
        }, 1250);
    });

}

function runChallenge(email) {
    challengeControls.classList.add('hidden');
    loadingMsg.innerHTML += `<p style="font-size: 1.25rem;">${email}</p>`;
    loadingMsg.classList.remove('hidden');
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

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
});

// Run the challenge:

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
