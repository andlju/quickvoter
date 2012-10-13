/// <reference path="~/Scripts/app/model.questions.js"/>
/// <reference path="~/Scripts/knockout-2.1.0.debug.js"/>

function AnswerViewModel(questionId, model) {
    var self = this;

    self.id = model.Id;
    self.text = model.Text;
    self.votes = ko.observable(model.Votes);

    self.addVote = function () {
        QuickVoter.Questions.addVote(questionId, self.id);
    };
}

function QuestionViewModel(model) {
    var self = this;

    self.id = model.Id;
    
    self.text = model.Text;

    self.answers = ko.observableArray($.map(model.Answers, function (el) { return new AnswerViewModel(self.id, el); }));

    self.newAnswer = ko.observable('');

    self.leadingAnswer = ko.computed(function () {
        var currentLeader = null;
        for (var i = 0; i < self.answers().length; i++) {
            var a = self.answers()[i];
            if (currentLeader == null || a.votes() > currentLeader.votes())
                currentLeader = a;
        }
        return currentLeader;
    });

    self.answerAdded = function(m) {
        var a = new AnswerViewModel(self.id, m);
        self.answers.push(a);
    };

    self.answerUpdated = function (m) {
        for (var i = 0; i < self.answers().length; i++) {
            var a = self.answers()[i];
            if (a.id == m.Id) {
                a.votes(m.Votes);
            }
        }
    };
    
    self.addAnswer = function () {
        QuickVoter.Questions.addAnswer(self.id, { Text: self.newAnswer(), Votes: 1 });
        
        self.newAnswer('');
    };
}
