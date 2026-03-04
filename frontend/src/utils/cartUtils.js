

export const cartUpdate = ( state)=>{
    localStorage.setItem("cart", JSON.stringify(state))
}