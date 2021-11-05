var path = window.location.pathname;
var page = path.split("/").pop();

// back tot top

let backToTopBtn = document.querySelector('.back-to-top')

window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = 'flex'
    } else {
        backToTopBtn.style.display = 'none'
    }
}

// top nav menu

let menuItems = document.getElementsByClassName('menu-item')

Array.from(menuItems).forEach((item, index) => {
    item.onclick = (e) => {
        let currMenu = document.querySelector('.menu-item.active')
        currMenu.classList.remove('active')
        item.classList.add('active')
    }
})

// food category


if (page === "menu") {
    let foodMenuList = document.querySelector('.food-item-wrap')

    let foodCategory = document.querySelector('.food-category')

    let categories = foodCategory.querySelectorAll('button')

    Array.from(categories).forEach((item, index) => {
        item.onclick = (e) => {
            let currCat = foodCategory.querySelector('button.active')
            currCat.classList.remove('active')
            e.target.classList.add('active')
            foodMenuList.classList = 'food-item-wrap ' + e.target.getAttribute('data-food-type')
        }
    })
}

// on scroll animation

let scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }

let elToShow = document.querySelectorAll('.play-on-scroll')

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start')
        } else {
            item.classList.remove('start')
        }
    })

    scroll(loop)
}

loop()

// mobile nav

let bottomNavItems = document.querySelectorAll('.mb-nav-item')

let bottomMove = document.querySelector('.mb-move-item')

if (page === "index") {
    bottomMove.style.left = 0 + '%';
}
else if (page === "about") {
    bottomMove.style.left = 25 + '%';
}
else if (page === "menu") {
    bottomMove.style.left = 50 + '%';
}
else {
    bottomMove.style.left = 75 + '%';
}

/*
bottomNavItems.forEach((item, index) => {
    item.onclick = (e) => {
        console.log('object')
        let crrItem = document.querySelector('.mb-nav-item.active')
        crrItem.classList.remove('active')
        item.classList.add('active')
        bottomMove.style.left = index * 20 + '%'
    }
})
*/

//Modal Box
function incrementValue(id) {
    var value = parseInt(document.getElementById(String(id)).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(String(id)).value = value;
}

function decrementValue(id) {
    var value = parseInt(document.getElementById(String(id)).value, 10);
    value = isNaN(value) ? 0 : value;
    if (value > 0) {
        value--;
        document.getElementById(String(id)).value = value;
    }
}

var logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function (e) {
    document.cookie = "token" + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = "/login";
});




function updateId() {
    let itemCount = document.getElementById("cartTable").childElementCount;
    for (let i = 0; i < itemCount; i++) {
        document.getElementById("cartTable").children[1].children[i].id = "cart-item-" + String(i);

        document.getElementById("cartTable").children[1].children[i].children.idx.innerHTML = i + 1;
        var cartItem = document.getElementById('cart-item-' + String(i));
        if (typeof cartItem.children.number.children.numberOfItem !== 'undefined') {
            cartItem.children.number.children.decrease.setAttribute('onclick', `decreaseValue(${i})`);
            cartItem.children.number.children.increase.setAttribute('onclick', `increaseValue(${i})`);
        }
        else {
            cartItem.children.number.children[0].children.decrease.setAttribute('onclick', `decreaseValue(${i})`);
            cartItem.children.number.children[0].children.increase.setAttribute('onclick', `increaseValue(${i})`);

        }
        console.log(document.getElementById("cartTable").children[1].children[i]);
    }
}
function increaseValue(index) {
    var cartItem = document.getElementById('cart-item-' + String(index));
    if (typeof cartItem.children.number.children.numberOfItem !== 'undefined') {
        var value = parseInt(cartItem.children.number.children.numberOfItem.value, 10);
    }
    else {
        var value = parseInt(cartItem.children.number.children[0].children.numberOfItem.value, 10);
    }
    value = isNaN(value) ? 0 : value;
    value++;
    var price = parseInt(cartItem.children.price.innerHTML);
    document.getElementById("totalPrice").innerHTML = parseInt(document.getElementById("totalPrice").innerHTML)+price;
    if (typeof cartItem.children.number.children.numberOfItem !== 'undefined') {
        cartItem.children.number.children.numberOfItem.value = value;
    }
    else {
        cartItem.children.number.children[0].children.numberOfItem.value = value;
    }
    cartItem.children.total.innerHTML = value * price;
}

function decreaseValue(index) {
    
    
    var cartItem = document.getElementById('cart-item-' + String(index));
    
    if (typeof cartItem.children.number.children.numberOfItem !== 'undefined') {
        var value = parseInt(cartItem.children.number.children.numberOfItem.value, 10);
    }
    else {
        var value = parseInt(cartItem.children.number.children[0].children.numberOfItem.value, 10);
    }

    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    var price = parseInt(cartItem.children.price.innerHTML);
    document.getElementById("totalPrice").innerHTML = parseInt(document.getElementById("totalPrice").innerHTML)-price;
    if (value == 0) {
        cartItem.remove();
        updateId();
    }
    else {
        if (typeof cartItem.children.number.children.numberOfItem !== 'undefined') {
            cartItem.children.number.children.numberOfItem.value = value;
        }
        else {
            cartItem.children.number.children[0].children.numberOfItem.value = value;
        }
        var price = parseInt(cartItem.children.price.innerHTML);
        cartItem.children.total.innerHTML = value * price;
    }
    
}

function SendDataFromCart() {
    if (document.getElementById("totalPrice").innerHTML > 0){
        var dataSend ={};
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var listItem = {};
        let itemCount = document.getElementById("cartTableBody").childElementCount;
        for (let i = 0; i < itemCount; i++) {
            let itemInfo={
                image:"",
                price:"",
                number:"",
                total:"",
            }
            var Item = document.getElementById("cartTableBody").children[i].children;
            itemInfo.image = Item[2].firstChild.getAttribute("src");
            itemInfo.price = Item.price.innerHTML;
            itemInfo.total = Item.total.innerHTML;
            var cartItem = document.getElementById('cart-item-' + String(i));
            if (typeof cartItem.children.number.children.numberOfItem !== 'undefined') {
                itemInfo.number = cartItem.children.number.children.numberOfItem.value;
            }
            else {
                itemInfo.number = cartItem.children.number.children[0].children.numberOfItem.value;
            }
            listItem[Item.name.innerHTML] = itemInfo;
        }
        dataSend["date"] = dateTime;
        dataSend["order"] = listItem;
        dataSend["total"] = document.getElementById("totalPrice").innerHTML;
        console.log(dataSend);
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dataSend),
        }
        console.log(dataSend);
        fetch('/cart',options).then(res=>{
            location.replace("http://localhost:3000/");
        });
    }
    

}

function AddToCart(code){
    
    var itemValue = document.getElementById(code+"box").value;
    var dataSend ={};
    dataSend = {
        "code" : code,
        "number" : itemValue
    };
    console.log(dataSend);

    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(dataSend),
    }

    fetch('/menu',options).then(res=>{
        location.replace("http://localhost:3000/");
    });
}




