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
