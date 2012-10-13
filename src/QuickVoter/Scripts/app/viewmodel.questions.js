/// <reference path="~/Scripts/app/model.questions.js"/>
/// <reference path="~/Scripts/knockout-2.1.0.debug.js"/>

function AnswerViewModel(questionId, model) {
    var self = this;

    self.answerId = model.Id;

    self.text = model.Text;

    self.votes = ko.observable(model.Votes);
    self.addVote = function () {
        QuickVoter.Questions.addVote(questionId, self.answerId);
    };

    self.answerUpdated = function (m) {
        self.votes(m.Votes);
    };
}

function QuestionViewModel(model) {
    var self = this;

    self.questionId = model.Id;

    self.text = model.Text;

    self.answers = ko.observableArray($.map(model.Answers, function (el) { return new AnswerViewModel(self.questionId, el); }));

    self.topAnswer = ko.computed(function () {
        var topSoFar = null;
        for (var a in self.answers()) {
            var answer = self.answers()[a];
            if (topSoFar == null || topSoFar.votes() < answer.votes())
                topSoFar = answer;
        }
        return topSoFar;
    });

    self.newAnswer = ko.observable();

    self.addAnswer = function () {
        QuickVoter.Questions.addAnswer(self.questionId, { Text: self.newAnswer(), Votes: 1 });

        self.newAnswer('');
    };

    self.answerAdded = function (m) {
        var a = new AnswerViewModel(self.questionId, m);
        self.answers.push(a);
    };

    self.answerUpdated = function(m) {
        $.each(self.answers(), function(i, el) {
            if (el.answerId == m.Id) {
                el.votes(m.Votes);
            }
        });
    };
}
