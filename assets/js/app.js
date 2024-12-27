const cl = console.log;

const cardContainer = document.getElementById("cardContainer");
const inputSearch = document.getElementById("inputSearch");
const comment = document.getElementById("comment");

const btnName = document.getElementById("btnName");
const nameIcon = document.getElementById("nameIcon");

const btnCap = document.getElementById("btnCap");
const capIcon = document.getElementById("capIcon");

const btnPop = document.getElementById("btnPop");
const popIcon = document.getElementById("popIcon");

const popBtngraph = document.getElementById("popBtn");
const langBtngraph = document.getElementById("langBtn");


const dataContainer = document.getElementById("dataContainer");
const title = document.getElementById("title");

const cardTemplate = (array = countries) => {
  let result = "";
  array.forEach((ele) => {
    result += `
                    <div class="col-md-2">
                        <div class="card countryCard">
                            <img
                            src="${ele.flag}"
                            class="card-img-top flag"
                            alt="flag of ${ele.name}"
                            title="flag of ${ele.name}"
                            />
                            <div class="card-body">
                                <h5 class="card-title">${ele.name}</h5>
                                <p class="card-text"><span>capital: </span>${ele.capital || "Unknown"}</p>
                                <p class="card-text">
                                    <span>languages: </span>${ele.languages.join(", ")}
                                </p>
                                <p class="card-text"><span>population: </span>${ele.population}</p>
                                </div>
                        </div>
                    </div>
                    `;
  });
  cardContainer.innerHTML = result;
};
cardTemplate();

const onKeyUpSearch = (eve) => {
  const searchWord = eve.target.value.toLowerCase();
  const filteredCountries = countries.filter((ele) => {
    return (
      ele.name.toLowerCase().includes(searchWord) ||
      (ele.capital && ele.capital.toLowerCase().includes(searchWord)) ||
      ele.languages.some((lang) => lang.toLowerCase().includes(searchWord))
    );
  });
  cardTemplate(filteredCountries);
  cl(filteredCountries);
  comment.innerHTML = `${filteredCountries.length} out of ${countries.length} Countries are Found`;
};

const onClickSortedNames = () => {
  nameIcon.classList.remove("d-none");
  capIcon.classList.add("d-none");
  popIcon.classList.add("d-none");

  if (nameIcon.classList.contains("fa-arrow-down")) {
    nameIcon.classList.replace("fa-arrow-down", "fa-arrow-up");
    countries.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    nameIcon.classList.replace("fa-arrow-up", "fa-arrow-down");
    countries.sort((a, b) => a.name.localeCompare(b.name));
  }
  cardTemplate();
};

const onClickSortedCapital = () => {
  capIcon.classList.remove("d-none");
  nameIcon.classList.add("d-none");
  popIcon.classList.add("d-none");

  if (capIcon.classList.contains("fa-arrow-down")) {
    capIcon.classList.replace("fa-arrow-down", "fa-arrow-up");
    countries.sort((a, b) => (b.capital || "Unknown").localeCompare(a.capital || "Unknown"));
  } else {
    capIcon.classList.replace("fa-arrow-up", "fa-arrow-down");
    countries.sort((a, b) => (a.capital || "Unknown").localeCompare(b.capital || "Unknown"));
  }
  cardTemplate();
};

const onClickSortedPopulation = () => {
  popIcon.classList.remove("d-none");
  nameIcon.classList.add("d-none");
  capIcon.classList.add("d-none");

  if (popIcon.classList.contains("fa-arrow-down")) {
    popIcon.classList.replace("fa-arrow-down", "fa-arrow-up");
    countries.sort((a, b) => b.population - a.population);
  } else {
    popIcon.classList.replace("fa-arrow-up", "fa-arrow-down");
    countries.sort((a, b) => a.population - b.population);
  }
  cardTemplate();
};


const displayPopGraphTemplate = () => {
  const worldPop = countries.reduce((acc, cv) => acc + cv.population, 0);
  const topCountries = countries.sort((a, b) => b.population - a.population).slice(0, 10);

  let result = `
        <div class="row mt-2">
            <div class="col-sm-2 fh">
            <h5>World</h5>
            </div>
            <div class="col-sm-8">
            <div class="bar">
                <div class="percentage" style="width: 100%;"></div>
            </div>
            </div>
            <div class="col-sm-2">
            <h5>${worldPop}</h5>
            </div>
        </div>
      `;

  topCountries.forEach((country) => {
    result += `
            <div class="row mt-2">
                <div class="col-sm-2 fh">
                <h5>${country.name}</h5>
                </div>
                <div class="col-sm-8">
                    <div class="bar">
                        <div class="percentage" style="width: ${(country.population / worldPop) * 100}%;"></div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <h5>${country.population}</h5>
                </div>
            </div>
            `;
  });

  dataContainer.innerHTML = result;
  title.innerHTML = `10 Most Populated Countries in the World`;
};
displayPopGraph();


const onClickPopGraph = () => {
  displayPopGraphTemplate();
};
const onClickLangGraph = () => {

  const languageCountArray = [];

  countries.forEach(country => {
    country.languages.forEach(language => {
      let existingObj = languageCountArray.find(obj => obj.language === language);
      if (existingObj) {
        existingObj.count += 1;
      } else {
        languageCountArray.push({ language: language, count: 1 });
      }
    });
  });
  let topSpokenLang = languageCountArray.sort((a, b) => b.count - a.count).slice(0, 10);

  result = '';
  topSpokenLang.forEach(obj => {
    result += 
              `
                <div class="row mt-2">
                  <div class="col-sm-2">
                    <h5>${obj.language}</h5>
                  </div>
                  <div class="col-sm-8">
                    <div class="bar">
                      <div class="percentage" style="width: ${(obj.count / 100) * 100}%"></div>
                    </div>
                  </div>
                  <div class="col-sm-2">
                    <h5>${obj.count}</h5>
                  </div>
                </div>


              `
  })
  dataContainer.innerHTML = result;
  title.innerHTML = `10 Most Spoken Languages in the World`;
};


inputSearch.addEventListener("keyup", onKeyUpSearch);
btnName.addEventListener("click", onClickSortedNames);
btnCap.addEventListener("click", onClickSortedCapital);
btnPop.addEventListener("click", onClickSortedPopulation);
popBtngraph.addEventListener("click", onClickPopGraph);
langBtngraph.addEventListener("click", onClickLangGraph);




