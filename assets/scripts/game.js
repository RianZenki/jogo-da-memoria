let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    techs: [
        'bootstrap',
        'CSS',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    cards: null,

    setCard: function(id) {
        let card = this.cards.filter(card => card.id === id)[0]

        if (card.flipped || this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        } else {
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function() {
        if (!this.firstCard || !this.secondCard) {
            return false
        }

        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function() {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards: function() {
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver: function() {
        return this.cards.filter((card) => !card.flipped).length === 0
    },

    createCardsFromTechs: function () {
        this.cards = []
    
        for(let tech of this.techs) {
            this.cards.push(this.createPairFromTech(tech))
        }
    
        // flatMap junção dos metodos map e flat.
        // Se o flatMap for utilizado em um array de arrays, ele retorna um unico array com todos os elementos dos arrays.
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        // return this.cards
    },  

    createPairFromTech: function (tech) {
        return [this.createTechObject(tech), this.createTechObject(tech)]
    },

    createTechObject: function (tech) {
        return {
            id: tech + parseInt(Math.random() * 1000),
            icon: tech,
            flipped: false
        }
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length
        let randomIndex = 0
    
        while(currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--; // diminui antes, pois o valor inicial é 20 e não existe o index 20 no array
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
    

}