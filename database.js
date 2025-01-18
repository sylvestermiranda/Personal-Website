import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCcYVQKqCQHuHEoqwmxxMFjIvyL3vAkn6Q",
    authDomain: "personal-website-5e2c1.firebaseapp.com",
    projectId: "personal-website-5e2c1",
    storageBucket: "personal-website-5e2c1.appspot.com",
    messagingSenderId: "920055843225",
    appId: "1:920055843225:web:4ad2bca0207a8627a12b08",
    databaseURL: "https://personal-website-5e2c1-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("formResponseMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            const userRef = ref(database, 'messages');
            const newUserRef = push(userRef);

            set(newUserRef, {
                name: name,
                email: email,
                message: message,
                timestamp: serverTimestamp()
            }).then(() => {
                responseMessage.textContent = "Feedback sent successfully!";
                responseMessage.style.color = "green";

                get(newUserRef).then(snapshot => {
                    const data = snapshot.val();
                    if (data && data.timestamp) {
                        const timestamp = data.timestamp;
                        const date = new Date(timestamp);
                        console.log("Formatted Date:", date.toLocaleString());
                    }
                });

                setTimeout(() => {
                    responseMessage.textContent = '';
                }, 5000);

                contactForm.reset();
            }).catch((error) => {
                responseMessage.textContent = "Error sending data: " + error.message;
                responseMessage.style.color = "red";

                setTimeout(() => {
                    responseMessage.textContent = '';
                }, 5000);
            });
        });
    }
});
