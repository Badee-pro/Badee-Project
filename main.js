// Handle Sign Up
function handleSignUp(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const gradeLevel = document.getElementById("gradeLevel").value;

  // Save to localStorage
  localStorage.setItem("username", username);
  localStorage.setItem("gradeLevel", gradeLevel);

  // Redirect to the sign-in page
  window.location.href = "signin.html";
}

// Handle Sign In
function handleSignIn(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const gradeLevel = document.getElementById("gradeLevel").value;

  const savedUsername = localStorage.getItem("username");
  const savedGradeLevel = localStorage.getItem("gradeLevel");

  if (username === savedUsername && gradeLevel === savedGradeLevel) {
    // Redirect to the main page if credentials match
    window.location.href = "index.html"; // Go to the main page
  } else {
    alert("Invalid credentials!");
  }
}

// Handle Posting an Issue
document
  .getElementById("postForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const byWho = document.getElementById("issue-by-who").value;
    const imageFile = document.getElementById("image").files[0];

    let imageBase64 = "";
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        imageBase64 = reader.result;
        savePost(title, description, byWho, imageBase64); // Save post with image
      };
      reader.readAsDataURL(imageFile);
    } else {
      savePost(title, description, byWho, imageBase64); // Save post without image
    }
  });

// Function to save the post to localStorage
function savePost(title, description, byWho, imageBase64) {
  const post = {
    title: title,
    description: description,
    byWho: byWho,
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

    // By Who field
    const byWho = document.createElement("p");
    byWho.classList.add("by-who");
    byWho.textContent = `Posted by: ${post.byWho}`;

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

    let textarea = document.createElement("textarea");
    let sendBtn = document.createElement("button");
    sendBtn.innerHTML = "Send Comment";

    // Append title, description, and byWho to the post card
    postElement.appendChild(title);
    postElement.appendChild(description);
    postElement.appendChild(byWho);
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
