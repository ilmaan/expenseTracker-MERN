export function formatDate(timestamp){
    const date = new Date(parseInt(timestamp)); // Parse the timestamp to ensure its an integer representing milliseconds
    
    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    console.log("date----->>>", date.toLocaleDateString("en-US", options));
    return date.toLocaleDateString("en-US", options);
}

export function formatDateToMonthDayYear(timestamp){

}
