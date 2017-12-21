"use strict";

class InvoiceController {
    constructor($scope, CustomerService) {
        this.scope = $scope;
        this.CustomerService = CustomerService;
        this.loadCustomers = this.loadCustomers.bind(this);
        this.getCustomer = this.getCustomer.bind(this);
        this.loadPoints = this.loadPoints.bind(this);
        this.add = this.add.bind(this);
        this.register = this.register.bind(this);
        this.viewPoints = this.viewPoints.bind(this);
        this.showCustomerDetail = this.showCustomerDetail.bind(this);

        this.scope.add = this.add;
        this.scope.loadCustomers = this.loadCustomers;
        this.scope.getCustomer = this.getCustomer;
        this.scope.showCustomerDetail = this.showCustomerDetail;
        this.scope.loadPoints = this.loadPoints;
        this.scope.customers = this.loadCustomers();
        this.scope.register = this.register;
        this.scope.viewPoints = this.viewPoints;
        this.viewPoints = this.viewPoints.bind(this);

        this.scope.invoice = { "loja":"", "nNota":"", "cadastro":"", "data":"", "valor":"" };
        this.scope.invoices = [];
        this.scope.customer = '';
        this.scope.points = { "total":"---", "utilizados":"---", "expirados":"---", "saldo": "---" };
        this.scope.search = '';        
        this.scope.error = '';
        this.scope.isVisible = true;

        this.scope.isActiveTransactions = true;
        this.scope.isActiveBenefits = false;
        this.scope.isActiveHistorys = false;
        
    }
    
    
    loadCustomers() { 
        let data = [{"codigo":1,"nome":"Paulo Santos de Almeida","email":"paulo.santos@email.com","cpf":"02341233409"},{"codigo":2,"nome":"Antonio Marques da Silva","email":"tonhomsilva@email.com","cpf":"23456789012"},{"codigo":3,"nome":"João Sousa Siqueira","email":"jaosiq@email.com","cpf":"34567890123"},{"codigo":4,"nome":"Armando Jogada","email":"armando.player@gmail.com","cpf":"45678901234"},{"codigo":5,"nome":"Jordência Sexta","email":"jordanfriday@hotmail.com","cpf":"56789012345"},{"codigo":6,"nome":"Kelly Guissa","email":"salsich@obig.net","cpf":"67890123456"}];
        return data;
    }

    add() {
        this.scope.invoice.cadastro = (new Date(),"yyyy-MM-dd"); 
        this.scope.invoices.push(Object.assign({}, this.scope.invoice));
    }

    register() {
        
    }

    viewPoints(type){
        switch(type){
            case 1:
                this.scope.isActiveTransactions = true;
                this.scope.isActiveBenefits = false;
                this.scope.isActiveHistorys = false;
            break;
            case 2:
                this.scope.isActiveTransactions = false;
                this.scope.isActiveBenefits = true;
                this.scope.isActiveHistorys = false;
            break;
            case 3:
                this.scope.isActiveTransactions = false;
                this.scope.isActiveBenefits = false;
                this.scope.isActiveHistorys = true;
            break;
        }
    }

    showCustomerDetail(id) {
        console.log(id);
        this.scope.isVisible = this.scope.isVisible ? false : true;

        if(this.scope.isVisible){
            this.scope.customer = '';
            this.scope.points = { "total":"---", "utilizados":"---", "expirados":"---", "saldo": "---" };
        }
        else {
            this.scope.customer = this.scope.getCustomer(id);
            this.scope.points = this.scope.loadPoints();
        }
        
        console.log(this.scope.isVisible);
    }

    getCustomer(id) {
        let data = { "codigo":1, "nome":"Paulo Santos de Almeida", "email":"paulo.santos@email.com", "cpf":"02341233409", "endereco":{ "tipo":"Rua", "logradouro":"Visconde de Souza", "numero":"23", "complemento":"Bloco 2, Ap 201", "bairro":"Barra da Tijuca", "cidade":"Rio de Janeiro", "Estado":"RJ", "Pais":"Brasil" }, "telefone":{ "pais":"55", "area":"21", "numero":"987654321" }, "thumb":"http://loremflickr.com/g/150/150/face", "obs":"No último atendimento, o Sr. Paulo estava bastante irritado com a demora no cadastro das notas fiscais." };
        return data;
    }

    loadPoints(){
        let data = { "total":189247.73, "utilizados":109000, "expirados":78000, "saldo":0 };
        data.saldo = (data.total - data.utilizados - data.expirados);
        return data;
    }
}

InvoiceController.$inject = ['$scope', 'CustomerService'];
app.controller('InvoiceController', InvoiceController);