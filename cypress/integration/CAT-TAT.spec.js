/// <reference types="cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {  // antes de cada teste executa esta funçao
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', () => {
       
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  
    })
    it('Preencha os campos obrigatorios e envie o formulario', () => { // only executa apenas este teste
        const longtext = ('Software é uma sequência de instruções escritas para serem interpretadas por um computador para executar tarefas específicas. Também pode ser definido como os programas, dados e instruções que comandam o funcionamento de um computador, smartphone, tablet e outros dispositivos eletrônicos.')
        cy.get('#firstName').type('Cíntia').should('have.value', 'Cíntia')
        cy.get('#lastName').type('Silva Galvao').should('have.value','Silva Galvao')
        cy.get('#email').type('cintia@gmail.com').should('have.value', 'cintia@gmail.com')
        cy.get('#phone').type('6298989898').should('have.value','6298989898')
        cy.get('#product').select('Blog').should('have.value', 'blog')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

    })

    it('Fluxo de exceção E-maail', () => {
        const longtext = ('Software é uma sequência de instruções escritas para serem')
        cy.get('#firstName').type('Cíntia').should('have.value', 'Cíntia')
        cy.get('#lastName').type('Silva Galvao').should('have.value','Silva Galvao')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('#email').type('jhgjhfdjhgjfdf,com')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('Validação Campo telefone', () => {
        cy.get('#phone').type('hjkhjkhkjhj').should('not.have.value','hjkhjkhkjhj')

    })

    it('Telefone sendo o principal meio de contato', () => {
        const longtext = ('Software é uma sequência de instruções escritas para serem interpretadas por um computador para executar tarefas específicas. Também pode ser definido como os programas, dados e instruções que comandam o funcionamento de um computador, smartphone, tablet e outros dispositivos eletrônicos.')
        cy.get('#firstName').type('Cíntia').should('have.value', 'Cíntia')
        cy.get('#lastName').type('Silva Galvao').should('have.value','Silva Galvao')
        cy.get('#email').type('cintia@gmail.com').should('have.value', 'cintia@gmail.com')
        cy.get('#product').select('Blog').should('have.value', 'blog')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click() // encontrar um botão que tenha o texto Enviar
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos', () => {
        cy.get('#firstName').type('Cíntia').should('have.value', 'Cíntia')
        .clear()
        .should('have.value', '')
        cy.get('#lastName').type('Silva Galvao').should('have.value','Silva Galvao')
        .clear()
        .should('have.value', '')
        cy.get('#email').type('cintia@gmail.com').should('have.value', 'cintia@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area').type('teste automaçao')
        .clear()
        .should('have.value', '')
    })
        it('validar campos obrigatorios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        })

        it('Envio de comandos costumizados', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        })

        it('Select produtos', () => {

            cy.get('#product').select('YouTube').should('have.value', 'youtube')
        })

        it('Selecione o valor pelo value', () => {
            cy.get('#product').select('mentoria').should('have.value', 'mentoria')
        })

        it('Selecione pelo indice', () => {
            cy.get('#product').select(2).should('have.value', 'cursos')
        })

        it('Marcar radio feedback', () => {
            cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        })

        it('Marca cada tipo de atendimento', () => { // seleciona todos e clica em todos e valida cada um
            cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

        })

        it('Marcar e desmacar o checkbox', () => { //marca um checkbox, seleciona o uktimo e desmarca
            cy.get('input[type="checkbox"]')
            .check() 
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })

        it('upload de arquivos', () => {  // importando arquivo
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should( ($input) => {
               // console.log($input) > localizar o arquivo no console do navegador
               expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('upload de arquivos drag-and-drop', () => {  // importando arquivo drag-and-drop / arrastar o arquivo
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should( ($input) => {
               // console.log($input) > localizar o arquivo no console do navegador
               expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('Anexar arquivo usando fixture', () => {
            cy.fixture('example.json').as('Exemplo')  // pegando o arquivo e dando um nome
            cy.get('input[type="file"]')
            .selectFile('@Exemplo')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('Veririficar se a pagina foi redirecionada para outra aba', () =>{
            cy.get('#privacy a').should('have.attr', 'target', '_blank') // a é o ancora dentro da div com id #privacy e verificou que tem o atributo target com valor _blank
        })

        it('Remover target', () => {
            cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            cy.contains('Talking About Testing').should('be.visible')
        })


  })
  