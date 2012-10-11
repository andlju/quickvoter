/// <reference path="~/Scripts/app/model.questions.js"/>
/// <reference path="~/Scripts/knockout-2.1.0.debug.js"/>

function AnswerViewModel(questionId, model) {
    var self = this;

    self.id = model.Id;

    self.answerText = model.Text;
    self.votes = ko.observable(model.Votes);

    self.votesUpdated = function (votes) {
        self.votes(votes);
    };

    self.vote = function () {
        QuickVoter.Questions.addVote(questionId, model.Id).
            done(function (res) {
                self.votesUpdated(res.Votes);
            });
    };
}

function QuestionViewModel(model) {
    var self = this;

    self.questionId = model.Id;

    self.questionText = model.Text;

    self.answers = ko.observableArray($.map(model.Answers, function (el) { return new AnswerViewModel(model.Id, el); }));

    self.newAnswerText = ko.observable();

    self.answerAdded = function (res) {
        self.answers.push(new AnswerViewModel(model.Id, res));
    };

    self.votesUpdated = function (res) {
        for (var a in self.answers()) {
            var answer = self.answers()[a];
            if (answer.id == res.Id) {
                answer.votesUpdated(res.Votes);
            }
        }
    };
    
    self.addAnswer = function () {
        QuickVoter.Questions.addAnswer(self.questionId, { text: self.newAnswerText(), votes: 1 });
        self.newAnswerText('');
    };
}
