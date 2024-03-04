let titleContainer = document.getElementById("title-Container");
let loader = document.getElementById("loader");
let postContainer = document.getElementById("post-container");

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

  console.log(postContainer);
  elements.forEach((element) => {
    console.log(element);

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
              <div class="space-y-5">
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
                  class="font-mullish text-base text-primary-text font-normal text-opacity-60 max-w-[570px] border-[1px] border-b-primary-text border-opacity-25 border-dashed pb-7"
                >
                  ${element.description}
                </p>

                <!-- additional info -->
                <div class="flex justify-between items-center">
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
                      class="w-8 aspect-square rounded-full bg-[#10b981] text-white flex justify-center items-center" onclick =" createTitle( '${element.title}','${element["view_count"]}')"
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
  let titleCard = document.createElement("div");
  titleCard.innerHTML = `
     <div
                class="bg-white p-4 rounded-xl flex justify-between items-center"
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
}

// loader functionality

function loaderFunc(status) {
  if (status) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
    titleContainer.classList.remove("hidden");
    postContainer.classList.remove("hidden");
  }
}
loadAllPost();
