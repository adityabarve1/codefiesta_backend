 
    const questions = [
        {
            "id": 1,
            "question": "Arrange the code to print 'Hello, World!' in JavaScript.",
            "code": [
                "console.log('Hello,');",
                "// Code goes here",
                "console.log('World!');"
            ],
            "answer": [
                "console.log('Hello,');",
                "console.log('World!');"
            ]
        },
        {
            "id": 2,
            "question": "Rearrange the code to declare a function named 'add' that adds two numbers in Python.",
            "code": [
                "def(a, b):",
                "return a + b"
            ],      
            "answer": [
                "def add(a, b):",
                "  return a + b"
            ]
        },
        {
            "id": 3,
            "question": "Arrange the code to declare a class named 'Person' with a constructor in Java.",
            "code": [
                "public class Person {",
                "// Code goes here",
                "}"
            ],
            "answer": [
                "public class Person {",
                "  public Person() {",
                "    // Constructor logic goes here",
                "  }",
                "}"
            ]
        }
    ];
const getQuestions = () =>{
    return questions;
};

module.exports ={getQuestions}
