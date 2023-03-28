import { getUser,
    authenticationUser,
    getAllEnterprises,
    getAllDepartments,
    getAllDepartmentsById,
    getAllUsers } from "./requests.js"

import { renderDepartmentModal,
    renderEditDepartmentModal,
    renderDeleteDepartmentModal,
    renderEditUserModal,
    renderDeleteUserModal } from "./adminModais.js"

// import { editUserInfos } from "./user.js"

function logout(){

    const logoutBtn = document.querySelector("#logout")

    logoutBtn.addEventListener("click", () => {
        localStorage.clear()
        window.location.replace("/")
    })

}

async function validateAdminPage(){

    const user = getUser()
    const {is_admin} = await authenticationUser()

   if(user && !is_admin){
    window.location.replace("/src/pages/user.html")
   } else if(!user){
    window.location.replace("/src/pages/login.html")
   }
}

async function renderOptions(){

    const select = document.querySelector("#enterprises")
    const enterprisesArray = await getAllEnterprises()
    
    enterprisesArray.forEach(enterprise => {
        
        const {name} = enterprise

        const option = createOption(name)

        select.appendChild(option)
        
    })
}

function createOption(desc){

    const option = document.createElement("option")

    option.innerText = desc

    return option
}

export async function renderAllDepartmentsCards(){

    const departmentsList = document.querySelector(".list__container")
    const allDepartmentsArray = await getAllDepartments()

    departmentsList.innerHTML = ""

    allDepartmentsArray.forEach(department => {

        const { companies, description, name, uuid } = department
        const companyName = companies.name

        const li = createDepartmentCard(name, description, companyName, uuid)

        departmentsList.appendChild(li)
    }) 

}

function createDepartmentCard(name, description, companyName, id){

    const li = document.createElement("li")
    const divDesc = document.createElement("div")
    const nameDepartment = document.createElement("h4")
    const departmentDesc = document.createElement("span")
    const company = document.createElement("span")
    const divBtns = document.createElement("div")
    const imageShow = document.createElement("img")
    const imageEdit = document.createElement("img")
    const imageDelete = document.createElement("img")

    li.classList.add("list__item")
    divDesc.classList.add("list__item--desc")
    nameDepartment.innerText = name
    departmentDesc.innerText = description
    company.innerText = companyName
    divBtns.classList.add("list__item--btns")

    imageShow.classList.add("show__department--btn")
    imageShow.src = "../assets/img/visualizar.svg"
    imageShow.alt = "Visualizar"

    imageShow.addEventListener("click", () =>{

        renderDepartmentModal(id)
    })

    imageEdit.classList.add("edit__department--btn")
    imageEdit.src = "../assets/img/editar.svg"
    imageEdit.alt = "Editar"

    imageEdit.addEventListener("click", () => {

        renderEditDepartmentModal(id)
    })


    imageDelete.classList.add("delete__department--btn")
    imageDelete.src = "../assets/img/excluir.svg"
    imageDelete.alt = "Excluir"

    imageDelete.addEventListener("click", () => {

        renderDeleteDepartmentModal(id)
    })

    divDesc.append(nameDepartment, departmentDesc, company)
    divBtns.append(imageShow, imageEdit, imageDelete)
    li.append(divDesc, divBtns)

    return li
}

async function renderDepartmentCardByEnterprise(){

    const departmentList = document.querySelector(".list__container")
    const select = document.querySelector("#enterprises")
    
    select.addEventListener("change", async () =>{
        
        if(select.value === "Selecionar empresa"){

            departmentList.innerHTML = ""
            renderAllDepartmentsCards()
        }
        
        departmentList.innerHTML = ""
        
        const enterprisesArray = await getAllEnterprises()

        enterprisesArray.forEach(async enterprise => {
            
            const {uuid} = enterprise
            const companyName = enterprise.name
            
            const departmentArray = await getAllDepartmentsById(uuid)
            
            departmentArray.forEach(department => {

                const { uuid, name, description } = department

                const cards = createDepartmentCard(name, description, companyName, uuid)

                if(select.value === companyName){
                    
                    departmentList.appendChild(cards)
                }
            })
            
        })
    })  
}

export async function renderAllUsersCards(){

    const usersList = document.querySelector(".list__container--users")
    
    const users = await getAllUsers()
    
    usersList.innerHTML = ""

    users.forEach( async user => {

        const { uuid, username, professional_level, department_uuid } = user

        createUserCard(username, professional_level, uuid, department_uuid) 
    })
    
}

async function createUserCard(username, professional_level, id, departmentID){

    const usersList = document.querySelector(".list__container--users")

    const departments = await getAllDepartments()

    const li = document.createElement("li")
    const divDesc = document.createElement("div")
    const userName = document.createElement("h4")
    const userLevel = document.createElement("span")
    const divBtns = document.createElement("div")
    const imageEdit = document.createElement("img")
    const imageDelete = document.createElement("img")



    li.classList.add("list__item")
    divDesc.classList.add("list__item--desc")
    userName.innerText = username
    userLevel.innerText = professional_level
    userLevel.classList.add("user__level")
    // company.innerText = companies.name
    divBtns.classList.add("list__item--btns")

    imageEdit.classList.add("edit__user--btn")
    imageEdit.src = "../assets/img/pencil-blue.svg"
    imageEdit.alt = "Editar"

    imageEdit.addEventListener("click", () => {

        renderEditUserModal(id)
    })

    imageDelete.classList.add("delete__user--btn")
    imageDelete.src = "../assets/img/excluir.svg"
    imageDelete.alt = "Excluir"

    imageDelete.addEventListener("click", () => {

        renderDeleteUserModal(id)
    })

    departments.filter(department => {
        
        const {uuid, companies} = department
        
        if(uuid === departmentID){
            const company = document.createElement("span")

            company.innerText = companies.name

            divDesc.append(userName, userLevel, company)
        
            divBtns.append(imageEdit, imageDelete)
        
            li.append(divDesc, divBtns)
            
            usersList.appendChild(li)

        } 
        else if(departmentID === null && username !== "ADMIN"){
        
            divDesc.append(userName, userLevel)
        
            divBtns.append(imageEdit, imageDelete)
        
            li.append(divDesc, divBtns)
            
            usersList.appendChild(li)
        }
    })
}

logout()
validateAdminPage()
renderOptions()
renderAllDepartmentsCards()
renderDepartmentCardByEnterprise()
renderAllUsersCards()
