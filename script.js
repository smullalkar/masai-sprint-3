
var form = document.querySelector("form")
form.addEventListener('submit', submit)

var obj
function submit() {
    event.preventDefault()
    var input = document.getElementById("inputdata").value
    console.log(input)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + input)
    xhr.send();

    xhr.onload = function () {
        if (input.length == 1) {
            if (xhr.status == 200) {
                obj = JSON.parse(xhr.response)
                console.log(obj)
                showData()
            }
            else {
                console.log("Error Code is:" + xhr.status);
            }
        }
    }
}

function showData() {
    var divData = document.getElementById("data")
    divData.setAttribute('class', 'container-fluid')
    divData.innerHTML = ""

    var row = document.createElement('div')
    row.setAttribute('class', 'row')
    divData.appendChild(row)

    for (var i = 0; i < obj.meals.length; i++) {

        var col = document.createElement('div')
        col.setAttribute('class', 'col-3')
        row.appendChild(col)

        var meal = document.createElement("div")
        meal.setAttribute('class', 'card p-3 my-2 shadow-lg border-danger')
        col.appendChild(meal)

        var img = document.createElement("img")
        var url = obj.meals[i].strMealThumb
        console.log(url)
        img.setAttribute("src", url)
        img.setAttribute("class", "img-fluid")
        console.log(obj.meals[i].strMealThumb)
        meal.appendChild(img)

        var cardBody = document.createElement("div")
        cardBody.setAttribute('class', 'card-body')
        meal.appendChild(cardBody)

        var cardTitle = document.createElement("h5")
        cardTitle.setAttribute('class', 'card-title text-center')
        cardTitle.textContent = obj.meals[i].strMeal
        var m = obj.meals[i].strMeal
        cardBody.appendChild(cardTitle)

        var recipe = document.createElement("button")
        recipe.innerHTML = "Click me to see Recipe"
        recipe.setAttribute('class', 'btn btn-outline-danger')
        var recipeDetails = obj.meals[i].strInstructions
        recipe.setAttribute("value", i)
        cardBody.appendChild(recipe)

        recipe.onclick = rec
        console.log(rec)
    }
}

var rec = function details(e) {
    event.preventDefault()
    var index = e.target.value

    var body = document.getElementById("box")
    body.style.display = "none"

    var mainBody = document.getElementById("showRecipe")
    mainBody.setAttribute('class', 'container-fluid')

    var row1 = document.createElement('div')
    row1.setAttribute('class', 'row')
    mainBody.appendChild(row1)

    var col1 = document.createElement('div')
    col1.setAttribute('class', 'col')
    row1.appendChild(col1)

    var recipeHead = document.createElement("h1")
    recipeHead.textContent = obj.meals[index].strMeal + " ( Category : " + obj.meals[index].strCategory + " )"
    recipeHead.setAttribute('class', 'text-center my-2')
    col1.appendChild(recipeHead)

    var hr = document.createElement('hr')
    recipeHead.appendChild(hr)

    var para = document.createElement("p")
    para.setAttribute('class', 'col text-center')
    para.textContent = obj.meals[index].strInstructions
    col1.appendChild(para)

    var img1 = document.createElement("img")
    var url1 = obj.meals[index].strMealThumb
    img1.setAttribute("src", url1)
    img1.setAttribute("class", "img-fluid col-7 p-2 my-2 shadow-lg")
    console.log(obj.meals[index].strMealThumb)
    col1.appendChild(img1)

    var h3 = document.createElement('h3')
    h3.setAttribute('class', 'col-5 float-right text-center')
    h3.textContent = "Ingridients"
    col1.appendChild(h3)

    h3.appendChild(hr)

    for(key in obj.meals[index]){
        if(key != "dateModified" && key !=="idMeal" && key !== "strArea" && key !== "strCategory" && key !== "strDrinkAlternate" && key !== "strInstructions" && key !== "strMeal" && key !== "strMealThumb" && key !== "strMeasure1" && key !== "strMeasure10" && key !== "strMeasure11" && key !== "strMeasure12" && key !== "strMeasure13" && key !== "strMeasure14" && key !== "strMeasure15" && key !== "strMeasure16" && key !== "strMeasure17" && key !== "strMeasure18" && key !== "strMeasure19" && key !== "strMeasure20" && key !== "strMeasure2" && key !== "strMeasure3" && key !== "strMeasure4" && key !== "strMeasure5" && key !== "strMeasure6" && key !== "strMeasure7" && key !== "strMeasure8" && key !== "strMeasure9" && key !== "strSource" && key !== "strTags" && key !== "strYoutube" && key !== null){
            var li = document.createElement("h6")
            li.textContent = obj.meals[index][key]
            li.setAttribute('class', 'small p-1 text-center')
            h3.appendChild(li)
        }
        
    }

    var backButton = document.createElement("button")
    backButton.innerHTML = "Go back"
    backButton.setAttribute('class', 'text-center btn-lg btn-outline-danger offset-5 my-3')
    mainBody.appendChild(backButton)
    backButton.addEventListener('click', mainPage)
    function mainPage() {
        body.style.display = "inline"
        mainBody.style.display = "none"
    }
}