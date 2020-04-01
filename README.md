A pre-canned web app with batteries included.
 
This is basically the setup I found useful for my side projects. It's a rather fat and opinionated set 
of technologies for a one size fit all singe page application. It serves both as a template and a reference project for
a real world configuration and usage of these technologies.  

Off the bat, I think the offline visual testing with emulated firebase is quite clever. 

![Continuous Integration](https://github.com/smorgrav/react-firebase-material-template/workflows/Continuous%20Integration/badge.svg)

# Features

* Material-UI Theme and CSS baseline applied 
* Automatic deployment to firebase with Github Actions
* Visual testing using puppeteer and differencify with firebase emulated
* React Router for location awareness
* React toastify for popup messages
* Drawers included
* Error boundary applied
* URL to tags component - who needs more UI than this?
* Authentication context backed by firebase
* Invite user and Link account flow
* Internationalization
* ESLint and automatic code formatting

![Image of LandingPage](doc/ReFiMaLandingPage.png)

# How to adopt this template

# Details

## Head
   * https://realfavicongenerator.net/
     
## Testing
### Unit testing

### Visual testing
docker build -t refima .
docker run -ti --rm -p 3000:3000 --name refima --entrypoint /bin/sh -v ~/dev/react-firebase-material-template:/app -w /app refima 
yarn local && sleep 120 & yarn visual
      
## Messages
Communicating stuff to the user is arguably the most important thing for a web application.

## ESLint and Prettier
Configured straight out of the CRA documentation https://create-react-app.dev/docs/setting-up-your-editor/

I like to have one consistent style and enforcing this is the only way to do it. No more tabs vs spaces discussion. 

# Feedback
Please! - that would be fun. 