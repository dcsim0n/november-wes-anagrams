/**
|--------------------------------------------------
| Anagram experiment
| 2019 Dana Simmons
|--------------------------------------------------
*/




function loadCalls(text){ 
    const parsedTest = Papa.parse(text);

    callSigns = parsedTest.data.map( row =>{
        return row[4];
    })          

    return callSigns.filter( call => call ); //Filter undefined values
}

function buildHash( arr, multiplier=1 ){
    const letterHash = {};
    
    for (let i = 0; i < arr.length; i++){
        if(arr[i]){
            const letters = arr[i].match(/[A-Z]/g); // Split calls into letters minus numbers
            
            for(let j = 0; j < letters.length; j++) {
                if(letterHash[ letters[j] ]){
                    letterHash[ letters[j] ] = letterHash[letters[j]] + multiplier //If the letter is already there, increase the count 
                }else{
                    letterHash[ letters[j] ] = multiplier;
                }
            }
        }
    }
    console.log("Hash for: ", arr)
    console.log(letterHash);
    return letterHash;
}

function checkWords( totalLetters, words ){
    return words.filter( word =>{
        const targetLetters = buildHash( [word] );
        let isSpelled = true;
        console.log("Checking", word)
        Object.keys(targetLetters).forEach( letter =>{
            console.log(`totalLetters[${letter}]`, totalLetters[letter])
            if(totalLetters[letter] == undefined ){
                isSpelled = false;
            }else if( targetLetters[letter] > totalLetters[letter] ){ // Check if there are enough letters to spell this word
                isSpelled = false;
            }else{
                totalLetters[letter]--;
            }
        });
        if(isSpelled){
            console.log("Passed test: ", word);
        }
        return isSpelled;
    });

}


