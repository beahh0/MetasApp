const{select, input, checkbox} = require('@inquirer/prompts')

let meta = {
    value: "beber água",
    checked: false
}

let metas = [meta]

const cadastrarMeta = async() =>{
    const meta = await input({message: "Digite a meta: "})

    if(meta.length==0) {
        console.log("A meta não pode ser vazia")
        return
    }
    metas.push(
        { value: meta, checked: false }
    )
}

const listarMeta = async() =>{
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, espaço para marcar ou desmarcar e o enter para finalizar a etapa",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) =>{
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked == true
    })

    console.log("Metas concluídas!")
}

const start = async() => {
    
    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Metas",
                    value: "cadastrar"
                },{
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                name: "Sair",
                value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMeta()
                break
            case "sair":
                return
        }
    }
}

start()