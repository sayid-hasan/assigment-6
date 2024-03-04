let titleContainer = document.getElementById("title-Container");
let loader = document.getElementById("loader");
let postContainer = document.getElementById("post-container");
let latestPostContainer = document.getElementById("latest-cards");

async function loadAllPost() {
  let url = "https://openapi.programming-hero.com/api/retro-forum/posts";
  const res = await fetch(url);
  const data = await res.json();
  let allPost = data.posts;
  //console.log(allPost);
  // loader function
  loaderFunc(true);
  displayAllPosts(allPost);
}

function displayAllPosts(elements) {
  //console.log(elements);

  //console.log(postContainer);
  elements.forEach((element) => {
    //console.log(element);

    //show element in dynamic text left part

    let card = document.createElement("div");
    card.innerHTML = `

       <div
              class="flex flex-col md:flex-row bg-[#f3f3f5] p-10 rounded-2xl gap-6"
            >
              <!-- avatar -->
              <div class="text-center">
                <div class="avatar online" id="card${element.id}">
                  <div class="w-24 rounded-full">
                    <img
                      src=${element.image}
                    />
                  </div>
                </div>
              </div>
              <!-- details -->
              <div class="space-y-7 w-full">
                <div
                  class="flex text-sm font-medium text-primary-text text-opacity-80 font-inter gap-5 sm:text-center"
                >
                  <p class="genre">#${element.category}</p>
                  <p>Author : <span class="author">${element.author.name}</span></p>
                </div>
                <!-- title -->
                <div class="font-mullish text-primary-text text-xl font-bold">
                  ${element.title}
                </div>
                <!-- description -->
                <p
                  class="font-mullish text-base text-primary-text font-normal text-opacity-60 max-w-[670px] border-[1px] border-b-primary-text border-opacity-25 border-dashed pb-7"
                >
                  ${element.description}
                </p>

                <!-- additional info -->
                <div class="flex justify-between w-full items-center">
                  <div
                    class="flex gap-7 text-primary-text text-opacity-60 text-base"
                  >
                    <div>
                      <i class="fa-solid fa-message"></i>
                      <span>${element["comment_count"]}</span>
                    </div>
                    <div>
                      <i class="fa-regular fa-eye"></i>
                      <span>${element["view_count"]}</span>
                    </div>
                    <div>
                      <i class="fa-regular fa-clock"></i>
                      <span>${element["posted_time"]}</span>
                    </div>
                  </div>
                  <!-- msg button -->

                  <div>
                    <div
                      class="w-8 aspect-square rounded-full bg-[#10b981] text-white flex justify-center items-center" onclick ="createTitle('${element.title}','${element["view_count"]}')"
                    >
                      <i class="fa-solid fa-envelope-open"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
      
      `;
    postContainer.appendChild(card);

    //   show online or oflline base on active and inactive
    let cardId = document.getElementById(`card${element.id}`);

    if (element.isActive) {
      cardId.classList.add("online");
      cardId.classList.remove("offline");
    } else {
      cardId.classList.add("offline");
      cardId.classList.remove("online");
    }
  });
  loaderFunc(false);
}

//   //show element in dynamic text right part

async function createTitle(title, view) {
  let readNum = document.getElementById("read-num");

  let titleCard = document.createElement("div");
  titleCard.innerHTML = `
     <div
                class="bg-white p-4 rounded-xl flex justify-between items-center title-card"
              >
                <p
                
                  class="font-mullish text-base text-primary-text md:max-w-[212px]"
                >
                  ${title}
                </p>
                <div>
                  <div class="flex gap-2 items-center">
                    <i class="fa-regular fa-eye"></i>
                    <span>${view}</span>
                  </div>
                </div>
              </div>
    `;

  titleContainer.appendChild(titleCard);

  let count = document.getElementsByClassName("title-card").length;
  readNum.innerHTML = count;
}

// loader functionality

function loaderFunc(status) {
  if (status) {
    loader.classList.remove("hidden");
    titleContainer.classList.add("hidden");
    postContainer.classList.add("hidden");
  } else {
    loader.classList.add("hidden");
    titleContainer.classList.remove("hidden");
    postContainer.classList.remove("hidden");
  }
}

// search bar functionality

async function searchData() {
  let search = document.getElementById("search");
  let searchText = search.value;

  let url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`;
  let res = await fetch(url);
  let data = await res.json();
  let items = data.posts;
  //console.log(items);
  postContainer.innerHTML = ``;

  displayAllPosts(items);
}

// latest cards

async function latestCards() {
  let url = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
  let res = await fetch(url);
  let data = await res.json();
  createLatestPost(data);
}
function createLatestPost(elems) {
  elems.forEach((elem) => {
    //console.log(elem);
    let latestCard = document.createElement("div");
    latestCard.classList = `card bg-base-100 shadow-xl border-[1px] border-solid border-primary-text border-opacity-15`;
    let date = elem.author["posted_date"] || "No publish date";
    latestCard.innerHTML = `

      <figure class="px-10 pt-10 ">
                <img class='rounded-2xl' src=${elem.cover_image} alt="" />
              </figure>
              <!-- calender -->
              <div
                class="flex px-10 mt-6 mb-3 justify-start items-center gap-3 text-primary-text text-opacity-50"
              >
                <i class="fa-solid fa-calendar-days"></i>
                    <p class="text-left">${date}  </p>
              </div>

              <div class="px-10 space-y-3 font-mullish items-center pb-6">
                <h2 class="card-title text-primary-text font-extrabold text-lg">
                  ${elem.title}
                </h2>
                <p
                  class="text-primary-text text-opacity-60 font-normal text-base min-h-20"
                >
                  ${elem.description}
                </p>
                <div class="flex gap-5 items-center py-5  min-h-10">
                  <div>
                    <div class="avatar">
                      <div
                        class="w-[44px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                        <img
                          src=${elem["profile_image"]}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="name text-base font-bold font-mullish">
                      ${elem.author.name}
                    </div>
                    <div
                      class="profession text-primary-text text-opacity-60 font-mullish text-sm"
                    >
                      ${
                        elem.author.designation
                          ? elem.author.designation
                          : "Unknown"
                      }
                    </div>
                  </div>
                </div>
              </div>
    
    
      `;
    latestPostContainer.appendChild(latestCard);
  });
}
latestCards();
searchData();
loadAllPost();
