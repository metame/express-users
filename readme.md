# A Profile Template

## Description
A template using Express for user registration, login, and authentication.

## Dependencies
* Node v0.10.x
* Express 4.x
* MongoDB & Monk
* Passport & Passport Local Strategy
* Bcrypt

## Setup
Clone or fork repo 
    $ git clone git@github.com:metame/profile-template

Change to app's working directory
    $ cd profile-template

Install dependencies 
    $ npm install

No more setup required for default behavior.

## Default Behavior
### Routes
GET `/register` renders user registration page.
GET `/login` renders login page.

All other defined routes including `/` render the `/login` page until there is an authenticated session.

Once authenticated, routes behave as follows:
`/register` advises user is already registered and provides link to profile page.
`/login` redirects to user profile page.
`/users` and `/` render the user list.
`/users/:username` is a dynamic route rendering the profile page of the user specified.
`/users/:username/edit` renders the form to edit user information.

### Database
By default, Monk connects to `localhost:27017`. This can be changed in `./lib/mongodb.js`.

User documents with Bcrypt password hashes are stored in the `users` collection of the `profile-app` db.

There are two unique indexes built in `app.js` for username and email to ensure idempotency.

Check out the [Monk github page](http://github.com/Automattic/monk) for more information.

## Known Issues
* Pass on errors to client during registration/login (e.g. duplicate username)
* Alert client on other forbidden actions (e.g. editing another user's profile)

## Future Changes
* Redirect to a Hello World page on GET `/` when authenticated.
* Make it stylish with bootstrap
* Add dev tests

## Contributors
* [Michael J Erwin](http://github.com/metame)

## License
MIT

