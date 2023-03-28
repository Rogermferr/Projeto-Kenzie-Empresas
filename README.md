Bom Projeto!! 

Doc: https://kenzie-academy-brasil-developers.github.io/m2-empresas-doc

Fgima: https://www.figma.com/file/EEEdGd0gL5iLzaspW8DPXE/Kenzie-Empresas-Oficial

APi Local: https://github.com/Jardel-Kenzie/m2-api-empresas






        <dialog class="department__modal--container">

            <h2>Nome do departamento</h2>
            <span class="close__department--modal"><img src="../assets/img/close-modal.svg" alt="Fechar Modal"></span>
    
            <section class="department__section">
    
                <div class="department__desc">
                    <h4>Descrição do departamento</h4>
                    <span>Empresa pertencente</span>
                </div>
    
                <form class="select__users--form">
                    <select name="username" id="select">
                        <option>Selecionar usuário</option>

                    </select>
                    <button type="submit">Contratar</button>
                </form>
    
            </section>
    
            <section class="users__section">
    
                <ul class="list__users--container">
    
                    <li class="list__item--user">
                        <h4>Username</h4>
                        <span>Pleno</span>
                        <span>Company Name</span>
                        <button>Delisgar</button>
                    </li>
    
                    <li class="list__item--user">
                        <h4>Username</h4>
                        <span>Pleno</span>
                        <span>Company Name</span>
                        <button>Delisgar</button>
                    </li>
    
                    <li class="list__item--user">
                        <h4>Username</h4>
                        <span>Pleno</span>
                        <span>Company Name</span>
                        <button>Delisgar</button>
                    </li>
    
                    <li class="list__item--user">
                        <h4>Username</h4>
                        <span>Pleno</span>
                        <span>Company Name</span>
                        <button>Delisgar</button>
                    </li>
    
                    <li class="list__item--user">
                        <h4>Username</h4>
                        <span>Pleno</span>
                        <span>Company Name</span>
                        <button>Delisgar</button>
                    </li>
    
                    <li class="list__item--user">
                        <h4>Username</h4>
                        <span>Pleno</span>
                        <span>Company Name</span>
                        <button>Delisgar</button>
                    </li>
    
                </ul>
    
            </section>
    
        </dialog>
    
        <dialog open="" class="create__department--modal">
    
            <form class="create__department--form">
    
                <h2>Criar Departamento</h2>
                <span class="close__create--modal"><img src="../assets/img/close-modal.svg" alt="Fechar modal"></span>
    
                <input type="text" name="name" placeholder="Nome do Departamento">
                <input type="text" name="description" placeholder="Descrição">
    
                <select name="" id="">
                    <option>Selecionar empresa</option>
                <button type="submit" id="create_department">Criar departamento</button>
    
            </form>
    
        </dialog>
    
        <dialog class="edit__department--modal">
    
            <form class="edit__department--form">
    
                <h2>Editar Departamento</h2>
                <span class="close__edit--department"><img src="../assets/img/close-modal.svg" alt="Fechar modal"></span>
    
                <textarea name="" id="" cols="30" rows="10" placeholder="">Valores anteriores da descrição</textarea>
    
                <button type="submit" id="edit_department">Editar departamento</button>
    
            </form>
    
        </dialog>
    
        <dialog class="delete__department--modal">
    
            <div class="delete__department--div">
                <h2>Realmente deseja deletar o Departamento NOME e demitir seus funcionários?</h2>
                <span class="close__delete--department"><img src="../assets/img/close-modal.svg" alt="Fechar modal"></span>
                <button>Continuar</button>
            </div>
            
        </dialog>
    
        <dialog class="edit__user--modal">
    
            <form class="edit__user--form">
    
                <h2>Editar Usuário</h2>
                <span class="close__edit--user"><img src="../assets/img/close-modal.svg" alt="Fechar modal"></span>
    
                <select name="" id="">
                    <option value="">Selecionar modalidade de trabalho </option>
                    <option value="">Selecionar modalidade de trabalho </option>
                    <option value="">Selecionar modalidade de trabalho </option>
                    <option value="">Selecionar modalidade de trabalho </option>
                </select>
                
                <select name="" id="">
                    <option value="">Selecionar nível profissional</option>
                    <option value="">Selecionar nível profissional</option>
                    <option value="">Selecionar nível profissional</option>
                    <option value="">Selecionar nível profissional</option>
                </select>
    
                <button type="submit" id="edit_user"> Editar</button>
    
            </form>
    
        </dialog>
    
        <dialog class="delete__user--modal">
    
            <div class="delete__user--div">
                <h2>Realmente deseja remover o usuário NOME?</h2>
                <span class="close__delete--user"><img src="../assets/img/close-modal.svg" alt="Fechar modal"></span>
                <button>Continuar</button>
            </div>
    
        </dialog>