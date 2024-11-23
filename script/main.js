// Handle Sign Up
function handleSignUp(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const gradeLevel = document.getElementById("gradeLevel").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simple validation to ensure all fields are filled
  if (!username || !gradeLevel || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  // Save user info in localStorage (for demonstration purposes)
  const user = { username, gradeLevel, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to the sign-in page
  alert("Sign-up successful! Redirecting to Sign-In page...");
  window.location.href = "signin.html";
}

// Handle Sign In
function handleSignIn(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("signinPassword").value.trim();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  // Check if user exists and credentials match
  if (
    savedUser &&
    username === savedUser.username &&
    password === savedUser.password
  ) {
    alert("Sign-in successful! Redirecting to Home Page...");
    window.location.href = "index.html"; // Redirect to home page
  } else {
    alert("Invalid username or password!");
  }
}

// Attach event listeners for sign-up and sign-in forms
document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signupForm");
  const signInForm = document.getElementById("signinForm");

  if (signUpForm) {
    signUpForm.addEventListener("submit", handleSignUp);
  }

  if (signInForm) {
    signInForm.addEventListener("submit", handleSignIn);
  }
});

// Handle Posting an Issue
document
  .getElementById("postForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    // const byWho = document.getElementById("issue-by-who").value;
    const imageFile = document.getElementById("image").files[0];

    let imageBase64 = "";
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        imageBase64 = reader.result;
        savePost(title, description, imageBase64); // Save post with image
      };
      reader.readAsDataURL(imageFile);
    } else {
      savePost(title, description, imageBase64); // Save post without image
    }
  });

// Function to save the post to localStorage
function savePost(title, description, imageBase64) {
  const post = {
    title: title,
    description: description,
    image: imageBase64,
    date: new Date().toISOString(),
  };

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  // Redirect to the main page after posting
  window.location.href = "index.html"; // Redirect to the main page to see the posted issue
}

// Display Issues on Main Page
document.addEventListener("DOMContentLoaded", function () {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const issuesList = document.getElementById("issuesList");

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("issue-card");

    // Title of the post
    const title = document.createElement("h3");
    title.textContent = post.title;

    // Description of the post
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = post.description;

    // Add image if available
    if (post.image) {
      const image = document.createElement("img");
      image.src = post.image;
      image.alt = "Issue Image";
      image.classList.add("post-image");
      postElement.appendChild(image);
    }

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Write your comment here...";
    textarea.classList.add("comment-box");

    const sendBtn = document.createElement("button");
    sendBtn.textContent = "Send Comment";
    sendBtn.classList.add("send-comment-btn");

    sendBtn.addEventListener("click", () => {
      const comment = textarea.value.trim();

      if (comment) {
        alert(`Comment sent: "${comment}"`);
        textarea.value = ""; // Clear the comment box after sending
      } else {
        alert("Please write a comment before sending!");
      }
    });

    // Append title, description to the post card
    postElement.appendChild(title);
    postElement.appendChild(description);
    postElement.appendChild(textarea);
    postElement.appendChild(sendBtn);

    // Add post card to the container
    issuesList.appendChild(postElement);
  });
});

// Handle Sign-Up Form Submit (if on sign-up page)
if (document.getElementById("signUpForm")) {
  document
    .getElementById("signUpForm")
    .addEventListener("submit", handleSignUp);
}

// Handle Sign-In Form Submit (if on sign-in page)
if (document.getElementById("signInForm")) {
  document
    .getElementById("signInForm")
    .addEventListener("submit", handleSignIn);
}
