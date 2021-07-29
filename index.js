const search = document.querySelector("input");
const form = document.querySelector("form");
const searchResults = document.querySelector(".results");
const errormsg = document.querySelector(".alert");
const line = document.querySelector("hr");

const apiurl =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;

  if (searchValue == "") {
    errorMessage("search cannot be empty, please enter a search term");
  } else {
    getResult(searchValue);
  }
});

function errorMessage(msg) {
  errormsg.getElementsByClassName.display = "block";
  line.style.display = "block";
  errormsg.textContent = msg;
}

async function getResult(searchVal) {
  const response = await fetch(apiurl + searchVal);
  const result = await response.json();
  console.log(result);
  if (result.query.search.length == 0) {
    return errorMessage("invalid search please enter another search term here");
  } else {
    displayResult(result);
  }
}

// display function
function displayResult(result) {
  line.style.display = "block";
  let output = "";
  result.query.search.forEach((item) => {
    let resultURL = `https://en.wikipedia.org/?curid=${item.pageid}`;
    output += `   <div class="result p-2">
        <a href="${resultURL}" target="_blank" rel="noopener" class="h3">${item.title}</a>
        <br />
        <a
          href="${resultURL}"
          target="_blank"
          rel="noopener"
          class="fs-5 text-success"
          >${resultURL}</a
        >
        <p class="fs-5">
        ${item.snippet}
        </p>
      </div>`;
    searchResults.innerHTML = output;
  });
}
