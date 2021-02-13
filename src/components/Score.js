import React from "react"

function Score(props){
    return (
        <div>
            <button 
                    style={{
                        marginTop: "8px",
                        marginRight: "auto",
                        width: "50px",
                        height: "50px", 
                        border: "solid 2px white", 
                        borderRadius: "50px", 
                        backgroundColor: "blue", 
                        color: "white"
                    }}
                    onClick={() => props.onClick(props.value)}
                >
                    {props.value}
            </button>
        </div>
    )
}

export default Score