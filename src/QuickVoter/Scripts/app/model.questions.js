window.QuickVoter = {};

QuickVoter.Questions = (function($) {

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

    var addVote = function(questionId, answerId) {
        return $.ajax('/api/questions/' + questionId + '/answers/' + answerId + '/vote', {
            type: 'POST',
            dataType: 'json'
        });
    };

    return {
        loadQuestions: loadQuestions,
        addQuestion: addQuestion,
        addVote: addVote
    };
})($);