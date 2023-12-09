const boxes = document.querySelector(".boxes");
const modal_main = document.querySelector(".modal_main");
const faXmark = document.querySelector(".fa-xmark");
const main_modal = document.querySelector(".main_modal");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const btn4 = document.querySelector(".btn4");


var api_link =
  "https://api.themoviedb.org/3/movie/popular?api_key=e3eba846fb6af8da7df4730f6734f0f7&language=en-US&page=1";

var movies 

const getData = async (link) => {
  main_modal.style = "display: flex;"
  const req = await fetch(link);
  const data = await req.json();
  writeData(data.results);

  movies = data.results
  main_modal.style = "display: none;"
};

getData(api_link);

const writeData = (data) => {
  boxes.innerHTML = "";
  data.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
        <button>${item.title}</button>
        <div class="img">
            <img src="https://image.tmdb.org/t/p/w500/${item.backdrop_path}" alt="">
        </div>
    `;
    box.addEventListener("click", () => {
      modal_main.classList.add("active");
      getmodal(item.id)
    });
    boxes.appendChild(box);
  });

  const FaXmark = document.querySelector(".fa-xmark");
  FaXmark.addEventListener("click", () => {
    modal_main.classList.remove("active");
  });
};

const getmodal = async (id)=>{
  const movie = movies.filter((item)=>{
    return item.id == id
  })

  const modal_img = document.querySelector(".modal_img")
  const modal_title = document.querySelector(".modal_title")
  const modal_date = document.querySelector(".modal_date")
  const modal_popul = document.querySelector(".modal_popul")
  const modal_lang = document.querySelector(".modal_lang")
  const desc = document.querySelector(".desc")

  modal_img.src = `https://image.tmdb.org/t/p/w500/${movie[0].backdrop_path}`;
  modal_title.textContent = movie[0].title
  modal_date.textContent = movie[0].release_date
  modal_popul.textContent = movie[0].popularity
  modal_lang.textContent = movie[0].original_language
  desc.textContent = `${movie[0].overview.slice(0, 220)}...`
}

const filterData = (id)=>{

  if(id == 0){
    writeData(movies)
  }else{
    var filtering = movies.filter((item) =>{
      return item.genre_ids.includes(id)
    })
    writeData(filtering);
  }

}


btn1.classList.add("active")

btn1.addEventListener("click", ()=>{
  activeBtn(btn1)
  filterData(0)
})
btn2.addEventListener("click", ()=>{
  activeBtn(btn2)
  filterData(35)
})
btn3.addEventListener("click", ()=>{
  activeBtn(btn3)
  filterData(28)

})
btn4.addEventListener("click", ()=>{
  activeBtn(btn4)
  filterData(53)
})

const activeBtn = (id)=>{
  btn1.classList.remove("active")
  btn2.classList.remove("active")
  btn3.classList.remove("active")
  btn4.classList.remove("active")
  id.classList.add("active")
}
