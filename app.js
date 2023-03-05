// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyA40BKiDTHne1_1DDxLCmBaRQTnfdOjvtE",
  authDomain: "a-way-953ae.firebaseapp.com",
  projectId: "a-way-953ae",
  storageBucket: "a-way-953ae.appspot.com",
  messagingSenderId: "299800627056",
  appId: "1:299800627056:web:9dbc43848de7a8f581b1b5"
	// Add your Firebase configuration here
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firebase database
  var database = firebase.database();
  
  // Get references to HTML elements
  var messageForm = document.getElementById("message-form");
  var messageInput = document.getElementById("message-input");
  var messagesList = document.getElementById("messages-list");
  
  // Listen for form submit event
  messageForm.addEventListener("submit", function(event) {
	event.preventDefault(); // Prevent the default form submission behavior
	
	// Get the message text from the input element
	var messageText = messageInput.value.trim();
	
	// Check if message text is not empty
	if (messageText !== "") {
	  // Create a new message object with the message text and current timestamp
	  var message = {
		text: messageText,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	  };
	  
	  // Save the message object to the Firebase database
	  database.ref("messages").push(message);
	  
	  // Clear the input field
	  messageInput.value = "";
	}
  });
  
  // Listen for new messages added to the Firebase database
  database.ref("messages").on("child_added", function(snapshot) {
	// Get the message object from the snapshot
	var message = snapshot.val();
	
	// Create a new list item element for the message
	var listItem = document.createElement("li");
	listItem.textContent = message.text;
	
	// Add the list item to the messages list
	messagesList.appendChild(listItem);
	
	// Scroll to the bottom of the messages list
	messagesList.scrollTop = messagesList.scrollHeight;
  });
  