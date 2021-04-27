import React from 'react'
import './css/main.css'
import bgimg from './../images/backround.jpg'
async function ContactUsFunc(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let city = document.getElementById("city").value;
    let country = document.getElementById("country").value;
    let number = document.getElementById("number").value;
    let code = document.getElementById("code").value;
    let state = document.getElementById("state").value;
    let message = document.getElementById("message").value;

    let body = {
        "city": city,
        "contactNumber": number,
        "country": country,
        "email": email,
        "full-name": name,
        "message": message,
        "pinCode": parseInt(code),
        "state": state

    }


    let headers = {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        "body": JSON.stringify(body)

    }

    try {
        let res = await fetch(process.env.REACT_APP_BASE_URL + `/api/website/post-feedback`, headers);
        let dataa = await res.json();
        console.log(dataa);
        if (dataa.status === "success") {
            console.log(dataa.data);
        } else {
            console.log(dataa.message)
        }
    } catch (error) {
        console.log(error);
    }

}

function index() {
    return (
        <>
            <div class="container-contact100">


                <div class="wrap-contact100" >



                    <form class="contact100-form validate-form" id="contactForm">
                        <span class="contact100-form-title">
                            Contact Us
				    </span>

                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                            <span class="label-input100">Your Name</span>
                            <input class="input100" type="text" name="name" placeholder="Enter your name" id="name" />
                            <span class="focus-input100"></span>
                        </div>

                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <span class="label-input100">Email</span>
                            <input class="input100" type="text" name="email" placeholder="Enter your email addess" id="email" />
                            <span class="focus-input100"></span>
                        </div>
                        <div class="wrap-input100 rs1-wrap-input100 validate-input" >
                            <span class="label-input100">Coctact Number</span>
                            <input class="input100" name="message" placeholder="Enter Your Number" id="number"></input>
                            <span class="focus-input100"></span>
                        </div>
                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                            <span class="label-input100">City</span>
                            <input class="input100" type="text" name="name" placeholder="Enter City" id="city" />
                            <span class="focus-input100"></span>
                        </div>
                        <div class="wrap-input100 rs1-wrap-input100 validate-input" >
                            <span class="label-input100">State</span>
                            <input class="input100" name="message" placeholder="Your State" id="state"></input>
                            <span class="focus-input100"></span>
                        </div>
                        <div class="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Name is required">
                            <span class="label-input100">Country</span>
                            <input class="input100" type="text" name="name" placeholder="Enter Country" id="country" />
                            <span class="focus-input100"></span>
                        </div>

                        
                        <div class="wrap-input100 rs1-wrap-input100 validate-input" >
                            <span class="label-input100">Postal Code</span>
                            <input class="input100" name="message" placeholder="Enter Your Postal Code." id="code"></input>
                            <span class="focus-input100"></span>
                        </div>
                        
                        <div class="wrap-input100 validate-input" data-validate="Message is required">
                            <span class="label-input100">Message</span>
                            <textarea class="input100" name="message" placeholder="Your message here..." id="message"></textarea>
                            <span class="focus-input100"></span>
                        </div>

                        <div class="container-contact100-form-btn">
                            <button class="contact100-form-btn" onClick={ContactUsFunc}>
                                <span>
                                    Submit
							<i class="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* <span class="contact100-more">
                        For any question contact our 24/7 call center: <span class="contact100-more-highlight">+001 345 6889</span>
                    </span> */}
                </div>
            </div>



            <div id="dropDownSelect1"></div>
        </>
    )
}

export default index





