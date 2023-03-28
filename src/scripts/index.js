import { getUser, getAllEnterprises, getEnterprisesBySector, getAllSectors, authenticationUser } from "./requests.js";

async function renderHome(){

    const user = getUser()

    if(user){
        const {is_admin} = await authenticationUser()
    
        if(user && !is_admin){
        window.location.replace("/src/pages/user.html")
        } else if(user){
        window.location.replace("/src/pages/admin.html")
        } 
    }
  }

function redirectPage(){

    const loginBtn = document.querySelector("#login")
    const signupBtn = document.querySelector("#signup")

    loginBtn.addEventListener("click", () => {
        window.location.replace("/src/pages/login.html")
    })

    signupBtn.addEventListener("click", () => {
        window.location.replace("/src/pages/signup.html")
    })
}

async function renderOptions(){

    const select = document.querySelector("#sector")
    const sectorsArray = await getAllSectors()

    
    sectorsArray.forEach(sector => {
        
        const {description} = sector

        const option = createOption(description)

        select.appendChild(option)
        
    })
    
    renderEnterpriseCard()
}

function createOption(desc){

    const option = document.createElement("option")

    option.innerText = desc

    return option
}

async function renderEnterprisesCards(){

    const enterpriseList = document.querySelector(".list__container")
    const enterprisesArray = await getAllEnterprises()

    enterprisesArray.forEach(enterprise => {
        
        const {name, opening_hours, sectors} = enterprise
        const {description} = sectors

        const li = createEnterpriseCard(name, opening_hours, description)

        enterpriseList.appendChild(li)
    });
}

function createEnterpriseCard(name, hours, desc){

    const li = document.createElement("li")
    const enterpriseName = document.createElement("h3")
    const hoursOpening = document.createElement("span")
    const descSector = document.createElement("small")

    li.classList.add("list__item")
    enterpriseName.innerText = name
    hoursOpening.innerText = hours
    descSector.innerText = desc

    li.append(enterpriseName, hoursOpening, descSector)

    return li
}

function renderEnterpriseCard(){

    const select = document.querySelector("#sector")
    const enterpriseList = document.querySelector(".list__container")

    select.addEventListener("change", async () => {

        if(select.value === "Selecionar Setor"){

            enterpriseList.innerHTML = ""
            renderEnterprisesCards()
        }else{
        
            enterpriseList.innerHTML = ""
            
            const selectedSector = await getEnterprisesBySector(select.value)

            selectedSector.forEach(sector => {
                
                const { name, opening_hours, sectors } = sector

                const {description} = sectors

                const cards = createEnterpriseCard(name, opening_hours, description)

                enterpriseList.appendChild(cards)
            })
        }
    })
}

renderHome()
redirectPage()
renderOptions()
renderEnterprisesCards()
