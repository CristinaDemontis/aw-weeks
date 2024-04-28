'use strict';

// This file contains functions to call server APIs

import { Answer } from "./QAModels.js";

const URL = "http://localhost:3001/api";

// trasformiamo una funzione che probablmente bloccherebbe il codice in una async function, cosi da non creare problemi 
async function getAllAnswers(questionId) { // è una funzione async perchè non voglio bloccare il codice 
    // call  /api/questions/:id/answers

    // dobbiamo predendere il promise, prendere il body, prendere le info nl body, e restituire la lista di risposte

    const response =  await fetch(URL+`/questions/${questionId}/answers`);
    const answers = await response.json(); // ricorda che la response è un json che ritorna una promise 
if (response.ok) {
    return answers.map((e) => new Answer(e.id, e.text, e.respondent, e.score, e.date, e.questionId) );
} else {
   throw answers;  // expected to be an object (extracted by json) that provides info about the error
 }
}

export { getAllAnswers };