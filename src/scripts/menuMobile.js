function showMenuMobile(){

    const bars = document.querySelector("i")
    const divBtns = document.querySelector(".header__div--btns")

    bars.addEventListener("click", () => {

        divBtns.classList.toggle("hidden")

        if(bars.classList.contains("fa-bars")){

            bars.classList.remove("fa-bars")
            bars.classList.add("fa-xmark")
            
        }else{

            bars.classList.remove("fa-xmark")
            bars.classList.add("fa-bars")
        }

    })
}

showMenuMobile()