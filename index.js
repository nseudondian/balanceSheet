var catView
catView = (function() {
    var Shoes = function(id, items, amount, comment) {
        this.id = id
        this.items = items
        this.amount = amount
        this.comment = comment
    }
    var Bags = function(id, items, amount, comment) {
        this.id = id
        this.items = items
        this.amount = amount
        this.comment = comment
    }
    var Clothes = function(id, items, amount, comment) {
        this.id = id
        this.items = items
        this.amount = amount
        this.comment = comment
    }
    var Phones = function(id, items, amount, comment) {
        this.id = id
        this.items = items
        this.amount = amount
        this.comment = comment
    }
    var storedData
    storedData = {
        allEntry: {
            shoes: [],
            bags: [],
            clothes: [],
            phones: []
        }
    }
    return {
        allData: function(tType, items, amount, comment) {
            var newData
            var ID

            if (storedData.allEntry[tType].length > 0) {
                ID = storedData.allEntry[tType][storedData.allEntry[tType].length - 1].id + 1
            } else {
                ID = 0
            }

            if (tType === 'shoes') {
                newData = new Shoes(ID, items, amount, comment)
            } else if (tType === 'bags') {
                newData = new Bags(ID, items, amount, comment)
            } else if (tType === 'clothes') {
                newData = new Clothes(ID, items, amount, comment)
            } else if (tType === 'phones') {
                newData = new Phones(ID, items, amount, comment)
            }
            storedData.allEntry[tType].push(newData)
            return newData
        },
        test: function() {
            console.log(storedData)
        }
    }
})()

var payView
payView = (function() {
    var classLinks = {
        transaction: '.transaction-type',
        items: '.add-items',
        amount: '.add-amount',
        comment: '.add-comment',
        button: '.add-button',
        shoeBox: '.shoes-div',
        bagBox: '.bags-div',
        clothBox: '.clothes-div',
        phoneBox: '.phones-div'
    }
    return {
        userInput: function() {
            return {
                transaction: document.querySelector(classLinks.transaction).value,
                items: document.querySelector(classLinks.items).value,
                amount: document.querySelector(classLinks.amount).value,
                comment: document.querySelector(classLinks.comment).value
            }
        },
        allData: function(obj, transaction) {
            var ourHtml
            var ourNewHtml
            var element
            if (transaction === 'shoes') {
                element = classLinks.shoeBox
                ourHtml = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-white">Shoes</h4><div class="shoes-table" id="%id%"><div class="detail-container"><span class="my-description">%items%</span><span class="my-amount">%amount%</span><span class ="comment">%comment%</span></div></div></div><div class="col-6"></div></div></div></section>'
            } else if (transaction === 'bags') {
                element = classLinks.bagBox
                ourHtml = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-white">Bags</h4><div class="bags-table" id="%id%"><div class="detail-container"><span class="my-description">%items%</span><span class="my-amount">%amount%</span><span class ="comment">%comment%</span></div></div></div><div class="col-6"></div></div></div></section>'
            } else if (transaction === 'clothes') {
                element = classLinks.clothBox
                ourHtml = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-white">Clothes</h4><div class="clothes-table" id="%id%"><div class="detail-container"><span class="my-description">%items%</span><span class="my-amount">%amount%</span><span class ="comment">%comment%</span></div></div></div><div class="col-6"></div></div></div></section>'
            } else if (transaction === 'phones') {
                element = classLinks.phoneBox
                ourHtml = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-white">Phones</h4><div class="phones-table" id="%id%"><div class="detail-container"><span class="my-description">%items%</span><span class="my-amount">%amount%</span><span class ="comment">%comment%</span></div></div></div><div class="col-6"></div></div></div></section>'
            }

            ourNewHtml = ourHtml.replace("%id%", obj.id)
            ourNewHtml = ourNewHtml.replace("%items%", obj.items)
            ourNewHtml = ourNewHtml.replace("%amount%", obj.amount)
            ourNewHtml = ourNewHtml.replace("%comment", obj.comment)

            var htmlObject = document.createElement('div')
            htmlObject.innerHTML = ourNewHtml
            document.querySelector(element).insertAdjacentElement('beforeend', htmlObject)
        },
        cLink: function() {
            return classLinks
        },
        test: function() {
            return storedData
        }
    }

})()

var globalView
globalView = (function(cView, pView) {
    var addBalance = function() {
        var ourInput = pView.userInput()
        var newNew = cView.allData(ourInput.transaction, ourInput.items, ourInput.amount, ourInput.comment)
        pView.allData(newNew, ourInput.transaction)

    }
    var eventMatters = function() {
        var DOMlink = pView.cLink()
        var btn = document.querySelector(DOMlink.button)
        btn.addEventListener('click', function() {
            addBalance()
        })

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                addBalance()
            }
        })
    }

    return {
        init: function() {
            eventMatters()
        }
    }

})(catView, payView)
globalView.init()