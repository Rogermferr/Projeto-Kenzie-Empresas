import { getAllEnterprises,
    getAllDepartments,
    getAllUsers,
    getAllUsersWithoutDepartment,
    hireEmployee,
    dismissEmployee,
    createDepartment,
    editDepartment,
    deleteDepartment,
    updateInfoEmployee,
    deleteUser } from "./requests.js"

import { renderAllDepartmentsCards,
    renderAllUsersCards } from "./admin.js"

import { toast } from "./toast.js"

function renderCreateDepartmentModal(){

    const inputs = document.querySelectorAll(".create__department--form > input")
    const select = document.querySelector("#select_enterprises")
    const modal = document.querySelector(".create__department--modal")
    const createBtn = document.querySelector("#create")

    createBtn.addEventListener("click", () => {

        inputs.forEach(input => {
            input.value = ""
        })
        select.value = ""

        modal.showModal()
    })

    closeCreateDepartmentModal()
}

function closeCreateDepartmentModal(){

    const modal = document.querySelector(".create__department--modal")
    const closeBtn = document.querySelector(".close__create--modal")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

async function renderOptions(){

    const select = document.querySelector("#select_enterprises")
    const enterprisesArray = await getAllEnterprises()

    
    enterprisesArray.forEach(enterprise => {
        
        const {name, uuid} = enterprise

        const option = createOption(name, uuid)

        select.appendChild(option)
        
    })
}

function createOption(name, id){

    const option = document.createElement("option")

    option.innerText = name
    option.value = id

    return option
}

function createNewDepartment(){

    const modal = document.querySelector(".create__department--modal")
    const inputs = document.querySelectorAll(".create__department--form > input")
    const select = document.querySelector("#select_enterprises")
    const button = document.querySelector("#create_department")
    const newDepartment = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            newDepartment[input.name] = input.value
        })

        newDepartment[select.name] = select.value

        const request = await createDepartment(newDepartment)

        modal.close()
        renderAllDepartmentsCards()
        return request
    })
}

export function renderDepartmentModal(id){

    const departmentDiv = document.querySelector(".department__desc")
    const select = document.querySelector("#select_users")
    const listUsers = document.querySelector(".list__users--container")
    const modal = document.querySelector(".department__modal--container")

    departmentDiv.innerHTML = ""
    select.innerHTML = ""
    listUsers.innerHTML = ""

    modal.showModal()

    renderOptionsDepartmentModal()
    createStructureDepartmentModal(id)
    closeDepartmentModal()
}

function closeDepartmentModal(){

    const modal = document.querySelector(".department__modal--container")
    const closeBtn = document.querySelector(".close__department--modal")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

async function createStructureDepartmentModal(id){

    const h2 = document.querySelector(".department__modal--container > h2")
    const departmentDiv = document.querySelector(".department__desc")
    const select = document.querySelector("#select_users")
    const listUsers = document.querySelector(".list__users--container")

    const departmentDesc = document.createElement("h4")
    const enterpriseName = document.createElement("span")
    const optionPlaceHolder = document.createElement("option")
    const hireBtn = document.createElement("button")

    optionPlaceHolder.innerText = "Selecionar usuário"
    optionPlaceHolder.value = ""
    select.appendChild(optionPlaceHolder)
    hireBtn.innerHTML = "Contratar"
    hireBtn.id = "hire"

    hireBtn.addEventListener("click", () => {

        hireNewEmployee(id)        
    })

    const userDepartment = []
    const selectedDepartment = {
        uuid: "",
        name: "", 
        description: "",
        enterpriseName: ""
    }

    const departments = await getAllDepartments()

    const users = await getAllUsers()
    
    departments.forEach(department => {

        const { uuid, name, description, companies } = department
        
        users.forEach(user => {

            const { department_uuid } = user

                if(uuid === id && id === department_uuid){

                    userDepartment.push(user)

                    selectedDepartment.uuid = uuid
                    selectedDepartment.name = name
                    selectedDepartment.description = description
                    selectedDepartment.enterpriseName = companies.name

                } else if(uuid === id){

                    selectedDepartment.uuid = uuid
                    selectedDepartment.name = name
                    selectedDepartment.description = description
                    selectedDepartment.enterpriseName = companies.name
                }
        })    

        if(userDepartment.length > 0){
   
            h2.innerHTML = ""
            departmentDiv.innerHTML = ""
            
            h2.innerText = selectedDepartment.name
            departmentDesc.innerText = selectedDepartment.description
            enterpriseName.innerText = selectedDepartment.enterpriseName
            
            departmentDiv.append(departmentDesc, enterpriseName, hireBtn)
            
            listUsers.innerHTML = ""
            
            userDepartment.forEach(user => {

                const li = document.createElement("li")
                const userName = document.createElement("h4")
                const level = document.createElement("span")
                const company = document.createElement("span")
                const button = document.createElement("button")

                li.classList.add("list__user--item")
                userName.innerText = user.username
                level.innerText = user.professional_level
                level.classList.add("user__level")
                company.innerText = selectedDepartment.enterpriseName
                button.innerText = "Desligar"
                button.classList.add("dismiss__user--btn") 
                button.dataset.id = user.uuid

                button.addEventListener("click", () => {

                    dismissSelectedEmployee(user.uuid, selectedDepartment.uuid)
                })

                li.append(userName, level, company, button)
                listUsers.appendChild(li)     
            })

        } else{

            h2.innerHTML = ""
            departmentDiv.innerHTML = ""

            h2.innerText = selectedDepartment.name
            departmentDesc.innerText = selectedDepartment.description
            enterpriseName.innerText = selectedDepartment.enterpriseName
            
            departmentDiv.append(departmentDesc, enterpriseName, hireBtn)
        }
    })    
}

async function renderOptionsDepartmentModal(){

    const select = document.querySelector("#select_users")
    const usersArray = await getAllUsersWithoutDepartment()

    
    usersArray.forEach(user => {

        const {username, uuid} = user

        const option = createOptionUser(username, uuid)

        select.appendChild(option)
        
    })
}

function createOptionUser(username, id){

    const option = document.createElement("option")

    option.innerText = username
    option.value = id

    return option
}

async function hireNewEmployee(id){

    const modal = document.querySelector(".department__modal--container")
    const select = document.querySelector("#select_users")

    let count = 0

    if(count === 0){
        count++

        const newEmployee = {
            user_uuid:"",
            department_uuid: ""
        }

        if(select.value !== ""){

            newEmployee.user_uuid = select.value
            newEmployee.department_uuid = id
            const request = await hireEmployee(newEmployee)
    
            modal.close()
            renderDepartmentModal(id)
            renderAllUsersCards()

            return request
        } else(
            toast("Selecione um usuário para contratar", "#CE4646")
        )      
    }      
}

async function dismissSelectedEmployee(id, departmentId){

    const modal = document.querySelector(".department__modal--container")

    let count = 0

    if(count === 0){
        count++

        const request = await dismissEmployee(id)

        modal.close()
        renderDepartmentModal(departmentId)
        renderAllUsersCards()

        return request
    }
}

export async function renderEditDepartmentModal(id){

    const modal = document.querySelector(".edit__department--modal")
    const textArea = document.querySelector("#desc_department")
    const departments = await getAllDepartments()

    
    departments.forEach(department => {
        const { description, uuid } = department
        
        if(uuid === id){
            
            textArea.value = description
        }
    })
    
    modal.showModal()
    
    editDescDepartment(id)
    closeEditDepartmentModal()
}

function closeEditDepartmentModal(){

    const modal = document.querySelector(".edit__department--modal")
    const closeBtn = document.querySelector(".close__edit--department")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

async function editDescDepartment(id){

    const modal = document.querySelector(".edit__department--modal")
    const desc = document.querySelector("#desc_department")
    const editDescBtn = document.querySelector("#edit_department")

    editDescBtn.dataset.id = id
    
    let count = 0
    
    editDescBtn.addEventListener("click", async (event) => {
        event.preventDefault()
        
        if(count === 0){
            count++
        
            if(id === editDescBtn.dataset.id){
                            
                    let newDesc = {}
            
                    newDesc[desc.name] = desc.value
                    const request = await editDepartment(newDesc, id) 

                    modal.close()
                    renderAllDepartmentsCards()
                    return request
            }
        }
    })    

}

export async function renderDeleteDepartmentModal(id){

    const modal = document.querySelector(".delete__department--modal")
    const deleteMessage = document.querySelector(".delete__department--div > h2")
    const departments = await getAllDepartments()

    departments.forEach(department => {
        
        const {name, uuid} = department

        if(uuid === id){

            deleteMessage.innerText = `Realmente deseja deletar o Departamento ${name} e demitir seus funcionários?`
            deleteSelectedDepartment(id)
        }
    })

    modal.showModal()

    closeDeleteDepartmentModal()
}

function closeDeleteDepartmentModal(){

    const modal = document.querySelector(".delete__department--modal")
    const closeBtn = document.querySelector(".close__delete--department")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

function deleteSelectedDepartment(id){

    const modal = document.querySelector(".delete__department--modal")
    const deleteBtn = document.querySelector(".delete__department--div > button")

    deleteBtn.dataset.id = id

    deleteBtn.addEventListener("click", async () => {

        if(deleteBtn.dataset.id === id){

            const request = await deleteDepartment(id)
            
            modal.close()
            renderAllDepartmentsCards()

            return request
        }
    })
}

export function renderEditUserModal(id){

    const modal = document.querySelector(".edit__user--modal")
    const selects = document.querySelectorAll(".edit__user--form > select")
    const editBtn = document.querySelector("#edit_user")

    editBtn.dataset.id = id

    const userEdited = {}

    let count = 0
    
    editBtn.addEventListener("click", async (event) => {
        event.preventDefault()
        
        if(count === 0){
            count++

            selects.forEach(select => {

                userEdited[select.name] = select.value
            })
        
            const request = await updateInfoEmployee(userEdited, editBtn.dataset.id)
            
            renderAllUsersCards()
            modal.close()

            return request
        }     
    })

    modal.close()
    modal.showModal()
    closeEditUserModal()
}

function closeEditUserModal(){

    const modal = document.querySelector(".edit__user--modal")
    const closeBtn = document.querySelector(".close__edit--user")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

export async function renderDeleteUserModal(id){

    const modal = document.querySelector(".delete__user--modal")
    const deleteMessage = document.querySelector(".delete__user--div > h2")
    const users = await getAllUsers()

    users.forEach(user => {
        
        const {username, uuid} = user

        if(uuid === id){

            deleteMessage.innerText = `Realmente deseja remover o usuário ${username}?`
            deleteSelectedUser(id)
        }
    })

    modal.close()
    modal.showModal()
    
    closeDeleteUserModal()
}

function closeDeleteUserModal(){

    const modal = document.querySelector(".delete__user--modal")
    const closeBtn = document.querySelector(".close__delete--user")

    closeBtn.addEventListener("click", () => {

        modal.close()
    })
}

function deleteSelectedUser(id){

    const modal = document.querySelector(".delete__user--modal")

    const deleteBtn = document.querySelector(".delete__user--div > button")

    deleteBtn.dataset.id = id

    deleteBtn.addEventListener("click", async () => {

        if(deleteBtn.dataset.id === id){

            const request = await deleteUser(id)
            
            modal.close()
            renderAllUsersCards()

            return request
        }
    })
}

renderCreateDepartmentModal()
renderOptions()
createNewDepartment()
