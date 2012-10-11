window.QuickVoter = {};

QuickVoter.Questions = (function($) {

    var loadQuestion = function (questionId) {
        return $.ajax('/api/questions/' + questionId, {
            type: 'GET',
            dataType: 'json'
        });
    };

    var loadQuestions = function() {
        return $.ajax('/api/questions', {
            type: 'GET',
            dataType: 'json'
        });
    };

    var addQuestion = function(question) {
        return $.ajax('/api/questions', {
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            dataType: 'json',
            data: JSON.stringify(question)
        });
    };

    var addAnswer = function(questionId, answer) {
        return $.ajax('/api/questions/' + questionId + '/answers', {
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            dataType: 'json',
            data: JSON.stringify(answer)
        });
    };

    var addVote = function(questionId, answerId) {
        return $.ajax('/api/questions/' + questionId + '/answers/' + answerId + '/vote', {
            type: 'POST',
            dataType: 'json'
        });
    };

    return {
        loadQuestion: loadQuestion,
        loadQuestions: loadQuestions,
        addQuestion: addQuestion,
        addAnswer: addAnswer,
        addVote: addVote
    };
})($);