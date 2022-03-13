'use strict';

/*

    - Use a promise to simulate the waiting list API.
    - This user story begins when a user has just successfully logged in.
    - Possible flow:
        - Get the username/email of the logged in user from either:
            - URL query string, or
            - clicking a "test user A" vs "test user B" button.
        - Pass the logged-in username/email to the API.
        - Wait for the response, saying whether or not they're already on the waiting list.
        - Depending on the response, show the message or show the form.
        - (You can show the pre-filled email, even though that belongs to another user story.)

*/

