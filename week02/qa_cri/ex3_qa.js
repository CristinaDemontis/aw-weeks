"use strict";

// import (using name of my choice)
const dayjs = require ('dayjs');

// use (depends on the specific package)
let now = dayjs();
console.log(now.format());

function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;
    
    this.str = function() { return `${this.text} (by ${this.respondent}) on ${this.date.format('YYYY-MM-DD')}, score: ${this.score}`}
}

function Question(text, questioner, date) {
    this.text = text;
    this.questioner = questioner;
    this.date = date;
    this.list = [];  

    this.add = (ans) => {
        this.list.push(ans);
    }
    // 
    this.genericFilter = filterFn => this.list.filter (filterFn);

    this.findAll = 
        authorName => this.list.filter( el => el.respondent === authorName );
    /*
    {
        let filteredList = [];
        for (const a of this.list)
            if (a.respondent === authorName)
                filteredList.push(a);
        return filteredList;
    }
    */
                                            // the callback è quello che abbiamo scritto nell'if
    this.afterDate = date => this.list.filter(e => e.date.isAfter(date));
    /*{                                     // si usa filter 
        let filteredList = [];
        for (const a of this.list)
            if (a.date.isAfter(date))
                filteredList.push(a);
        return filteredList;
    }*/

    this.listByScore = () => {
        const newList = [...this.list];  // importnate duplicare l'array,
                                // nella nostra idea, l'array dovrebbe essere privato
        return newList.sort( (a,b) => b.score - a.score );
    }

    this.listByDate = () => {
        return [...this.list].sort( (a,b) => a.date.diff(b.date) );
    }

    this.avgScore = () => 
        this.list.map(e => e.score)                 // 0 è il valore iniziale di sum
            .reduce( (sum, val, i, arr) => sum+val/arr.length, 0);
            // abbiamo bisogno delle tonde perchè abbiamo più di un parametro 
            // non ho ben capito la i, è l'index, ma non ho capito perchè lo teniamo 
        //return avg;
        //return sum/this.list.length;
    
    /*{
        let sum = 0;
        for (const a of this.list)
            sum+=a.score;
        return sum/this.list.length;
    }*/

    this.str = function() { return `${this.text} asked by ${this.questioner} on ${this.date.format("YYYY-MM-DD")}`};
}

const q = new Question("Best way of enumerating an array in JS?", 'Enrico', 
    dayjs('2024-03-07')
);
console.log(q.str());

const ans1 = new Answer('for of', 'Alice', 3, dayjs('2024-03-07'));
const ans2 = new Answer('for i=0,i<N,i++', 'Harry', 1, dayjs('2024-03-04'));
const ans3 = new Answer('for in', 'Harry', -2, dayjs('2024-03-02'));
const ans4 = new Answer('i=0 while(i<N)', 'Carol', -1, dayjs('2024-03-01'));

q.add(ans1);
q.add(ans2);
q.add(ans3);
q.add(ans4);

console.log(ans1.str());

console.log("\n------- answers by a given author:");
q.findAll('Harry').forEach( (e) => console.log(e.str()) );

console.log("\n------- list by score:");
q.listByScore().forEach( (e) => console.log(e.str()) );
console.log("\n------- after date:");
q.afterDate(dayjs('2024-03-03')).forEach( (e) => console.log(e.str()) );
console.log("\n------- sorted by date:");
q.listByDate().forEach( (e) => console.log(e.str()) );

console.log("\n---- generic Filter");
const ansArray = q.genericFilter( a => a.score > 0 );
ansArray.forEach( e => console.log(e.str()));

console.log();
console.log(q.avgScore());
