const form = document.getElementById("contactForm");

form.addEventListener("submit", async e => {

    e.preventDefault();

    const button = form.querySelector("button");
    const buttonText = button.querySelector(".button-text");

    buttonText.innerText = "Sending...";
    button.disabled = true;

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    console.log("Sending data:", data); // Debug log

    try{

        const res = await fetch("https://aditya-contact-backend.onrender.com/contact",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });

        console.log("Response status:", res.status); // Debug log

        const result = await res.json();
        console.log("Response data:", result); // Debug log

        if(result.status === "success"){
            buttonText.innerText = "Sent ✓";
            form.reset();
        }else{
            buttonText.innerText = "Failed";
        }

    }catch(error){
        console.error("Error:", error); // Debug log
        buttonText.innerText = "Error";
    }

    setTimeout(()=>{
        buttonText.innerText = "Send Message";
        button.disabled = false;
    },2000);

});