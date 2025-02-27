import fs from "fs";
let words = [];
try {
    console.log("reading passwords csv..");
    words = fs.readFileSync('./passwords.csv', 'utf-8').split(',');
    console.log(words);
}
catch (error) {
    console.log("Error with reading passwords from passwords.csv");
}
export const generatePassword = () => {
    if (words.length < 0) {
        return null;
        // error handling 
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomPassword = words[randomIndex];
    return randomPassword;
};
