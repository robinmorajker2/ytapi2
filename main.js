const CLIENT_ID = '72138976933-o1jqigi2blfgnn48rstrq2g19rokaj6m.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCVLyNM4GrIi82AwkZO0oRZo7zqavuJevk'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/youtube';
const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content = document.getElementById('content');
const videoForm = document.getElementById('video-form');
const videoInput = document.getElementById('video-input');
const videoContainer = document.getElementById('video-container');
const defaultVideo = 'techguyweb';

videoForm.addEventListener('submit', e => {  e.preventDefault();  const video = videoInput.value;  getVideo(video);});      // Form submit and change video
function handleClientLoad() {  gapi.load('client:auth2', initClient);}            // Load auth2 library

function initClient() {gapi.client.init({'apiKey': API_KEY, discoveryDocs: DISCOVERY_DOCS,  clientId: CLIENT_ID,  scope: SCOPES})            // Init API client library and set up sign in listeners
                                  .then(() => { gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);      // Listen for sign in state changes
                                                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());      // Handle initial sign in state
                                                authorizeButton.onclick = handleAuthClick;
                                                signoutButton.onclick = handleSignoutClick; });           }

function updateSigninStatus(isSignedIn) {       // Update UI sign in state changes
  if (isSignedIn) {  authorizeButton.style.display = 'none';   signoutButton.style.display = 'block';  content.style.display = 'block';  videoContainer.style.display = 'block';  getVideo(defaultVideo);} 
             else {  authorizeButton.style.display = 'block';  signoutButton.style.display = 'none';   content.style.display = 'none';   videoContainer.style.display = 'none'; }}

function handleAuthClick() { gapi.auth2.getAuthInstance().signIn();}    // Handle login
function handleSignoutClick() {  gapi.auth2.getAuthInstance().signOut();}     // Handle logout
function showVideoData(data) {  const videoData = document.getElementById('video-data');  videoData.innerHTML = data;}    // Display video data

function getVideo(video) {gapi.client.youtube.videos.getRating({id: video})          // Get video from API
                                                          .then(response => { console.log(response);
                                                                              const video = response.result.items[0];
                                                                              const output = `
                                                                                <ul class="collection">
                                                                                  <li class="collection-item">Rating: ${video.rating}</li>
                                                                                </ul>
                                                                                <hr>
                                                                              `;
                                                                              showVideoData(output);
    }).catch(err => alert('No Video By That Id'));
}

function numberWithCommas(x) {  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}       // Add commas to number
