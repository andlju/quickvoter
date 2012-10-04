describe("Questions", function() {
    var model;

    it("should be able to create a new question", function() {
        var isDone;
        var result;

        runs(function() {

            QuickVoter.Questions.addQuestion({
                text: 'My test question',
                answers: [
                    'Answer #1',
                    'Answer #2',
                    'Answer #3'
                ]
            }).done(function (r) {
                result = r;
                isDone = true;
            });

        });

        waitsFor(function() { return isDone; }, 1000);

        runs(function() {
            expect(result).toBeDefined();
            expect(result.text).toEqual('My test question');
        });

    });

    it("should be able to create a new question with no answers", function () {
        var isDone;
        var result;

        runs(function () {

            QuickVoter.Questions.addQuestion({
                text: 'My test question #2',
                answers: [
                ]
            }).done(function (r) {
                result = r;
                isDone = true;
            });

        });

        waitsFor(function () { return isDone; }, 1000);

        runs(function () {
            expect(result).toBeDefined();
            expect(result.text).toEqual('My test question #2');
        });

    });
    

    it("should be able to create add an answer to a question with no answers", function () {
        var questionCreated;
        var questionResult;
        var answerCreated;
        var answerResult;

        runs(function () {

            QuickVoter.Questions.addQuestion({
                text: 'My test question #3',
                answers: [
                ]
            }).done(function (r) {
                questionResult = r;
                questionCreated = true;
            });

        });

        waitsFor(function () { return questionCreated; }, 1000);

        runs(function() {
            QuickVoter.Questions.addAnswer(questionResult.id, {
                answer: "My answer"
            }).done(function (r) {
                answerResult = r;
                answerCreated = true;
            });
        });

        waitsFor(function () { return answerCreated; }, 1000);

        runs(function () {
            expect(answerResult).toBeDefined();
            expect(answerResult.text).toEqual('My answer');
            expect(answerResult.votes).toEqual(1);
        });

    });


    it("should be able to list all questions", function() {
        var isDone;
        var result;
        runs(function() {
            QuickVoter.Questions.loadQuestions().done(function(r) {
                result = r;
                isDone = true;
            });
        });

        waitsFor(function () { return isDone; }, 1000);

        runs(function () {
            expect(result).toBeDefined();
        });
    });
});
