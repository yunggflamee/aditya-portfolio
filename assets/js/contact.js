const form = document.getElementById("contactForm");

form.addEventListener("submit", async e => {

    e.preventDefault();

    const button = form.querySelector("button");

    button.innerText = "Sending...";
    button.disabled = true;

    const data = {

        name: form.name.value,
        email: form.email.value,
        message: form.message.value

    };

    try{

        const res = await fetch("https://aditya-contact-backend.onrender.com/contact",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });

        const result = await res.json();

        if(result.status === "success"){

            button.innerText = "Sent ✓";
            form.reset();

        }else{

            button.innerText = "Failed";

        }

    }catch{

        button.innerText = "Error";

    }

    setTimeout(()=>{
        button.innerText="Send Message";
        button.disabled=false;
    },2000);

});