// checks if number is below 0, returns a string, I used it for color styling
export function isBelow0 (number) {
    if (number < 0) {
      return "red"
    } else {
      return "green"
    }
  } 

export function toggleDetails(index, details, setDetails, setOrder, setTotal, setBakiyeSonra) {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
        newDetails.splice(position, 1)
    } else {
        setOrder(0);
        setTotal(0);
        setBakiyeSonra(0);
        newDetails = [index]
    }
    setDetails(newDetails)
    }