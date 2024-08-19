import { Component } from "react";

class ErrorBoundary extends Component {
    
    constructor() {
        super();
        this.state = {hasError:false} 
    }
    /*
     * ErrorBoundary is a React component that catches JavaScript errors during rendering. 
     
     * It wraps your app to prevent your app from crashing when something goes wrong.
     
     * The componentDidCatch lifecycle method can be added to any class-based component, and whenever you do add it to a 
       class-based component, it makes that class-based component an error boundary.
     
     * There is no equivalent for functional components at the moment. So, if you wanna build an error boundary,
       it needs to be a class-based component, and then it is a class-based component, which implements this lifecycle method. 
       
     * Idea behind error boundaries really is that you can ensure that not your entire application crashes if something 
       goes wrong, but that instead you can catch those errors and then handle them in an elegant way, just as you would do it
       with try catch in regular JavaScript. And for error boundaries, if you add them, you need class-based components.
       "This is currently not possible with functional components".  
    */
    componentDidCatch(error){
        console.log("Error Captuted in ErrorBoundary Componenet:", error)
        this.setState({hasError:true});
    }

    render() {
        if(this.state.hasError){
            return <p>Something Went Wrong!</p>
        }
        return this.props.children;
    }
}
export default ErrorBoundary;