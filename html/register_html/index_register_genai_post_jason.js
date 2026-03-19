document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(this);
    const data = {};

    // Convert FormData to a regular JSON object
    formData.forEach((value, key) => {
      // Handle checkboxes (multiple values with same name)
      if (data[key]) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        // For file input, we just save the name (cannot save full file in localStorage easily)
        if (value instanceof File) {
          data[key] = value.name;
        } else {
          data[key] = value;
        }
      }
    });

    // Save to localStorage (Simulating saving to a file/database)
    localStorage.setItem("registeredUserData", JSON.stringify(data));

    console.log("Data captured and 'stored':", data);
    alert("Registration data saved! Redirecting to show page...");

    // Redirect to the show page
    window.location.href = "index_register_show.html";
  });
