document.getElementById("searchBtn").addEventListener("click", searchPlaces);
document.getElementById("clearBtn").addEventListener("click", clearResults);

function searchPlaces() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let results = [];

      if (input.includes("beach")) {
        results = data.beaches;
      } else if (input.includes("temple")) {
        results = data.temples;
      } else if (input.includes("country")) {
        results = data.countries;
      }

      if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found. Try beach, temple, or country.</p>";
        return;
      }

      results.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="${item.name}" width="300" height="200">
          <p>${item.description}</p>
        `;
        resultsDiv.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      resultsDiv.innerHTML = "<p>Error loading data.</p>";
    });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
