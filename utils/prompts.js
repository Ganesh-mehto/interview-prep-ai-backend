const questionAnswerPrompt =(role,experience,topicsToFocus,numberOfQuestions)=>(
    `You are an AI trained to Generated technical inetrview questions and answers.
    Task:
    -Role:${role}
    -Candidate Experience:${experience}
    -Focus Topics:${topicsToFocus}
    -Write:${numberOfQuestions}
    -For each question, generate a detailed but beginner-friendly answer.
    -If the answer needs a code example,add a small code block inside.
    -Keep formatting very clean and clear.
    -Return apure JSON array like:[
        {
            "question":"Question here?",
            "answer":"Answer here."
        }
        ...
    ]
    Important: Do NOT add any extra text.only return vaild JSON.
    `
)
const conceptExplainPrompt=(question)=>`
    You are an AI trained to Generated explanations for a given interview question.
    Task:
    -Explain the following question and its concept in depth as if you're teching a beginner developer
    -Question:${question}
    -After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    -If the explanation include a code example, provide a small code block.
    -Keep formatting very clean and clear.
    -Return apure JSON array like:[
        {
            "title":"Short title here",
            "explanation":"Explanation here."
        }
        ...
    ]
    Important: Do NOT add any extra text outside the JSON format.only return vaild JSON.

`;
module.exports={questionAnswerPrompt,conceptExplainPrompt}