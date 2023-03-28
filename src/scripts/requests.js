import {toast} from "./toast.js"

const userToken = getUser() || {};
const { token } = userToken;
const baseUrl = "http://localhost:6278";
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const red = "#CE4646";
const green = "#4BA036";

export function getUser() {
    const userToken = JSON.parse(localStorage.getItem("@kenzieEnterprises:userToken"))
  
    return userToken;
  }

export async function createUser(data){

    const user = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const userJson = await user.json()

    if(!user.ok){
        toast(userJson.error, red)
    } 
    else{
        toast("Usuário cadastrado, redirencionando para Login...", green)
        
        setTimeout(() => {
            window.location.replace("/src/pages/login.html")
        },3000)
    }

    return userJson
}

export async function loginUser(data){

    const userToken = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const userTokenJson = await userToken.json()

    if(!userToken.ok){
        toast(userTokenJson.error, red)
    } else{
        toast("Login realizado", green)
        window.location.replace("/src/pages/user.html")
    }

    return userTokenJson
}

export async function getAllEnterprises(){

    const enterprises = await fetch(`${baseUrl}/companies`, {
        method: "GET",
        headers: requestHeaders
    })

    const enterprisesJson = await enterprises.json()

    if(!enterprises.ok){
        toast(enterprisesJson.error, red)
    }

    return enterprisesJson
}

export async function getEnterprisesBySector(sector){

    const enterpriseBySector = await fetch(`${baseUrl}/companies/${sector}`, {
        method: "GET",
        headers: requestHeaders
    })

    const enterpriseBySectorJson = await enterpriseBySector.json()

    if(!enterpriseBySector.ok){
        toast(enterpriseBySectorJson.error, red)
    }

    return enterpriseBySectorJson
}

export async function getAllSectors(){

    const sectors = await fetch(`${baseUrl}/sectors`, {
        method: "GET",
        headers: requestHeaders
    })

    const sectorsJson = await sectors.json()

    if(!sectors.ok){
        toast(sectorsJson.error, red)
    }

    return sectorsJson
}

export async function getProfileInfo(){

    const userProfileInfo = await fetch(`${baseUrl}/users/profile`, {
        method: "GET",
        headers: requestHeaders
    })

    const userProfileInfoJson = await userProfileInfo.json()

    if(!userProfileInfo.ok){
        toast(userProfileInfoJson.error, red)
    }

    return userProfileInfoJson
}

export async function getAllCoworkers(){

    const coworkers = await fetch(`${baseUrl}/users/departments/coworkers`, {
        method: "GET",
        headers: requestHeaders
    })

    const coworkersJson = await coworkers.json()

    if(!coworkers.ok){
        toast(coworkersJson.error, red)
    }

    return coworkersJson
}

export async function getDepartment(){

    const departments = await fetch(`${baseUrl}/users/departments`, {
        method: "GET",
        headers: requestHeaders
    })

    const departmentsJson = await departments.json()

    if(!departments.ok){
        toast(departmentsJson.error, red)
    }

    return departmentsJson
}

export async function updateUserInfo(data){

    const userUpdated = await fetch(`${baseUrl}/users`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const userUpdatedJson = await userUpdated.json()

    if(!userUpdated.ok){
        toast(userUpdatedJson.error, red)
    } else{
        toast("Informações atualizadas", green)
    }

    return userUpdatedJson
}

export async function registerEnterprise(data){

    const enterprise = await fetch(`${baseUrl}/companies`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const enterpriseJson = await enterprise.json()

    if(!enterprise.ok){
        toast(enterpriseJson.error, red)
    } else{
        toast("Empresa criada", green)
    }

    return enterpriseJson
}

export async function getAllDepartments(){

    const departments = await fetch(`${baseUrl}/departments`, {
        method: "GET",
        headers: requestHeaders,
    })    

    const departmentsJson = departments.json()

    if(!departments.ok){
        toast(departmentsJson.error, red)
    }

    return departmentsJson
}

export async function getAllDepartmentsById(id){

    const departments = await fetch(`${baseUrl}/departments/${id}`, {
        method: "GET",
        headers: requestHeaders,
    })    

    const departmentsJson = departments.json()

    if(!departments.ok){
        toast(departmentsJson.error, red)
    }

    return departmentsJson
}

export async function createDepartment(data){

    const department = await fetch(`${baseUrl}/departments`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const departmentJson = await department.json()

    if(!department.ok){
        toast(departmentJson.error, red)
    } else{
        toast("Departamento criado", green)
    }

    return departmentJson
}

export async function hireEmployee(data){

    const hiredEmployee = await fetch(`${baseUrl}/departments/hire/`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const hiredEmployeeJson = await hiredEmployee.json()

    if(!hiredEmployee.ok){
        toast(hiredEmployeeJson.error, red)
    } else{
        toast("Funcionário contratado", green)
    }

    return hiredEmployeeJson
}

export async function dismissEmployee(id){

    const dismissedEmployee = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: requestHeaders
    })

    const dismissedEmployeeJson = await dismissedEmployee.json()

    if(!dismissedEmployee.ok){
        toast(dismissedEmployeeJson.error, red)
    } else{
        toast("Funcionário demitido", green)
    }

    return dismissedEmployeeJson
}

export async function editDepartment(data, id){

    const editedDepartment = await fetch(`${baseUrl}/departments/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const editedDepartmentJson = await editedDepartment.json()

    if(!editedDepartment.ok){
        toast(editedDepartmentJson.error, red)
    } else{
        toast("Informações editadas", green)
    }

    return editedDepartmentJson
}

export async function deleteDepartment(id){

    const deletedDepartment = await fetch(`${baseUrl}/departments/${id}`, {
        method: "DELETE",
        headers: requestHeaders
    })

    toast("Departamento deletado", green)

    // return deletedDepartment
}

export async function getAllUsers(){

    const users = await fetch(`${baseUrl}/users`, {
        method: "GET",
        headers: requestHeaders,
    })    

    const usersJson = users.json()

    if(!users.ok){
        toast(usersJson.error, red)
    }

    return usersJson
}

export async function getAllUsersWithoutDepartment(){

    const users = await fetch(`${baseUrl}/admin/out_of_work`, {
        method: "GET",
        headers: requestHeaders,
    })    

    const usersJson = users.json()

    if(!users.ok){
        toast(usersJson.error, red)
    }

    return usersJson
}

export async function updateInfoEmployee(data, id){

    const updatedEmployee = await fetch(`${baseUrl}/admin/update_user/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const updatedEmployeeJson = await updatedEmployee.json()

    if(!updatedEmployee.ok){
        toast(updatedEmployeeJson.error, red)
    } else{
        toast("Informações atualizadas", green)
    }

    return updatedEmployeeJson
}

export async function deleteUser(id){

    const deletedUser = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
        method: "DELETE",
        headers: requestHeaders
    })
    
    toast("Usuário deletado", green)

}

export async function authenticationUser(){

    const user = await fetch(`${baseUrl}/auth/validate_user`, {
        method: "GET",
        headers: requestHeaders,
    })    

    const userJson = user.json()

    return userJson
}