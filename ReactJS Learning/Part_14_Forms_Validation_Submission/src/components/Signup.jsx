import { useState } from "react";

export default function Signup() {
 const [passwordsAreNotEqual, setPasswordsAreNotEqual] =  useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    {
      /*
            * Instead of using useRef and useState React Hooks to hold user entered data from the form element.
            
            * We can use the FormData API to get the form data. This is a native built-in feature for getting hold of user 
              entered data from the Form. 
            
            * It turns out that the browser actually helps you with handling that form submission and getting hold of all the 
              entered values. It helps you by allowing you to create a special kind of object based on a special kind of 
               constructor function that's built into the browser, that is FormData constructor function.
            
            * To FormData you need to event of Form submit. Because the target of this submit event is that form,
               because it is that form that was submitted.

            * To get the userEntered data from the form using FormData, we need to add name attribute to all HTML elements
               inside the form. This is because FormData API is going to use the name attribute to identify the
               user entered data from the form elements. So, we need to add name attribute to all the 
               HTML elements inside the form. 
             
            * To fetch the value entered by user inside form we can use method "get" and pass the name attribute value to fecth 
               the value from HTML element.
               Ex: console.log(formData.get('email'));

            * Common pattern or trick that's often used to quickly get hold of all the entered values and group them together 
              into an object is to use the built-in Object class, which is also provided by the browser.  
              
              ex: Object.fromEntries(formData.entries());
              
              In Above code snippet calling entries on the formData object varaible will give us kind of an array of all the 
              input fields and their values and calling Object fromentries on that array then will simply give us an object 
              where we have key value pairs.

       */
    }

    const formData = new FormData(event.target);
    const acquisitionChannel = formData.getAll("acquisition");
    //console.log("formData Entries", formData.entries());
    const userEntered = Object.fromEntries(formData.entries());
    userEntered.acquisition = acquisitionChannel;
    console.log("Object Form Entries", userEntered);
     
     {
        /*
         Since, it includes a dash we must access HTML control like below mentioned notation using these square brackets
         because the dot notation would not work here because this dash is an invalid character.
         That's why I'm using the square bracket notation here.
        */
     } 
    if(userEntered.password !== userEntered['confirm-password']) {
        setPasswordsAreNotEqual(true);    
        return;
    }

    {
      /*
          The target of that event is the underlying form element. And it turns out that this form element has a reset method
          which you can call. Which is essentially the same thing as we can achieve by adding type attribute as "reset"
          to the button element that added inside form tag.

          if we're honest this is also some imperative code again, manipulating DOM but at least it's less code to write
          then resetting all form elements by setting them back to empty strings step by step. That's why you should prefer 
          this event target reset code over manually resetting all the ref values.
        */
    }
    event.target.reset();
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">{passwordsAreNotEqual && <p>Passwords Must Match.</p> }</div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" required />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        {/*
           "reset" is one of the value for button type attribute. If you have a button in a form that should reset that form.
            So that's one way of resetting it.    
        */}
        <button type="reset" className="button button-flat">
          Reset
        </button>

        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
