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

    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log("Meta(s) marcada(s) como concluída(s) !")
}

const metasRealizadas = async() => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Nenhuma meta realizada! :( ')
        return
    }

    await select({
        message: "Metas realizadas " + realizadas.length,
        choices: [...realizadas]
    })
    
}

const metasAbertas = async() => {
    const abertas = metas.filter((meta)=>{
        return !meta.checked //meta.checked != true
    })

    if(abertas.length == 0){
        console.log('Nenhuma meta aberta! :) ')
        return
    }

    await select({
        message: "Metas abertas " + abertas.length,
        choices: [...abertas]
    })
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
                },{
                    name: "Metas Realizadas",
                    value: "realizadas"
                },{
                    name: "Metas Abertas",
                    value: "abertas"
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
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()