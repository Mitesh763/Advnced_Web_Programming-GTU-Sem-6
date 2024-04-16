let submit = document.querySelector("#sub");
let answer = document.querySelector("#ans");

// const Checker = () =>{
//     let input = document.querySelector("#input").value;
//     console.log(input);
// }
submit.addEventListener("click",()=>{
    const num = document.getElementById("input").value;
    // console.log(num);

    if (num>0) {
        if (num%2 === 0) {
            console.log("Even Number")
            answer.innerText =`${num} Number is Even`;
        }else{
            console.log("odd Number")
            answer.innerText =`${num} Number is odd`;
        }
    }else{
        console.log("inavlid number")
        answer.innerText =`${num} Number is not valid`;
    }
});

// let num = input.