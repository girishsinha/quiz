//API  https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple
const submitbtn = document.getElementById("submit");

function counter() {

    if (count >= 9) {
        document.getElementById('box').innerHTML = `<h1> Result </h1></br><h1> ${right}/${count + 1}</h1></br>
        <button class="button" id="replay" onclick="replay()">replay</button>`;
    } else {
        count++;
        fetchData();
    }
}
function replay() {
    location.reload();
}
let right = 0;
let count = 0;


window.addEventListener('load', fetchData());

//ye api se data fetch karta hai
function fetchData() {
    let exam = fetch("https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple")
        .then((value) => {
            return value.json();
        }).then((data) => {
            const question = data.results[0].question;
            answer = data.results[0].correct_answer;
            const options = data.results[0].incorrect_answers;
            // console.log(data);
            const newoption = random(options);
            function random(arr,) {
                let num = Math.floor(Math.random() * 4);
                arr.splice(num, 0, answer);
                return arr;
            }
            showData(question, options);
            selectops();
            checkAns(answer);
        })

    // ye api ke data ko html me show karta hai
    function showData(question, options) {
        let que = document.getElementById("que");
        que.innerHTML = question;
        let ops = document.getElementById("ops");
        ops.innerHTML = `<li>${options[0]}</l><li>${options[1]}</l><li>${options[2]}</l><li>${options[3]}</l>`
    }

    //ye charo options me se ek select karta hai
    function selectops() {
        ops.querySelectorAll('li').forEach((option) => {
            option.addEventListener('click', () => {
                if (ops.querySelector('.active')) {
                    let userAns;
                    userAns = ops.querySelector('.active');
                    userAns.classList.remove("active");
                }
                option.classList.add("active")
            })
        })
    }

    // ye Ans ko check karta hai// 
    function checkAns(ans) {

        submitbtn.value = ans;
        submitbtn.addEventListener('click', click);
        function click() {

            let userAns = ops.querySelector('.active').textContent;
            // ye isliye karna pada kyoki submitbtn.addEventListener('click', click); me parameter pass ni ho rha tha
            let ans = submitbtn.value;
            if (userAns == ans) {
                ops.querySelector('.active').classList.add('right');
                console.log("clicked")
                right++;
                removeHandler();
            } else {
                ops.querySelector('.active').classList.add('wrong');
                let a;
                a = ops.querySelectorAll('li');
                for (let index = 0; index < a.length; index++) {
                    if (a[index].textContent === ans) {
                        a[index].classList.add('right');
                    }
                }

            }
            removeHandler();
            function removeHandler() {
                submitbtn.removeEventListener('click', click);
            }

            // pata ni kyu ni chala//
            // ops.querySelectorAll('li').forEach(() => {
            //     if (ops.querySelector('li').textContent === answer) {
            //         ops.querySelector('li').classList.add('right')
            //     }
            //     console.log('1');
            // });
        }

    }


}







