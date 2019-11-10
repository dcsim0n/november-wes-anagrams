/**
|--------------------------------------------------
| Anagram experiment
| 2019 Dana Simmons
|--------------------------------------------------
*/


LETTER_MULTIPLIER = 2;

function loadCalls(text){ 
    const parsedTest = Papa.parse(text);

    callSigns = parsedTest.data.map( row =>{
        return row[4];
    })          

    return callSigns.filter( call => call ); //Filter undefined values
}

function buildHash( arr ){
    const letterHash = {};
    
    for (let i = 0; i < arr.length; i++){
        if(arr[i]){
            const letters = arr[i].match(/[A-Z]/g); // Split calls into letters minus numbers
            
            for(let j = 0; j < letters.length; j++) {
                if(letterHash[ letters[j] ]){
                    letterHash[ letters[j] ] = letterHash[letters[j]] + LETTER_MULTIPLIER //If the letter is already there, increase the count 
                }else{
                    letterHash[ letters[j] ] = LETTER_MULTIPLIER;
                }
            }
        }
    }
    return letterHash;
}

function checkWords( totalLetters, words ){
    return words.filter( word =>{
        const targetLetters = buildHash( [word] );
        let isSpelled = true;
        Object.keys(targetLetters).forEach( letter =>{
            if( targetLetters[letter] > totalLetters[letter] ){ // Check if there are enough letters to spell this word
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


